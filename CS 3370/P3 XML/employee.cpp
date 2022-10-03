#include <ostream>
#include <fstream>
#include <vector>

#include "employee.h"

int main(int argc, char* argv[]) {
    std::vector<Employee*> emps;

    for(int i=1; i<argc; ++i) {
        std::ifstream is(argv[i]);
        cout << "PARSING FILE: " << argv[i] << endl;
        while(is) {
            try {
                Employee* emp = Employee::fromXML(is);
                if (emp) emps.push_back(emp);
            }
            catch (std::runtime_error e) {
                cout << "RUNTIME ERROR: " << e.what() << endl;
                break;
            }
        }
        
    }

    // std::ostream os;
    for (auto e: emps) {
        e->display();
    }

    std::fstream bs("emp.out", std::ios::out | std::ios::binary | std::ios::trunc);
    for (auto e: emps) {
        e->write(bs);
    }
};