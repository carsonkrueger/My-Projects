#include <iostream>
#include <string>

using std::string;

class Employee{
    string name;
    int id;
    string address;
    string city;
    string state;
    string country;
    string phone;
    double salary;

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
    Employee(string);
    void display(std::ostream&) const; // Write a readable Employee representation to a stream
    void write(std::ostream&) const; // Write a fixed-length record to current file position
    void store(std::iostream&) const; // Overwrite (or append) record in (to) file
    void toXML(std::ostream&) const; // Write XML record for Employee
    static Employee* read(std::istream&); // Read record from current file position
    static Employee* retrieve(std::istream&,int); // Search file for record by id
    static Employee* fromXML(std::istream&); // Read the XML record from a stream
};