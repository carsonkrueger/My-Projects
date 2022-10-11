#include <iostream>
#include <array>
#include <functional>
#include <iterator>

using std::cout;
using std::endl;
using std::array;

void f(int n) {
    cout << n << "\n";
}

template<typename T>
void for_each_if(T s, T e, std::function<void(int)> f, std::function<bool(int)> pred) {
    while (s != e) {
        if (pred(*s)) f(*s);
        s++;
    }
}

template<typename T>
bool is_sorted(T s, T e) {
    T prev = s;
    while (s != e) {
        if (*prev > *s) return false;
        prev = s;
        s++;
    }
    return true;
}

template<typename T, typename P>
P range(T s, T e, P n) {
    while(s != e) {
        s = n;
        s++, n++;
    }
    return n;
}

int main() {
    // for_each_if
    // array<int,4> a = {1,2,3,4};
    // for_each_if(a.begin(), a.end(), f, [](int x){return x % 2 == 0;});

    // is_sorted
    // array<int,4> a = {1,2,3,4};
    // array<int,4> b = {1,3,2,4};
    // cout << is_sorted(a.begin(),a.end()) << endl; // 1
    // cout << is_sorted(b.begin(),b.end()) << endl; // 0

    // range
    array<int,4> a;
    int n = range(a.begin(), a.end(), 1);
    array<int,2> b;
    range(b.begin(), b.end(), n);
    copy(a.begin(), a.end(), ostream_iterator<int>(cout, " ")); // 1 2 3 4
    cout << endl;
    copy(b.begin(), b.end(), ostream_iterator<int>(cout, " ")); // 5 6
    cout << endl;
}