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

    for(int i=0; i<argc; ++i) {
        Employee* emp = new Employee();
        emps.push_back(emp);

        std::fstream in(argv[i]);
        // char n = in.get();

        while (in) {
            // cout << n << endl;
            emp->fromXML(in);
        }
    }


};