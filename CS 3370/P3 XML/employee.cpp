#include <fstream>
#include <vector>

#include "employee.h"

int main(int argc, char* argv[]) {
    std::vector<Employee*> emps;

    // read fromXML
    for(int i=1; i<argc; ++i) {
        std::ifstream is(argv[i]);
        cout << "PARSING FILE: " << argv[i] << endl;

        try {
            while(is) {
                Employee* emp = Employee::fromXML(is);
                if (emp) emps.push_back(emp);
            }
        }
        catch (std::runtime_error e) {
            cout << "RUNTIME ERROR: " << e.what() << endl;
            break;
        }
        is.close();
    }

    // display
    // for (auto e: emps) {
    //     e->display(cout);
    // }

    // write to fixed length file
    std::fstream bos("employee.bin", std::ios::in | std::ios::out | std::ios::binary);
    for (auto e: emps) {
        e->write(bos);
    }
    bos.close();
    emps.clear();

    // read from fixed length file
    std::fstream bis("employee.bin", std::ios::in | std::ios::binary);
    while(bis) {
        Employee* emp = Employee::read(bis);
        emps.push_back(emp);
    }
    bis.close();

    // display
    // std::ostream os;
    for (int i=0; emps[i]; ++i) {
        emps[i]->display(cout);
    }

    // print out XML representation
    for (int i=0; emps[i]; ++i) {
        emps[i]->toXML(cout);
    }

    // search file for employee with id 12345
    std::fstream is("employee.bin", std::ios::in | std::ios::binary);
    int id = 12345;
    Employee* emp = Employee::retrieve(is, id);
    is.close();

    cout << endl << "Found:";
    emp->display(cout);
    
    // change employee salary to 150000
    std::fstream ios("employee.bin", std::ios::in | std::ios::out | std::ios::binary);
    // emp->store(ios);
    emp->setSalary(150000);
    emp->store(ios);
    ios.close();

    std::fstream tis("employee.bin", std::ios::in | std::ios::binary);
    emp = Employee::retrieve(tis, id);
    emp->toXML(cout);
    tis.close();
};