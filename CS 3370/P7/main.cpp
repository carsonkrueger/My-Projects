#include <mutex>
#include <queue>
#include <condition_variable>
#include <thread>
#include <fstream>
#include <iostream>
using namespace std;

class Pipeline {
    static std::queue<int> q;
    static std::condition_variable q_cond;
    static mutex q_sync, print;
    static atomic_size_t nprod;
    static ofstream output;
public:
    void produce(int i) {
        srand(time(nullptr)+i*(i+1));
        for (int i = 0; i < 1000; ++i) {
            int n = rand();     // Get random int

            // Get lock for queue; push int
            unique_lock<mutex> qlck(q_sync);
            q.push(n);
            qlck.unlock();
            q_cond.notify_one();

            // Get lock for print mutex
            lock_guard<mutex> plck(print);
            output << n << " produced" << endl;
        }
        --nprod;
        q_cond.notify_all();
    }
    void filter() {

    }
    void group() {

    }
};

int main() {
    vector<thread> prods, cons;
    for (size_t i = 0; i < Pipeline::ncons; ++i)
        cons.push_back(thread(&Pipeline::consume));
    for (size_t i = 0; i < Pipeline::nprods; ++i)
        prods.push_back(thread(&Pipeline::produce,i));

    // Join all threads
    for (auto &p: prods)
        p.join();
    for (auto &c: cons)
        c.join();
}