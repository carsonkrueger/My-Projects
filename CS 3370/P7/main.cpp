#include <mutex>
#include <queue>
#include <condition_variable>
#include <thread>
#include <fstream>
#include <iostream>
#include <assert.h>
#include <atomic>
using namespace std;

class Pipeline {
    static std::queue<int> q;
    static std::queue<int> q2;
    static std::condition_variable q_cond;
    static mutex q_sync, print;
    static atomic_size_t nprod;
    static ofstream output;
public:
    static const size_t nprods = 4, nfilts = 3, ngroupers = 10;

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
            lock_guard<mutex> plck(print);
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
            if (q.empty()) {
                assert(!nprod);
                break;
            }
            std::cout << nprod << " " << std::endl;
            assert(nprod);
            auto x = q.front();
            q.pop();
            if (x % 3 == 0) 
                q2.push(x);
            qlck.unlock();

            // Print trace of consumption
            lock_guard<mutex> plck(print);
            // std::cout << q.front() << " ";
            output << x << " filtered" << endl;
        }
    }

    static void group() {

    }
};

queue<int> Pipeline::q, Pipeline::q2;
condition_variable Pipeline::q_cond;
mutex Pipeline::q_sync, Pipeline::print;
ofstream Pipeline::output("out0.out");
atomic_size_t Pipeline::nprod(nprods);

int main() {
    vector<thread> prods, cons;
    for (size_t i = 0; i < Pipeline::nfilts; ++i)
        cons.push_back(thread(&Pipeline::filter));
    for (size_t i = 0; i < Pipeline::nprods; ++i)
        prods.push_back(thread(&Pipeline::produce,i));

    // Join all threads
    for (auto &p: prods)
        p.join();
    for (auto &c: cons)
        c.join();
}