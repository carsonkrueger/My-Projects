#include <iostream>
#include <fstream>
using std::cout;
using std::endl;

int main(int argc, char* argv[]) {
    for(size_t i=0; i<argc; ++i) {
        cout << argv[i] << endl;
    }
    fstream in(argv[1])
}