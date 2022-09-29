#include <iostream>
#include <fstream>
#include <vector>

#include "employee.h"

using std::cout;
using std::endl;
using std::string;
using std::vector;


int main(int argc, char* argv[]) {
    vector<Employee> emps;
    
    for(int i=0; i<argc; ++i) {
        std::fstream in(argv[1]);
        char n = in.get();

        while (in) {
            cout << n << endl;
            n = in.get();
        }
    }
};