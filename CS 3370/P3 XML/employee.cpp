#include <iostream>
#include <fstream>
#include <vector>

#include "employee.h"

using std::cout;
using std::endl;
using std::string;
using std::vector;

Employee::Employee(string fileName) {
    std::fstream in(fileName);
        char n = in.get();

        while (in) {
            cout << n << endl;
            n = in.get();
        }
}

int main(int argc, char* argv[]) {
    vector<Employee> emps;
    
    for(int i=0; i<argc; ++i) {
        Employee emp = Employee(argv[i]);
        emps.push_back(emp);
    }
};