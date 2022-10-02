#include <ostream>
#include <fstream>
#include <vector>

#include "employee.h"


// Employee::Employee(string fileName) {
//     std::fstream in(fileName);
//     char n = in.get();

//     while (in) {
//         cout << n << endl;
//         n = in.get();
//     }
// }

int main(int argc, char* argv[]) {
    std::vector<Employee*> emps;

    cout << towlower('/');
    for(int i=0; i<argc; ++i) {
        std::ifstream in(argv[i]);
        cout << "ON FILE: " << argv[i] << endl;

        try {
            Employee* emp = Employee::fromXML(in);
            emps.push_back(emp);
        }
        catch (std::runtime_error e) {
            cout << "runtime error: " << e.what() << endl;
        }
    }
};