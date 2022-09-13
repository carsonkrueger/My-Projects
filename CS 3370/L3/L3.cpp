// placement.cpp: Illustrates placement new
#include <new> // Defines the standard, 1-arg placement new
#include <iostream>
using namespace std;
// A sample class to place in an array
// All its functions trace themselves to cout
class Thing {
    int m, n;
public:
    Thing(int i = 0, int j = 0) {
        m = i;
        n = j;
        cout << "Thing(" << m << "," << n << ") initialized\n";
    }
    ~Thing() {
        cout << "Thing(" << m << "," << n << ") destroyed\n";
    }
    Thing(const Thing& t) : m(t.m), n(t.n) {
        cout << "Thing(" << m << "," << n << ") copied\n";
    }
    Thing& operator=(const Thing& t) {
        m = t.m;
        n = t.n;
        cout << "Thing(" << m << "," << n << ") assigned\n";
        return *this;
    }
    void set_m(int new_m) {
        m = new_m;
        cout << "m assigned to " << m << endl;
    }
    void set_n(int new_n) {
        n = new_n;
        cout << "n assigned to " << n << endl;
    }
    friend ostream& operator<<(ostream& os, const Thing& t) {
        return os << '(' << t.m << ',' << t.n << ')';
    }
};

int main() {
    //my implementation
    cout << endl << "My implementation" << endl;
    Thing* p3 = new Thing[5];
    
    for (int i = 0; i < 5; i++) 
        new (p3+i) Thing(i+1,i+2); // <- placement new 

    for (int i = 0; i < 5; i++)
        cout << p3[i] << endl;
}