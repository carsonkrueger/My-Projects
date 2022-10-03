#include <ostream>
#include <fstream>
#include <vector>

#include "employee.h"

int main(int argc, char* argv[]) {
    std::vector<Employee*> emps;

    // cout << "NUM ARGS: " << argc << endl;
    // for(int i=1; i<argc; ++i) {
    //     cout << argv[i] << endl;
    // }

    for(int i=1; i<argc; ++i) {
        std::ifstream is(argv[i]);
        cout << "PARSING FILE: " << argv[i] << endl;
        while(is) {
            try {
                Employee* emp = Employee::fromXML(is);
                if (emp) emps.push_back(emp);
                else cout << "nullptr" << endl;
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
};