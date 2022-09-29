#include <iostream>
#include <string>

using std::string;
using std::cout;
using std::endl;

class Employee{
    string name = NULL;
    int id = NULL;
    string address = NULL;
    string city = NULL;
    string state = NULL;
    string country = NULL;
    string phone = NULL;
    double salary = NULL;

    struct emp {
        char name[10];
        int id;
        char address[10];
        char city[10];
        char state[10];
        char country[10];
        char phone[10];
        double salary;
    };

public:
    Employee() = default;

    void display(std::ostream& os) const {
        os << "id: " << this->id << endl << "name: " << this->name << endl << "address: " << this->address
        << endl << "cityid: " << this->city << endl << "state: " << this->state << endl << "country: " 
        << this->country << endl << "phone: " << this->phone << endl << "salary: " << this->salary << endl << endl;
    }; // Write a readable Employee representation to a stream
    void write(std::ostream&) const; // Write a fixed-length record to current file position
    void store(std::iostream&) const; // Overwrite (or append) record in (to) file
    void toXML(std::ostream&) const; // Write XML record for Employee
    static Employee* read(std::istream&); // Read record from current file position
    static Employee* retrieve(std::istream&,int); // Search file for record by id
    static Employee* fromXML(std::istream& in) { // Read the XML record from a stream
        char n = in.get();
        cout << n << endl;
    }
};