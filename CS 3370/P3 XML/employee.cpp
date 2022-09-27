#include <iostream>
#include <fstream>
using std::cout;
using std::endl;
using std::string;

int main(int argc, char* argv[]) {
    for(size_t i=0; i<argc; ++i) {
        cout << argv[i] << endl;
    }

    std::fstream in(argv[1]);

    string n;
    while (in >> n) {
        cout << n << endl;
    }
};