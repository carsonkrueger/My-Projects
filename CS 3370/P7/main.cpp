#include <mutex>
#include <queue>
#include <condition_variable>
#include <thread>
#include <fstream>
#include <iostream>
#include <assert.h>
#include <atomic>
#include <string>
using namespace std;

class Pipeline {
    static std::queue<int> q;
    static std::queue<int> q2;
    static std::condition_variable q_cond, q2_cond;
    static mutex q_sync, q2_sync, print;
    static atomic_size_t nprod, nfilt;
    // static ofstream output;
public:
    static const size_t nprods = 4, nfilts = 3, ngrps = 10;

    static void produce(int i) {
        srand(time(nullptr)+i*(i+1));
        for (int i = 0; i < 250; ++i) {
            int n = rand();     // Get random int

            // Get lock for queue; push int
            unique_lock<mutex> qlck(q_sync);
            q.push(n);
            qlck.unlock();
            q_cond.notify_one();

            // Get lock for print mutex
            // lock_guard<mutex> plck(print);
            // output << n << " produced" << endl;
        }
        --nprod;
        q_cond.notify_all();
    }

    static void filter() {
        for (;;) {
            // Get lock for sync mutex
            unique_lock<mutex> qlck(q_sync);

            // Wait for queue to have something to process
            q_cond.wait(qlck,[](){return !q.empty() || !nprod;});
            auto x = q.front();
            q.pop();
            qlck.unlock();

            unique_lock<mutex> q2lck(q2_sync);
            if (x % 3 == 0) 
                q2.push(x);
            q2lck.unlock();

            // Print trace of consumption
            // lock_guard<mutex> plck(print);
        }
        --nfilt;
        q2_cond.notify_all();
    }

    static void group(int i) {
        for (;;) {
            // Get lock for sync mutex
            unique_lock<mutex> q2lck(q2_sync);
            // Wait for queue 2 to have something to process
            q2_cond.wait(q2lck,[](){return !q2.empty() || !nfilt;});
            std::string outf = "out.out";

            auto x = q2.front();
            size_t mod = x % 10;
            if (i != mod) continue;
            q2.pop();

            outf.insert(3, std::to_string(mod));
            ofstream output {outf, std::ios_base::app};
            q2lck.unlock();
            
            // Print trace of consumption
            lock_guard<mutex> plck(print);
            output << x << " " << (x % 10) << " -> " << i << endl;
        }
    }
};

queue<int> Pipeline::q, Pipeline::q2;
condition_variable Pipeline::q_cond, Pipeline::q2_cond;
mutex Pipeline::q_sync, Pipeline::q2_sync, Pipeline::print;
// ofstream Pipeline::output("out0.out");
atomic_size_t Pipeline::nprod(nprods), Pipeline::nfilt(nfilts);

int main() {
    // clear files
    std::ofstream ofs;
    for (size_t i = 0; i < 10; ++i) {
        std::string outf = "out.out";
        outf.insert(3,std::to_string(i));
        ofs.open(outf, std::ofstream::out | std::ofstream::trunc);
        ofs.close();
    }

    vector<thread> prods, cons, grps;
    for (size_t i = 0; i < Pipeline::nfilts; ++i)
        cons.push_back(thread(&Pipeline::filter));
    for (size_t i = 0; i < Pipeline::nprods; ++i)
        prods.push_back(thread(&Pipeline::produce, i));
    for (size_t i = 0; i < Pipeline::ngrps; ++i)
        grps.push_back(thread(&Pipeline::group, i));

    // Join all threads
    for (auto &p: prods)
        p.join();
    for (auto &c: cons)
        c.join();
    for (auto &g: grps)
        g.join();
}