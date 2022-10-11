#include <iostream>
#include <array>
#include <iterator>

using std::cout;
using std::endl;
using std::array;

void f(int n) {
    cout << n << "\n";
}

template<typename T, typename func1, typename func2> // std::function<void(int)>     std::function<bool(int)>
void for_each_if(T s, T e, func1 f, func2 pred) {
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
        *s = n;
        s++, n++;
    }
    return n;
}

int main() {
    // for_each_if
    cout << endl << "for_each_if function:" << endl;
    array<int,4> a = {1,2,3,4};
    for_each_if(a.begin(), a.end(), f, [](int x){return x % 2 == 0;});

    // is_sorted
    cout << endl << "is_sorted function:" << endl;
    array<int,4> b = {1,2,3,4};
    array<int,4> c = {1,3,2,4};
    cout << is_sorted(b.begin(),b.end()) << endl; // 1
    cout << is_sorted(c.begin(),c.end()) << endl; // 0

    // range
    cout << endl << "range function:" << endl;
    array<int,4> d;
    int n = range(d.begin(), d.end(), 1);
    array<int,2> e;
    range(e.begin(), e.end(), n);
    copy(d.begin(), d.end(), std::ostream_iterator<int>(cout, " ")); // 1 2 3 4
    cout << endl;
    copy(e.begin(), e.end(), std::ostream_iterator<int>(cout, " ")); // 5 6
    cout << endl;
}