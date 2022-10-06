#include <vector>

#include "employee.h"

int main(int argc, char* argv[]) {
    std::vector<Employee*> emps;

    // read fromXML
    for(int i=1; i<argc; ++i) {
        std::ifstream is(argv[i]);
        try {
            while(is) {
                Employee* emp = Employee::fromXML(is);
                if (emp) emps.push_back(emp);
            }
        }
        catch (std::runtime_error e) {
            cout << "ERROR: " << e.what() << endl;
            return 0;
        }
        is.close();
    }

    // display
    for (size_t i=0; i < emps.size(); ++i) {
        emps[i]->display(cout);
    }

    // write to fixed length file
    std::fstream bios("employee.bin", std::ios::in | std::ios::out | std::ios::binary);
    for (size_t i=0; i < emps.size(); ++i) {
        emps[i]->write(bios);
    }

    // clear vector
    emps.clear();
    bios.clear();
    bios.seekg(0);

    // read from fixed length file
    while(bios) {
        Employee* emp = Employee::read(bios);
        if (emp) emps.push_back(emp);
    }
    
    // print out XML representation
    for (size_t i=0; i < emps.size(); ++i) {
        emps[i]->toXML(cout);
    }

    // search file for employee with id 12345
    Employee* emp = Employee::retrieve(bios, 12345);

    // change employee salary to 150000 & store it
    emp->setSalary(150000);
    emp->store(bios);

    // retrieve it again
    cout << endl << "Found:";
    emp = Employee::retrieve(bios, 12345);
    if (emp) emp->display(cout);
    
    // create own unique employee
    Employee empTwo = Employee("Carson", 7000, "cow house", "cow", "cow", "cow", "cow", 999999);
    empTwo.store(bios);
    
    // retrieve that employee
    Employee* empThree = Employee::retrieve(bios, 7000);
    
    cout << endl << "Found:";
    if (empThree) empThree->display(cout);
};