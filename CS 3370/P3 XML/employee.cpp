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
        is.close();
    }

    for (auto e: emps) {
        e->display();
    }

    std::fstream bios("employee.bin", std::ios::in | std::ios::out | std::ios::binary);
    for (auto e: emps) {
        e->write(bios);
    }
    emps.clear();
    while(bios) {
        cout << "hi" << endl;
        Employee* emp = Employee::read(bios);
        emps.push_back(emp);
    }
    bios.close();

    for (auto e: emps) {
        e->display();
    }
};