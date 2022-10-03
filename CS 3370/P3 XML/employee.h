#include <iostream>
#include <string>
#include <exception>

using std::string;
using std::cout;
using std::endl;

class Employee {
    string name = "";
    int id = -1;
    string address = "";
    string city = "";
    string state = "";
    string country = "";
    string phone = "";
    double salary = -1;

    struct EmployeeRec {
        int id;
        char name[31];
        char address[26];
        char city[21];
        char state[21];
        char country[21];
        char phone[21];
        double salary;
    };

    static string getXMLTag(std::istream& is, char& n) {
        string tag = "";
        if (n == '<') {
            n = (char)std::towlower(is.get());
            while (is && n != '>') {
                tag += n;
                n = (char)std::towlower(is.get());
            }
            // cout << tag << endl;
        }
        return tag;
    }

    static string getAttVal(std::istream& is, bool& attTag) {
        string attVal = "";
        char n = is.get();
        while (is && n != '<') {
            attVal += n;
            n = is.get();
        }
        attTag = true;
        // if (attVal == "") throw std::runtime_error("Attribute value cannot be empty");
        is.unget(); // pushes the '<' back onto the buffer
        return attVal;
    }

    static void stobuf(const string& s, char* buf, size_t lim) {
        size_t nchars = std::min(lim-1, s.size());

        s.copy(buf, nchars);
        buf[nchars] = '\0';
    }

public:
    Employee() = default;
    // Employee(string na, int i, string a, string ci, string st, string co, string p, double sa): 
    //     name{na}, id{i}, address{a}, city{ci}, state{st}, country{co}, phone{p}, salary{sa} {};

    void display() const { // Write a readable Employee representation to a stream
        cout << endl << "id: " << this->id << endl << "name: " << this->name << endl << "address: " << this->address
        << endl << "city: " << this->city << endl << "state: " << this->state << endl << "country: " 
        << this->country << endl << "phone: " << this->phone << endl << "salary: " << this->salary << endl << endl;
    }; 

    void write(std::ostream& bos) const { // Write a fixed-length record to current file position
        // EmployeeRec empRec = EmployeeRec();
        EmployeeRec empRec;
        
        empRec.id = this->id;
        // empRec.name = this->name;
        // empRec.address = this->address;
        // empRec.city = this->city;
        // empRec.state = this->state;
        // empRec.country = this->country;
        // empRec.phone = this->phone;
        stobuf(this->name, empRec.name, sizeof(empRec.name)-1);
        stobuf(this->address, empRec.address, sizeof(empRec.address)-1);
        stobuf(this->city, empRec.city, sizeof(empRec.city)-1);
        stobuf(this->state, empRec.state, sizeof(empRec.state)-1);
        stobuf(this->country, empRec.country, sizeof(empRec.country)-1);
        stobuf(this->phone, empRec.phone, sizeof(empRec.phone)-1);
        empRec.salary = this->salary;

        bos.write(reinterpret_cast<const char*>(&empRec), sizeof(empRec));
        // bs >> empRec.id >> empRec.name >> empRec.address >> empRec.city >> empRec.state >> empRec.country >> empRec.phone >> empRec.salary;
    };

    void store(std::iostream&) const; // Overwrite (or append) record in (to) file
    void toXML(std::ostream&) const; // Write XML record for Employee
    static Employee* read(std::istream&); // Read record from current file position
    static Employee* retrieve(std::istream&,int); // Search file for record by id

    static Employee* fromXML(std::istream& is) { // Read the XML record from a stream
        Employee* emp = new Employee();

        bool empTag = false;
        bool attTag = false;
        char n;
        string tag = "";
        string prevTag = "";
        string attVal = "";

        while(is) {
            n = is.get();
            if (n == '\n' || n == '\t' || std::isspace(n)) continue;
            prevTag = tag;
            tag = getXMLTag(is, n);

            // if we already have employee tag but dont already have an opening attribute tag, 
            // start getting attribute values
            if (empTag && !attTag) {
                if (tag == "/employee") {
                    while(is && n!='<') n = is.get();
                    if (is) is.unget();
                    else return nullptr;
                    break;
                } // if we need to close employee tag
                else if (tag == "name") emp->name = getAttVal(is, attTag);
                else if (tag == "id") emp->id = std::stoi(getAttVal(is, attTag));
                else if (tag == "address") emp->address = getAttVal(is, attTag);
                else if (tag == "city") emp->city = getAttVal(is, attTag);
                else if (tag == "state") emp->state = getAttVal(is, attTag);
                else if (tag == "country") emp->country = getAttVal(is, attTag);
                else if (tag == "phone") emp->phone = getAttVal(is, attTag);
                else if (tag == "salary") emp->salary = std::stod(getAttVal(is, attTag));
                else throw std::runtime_error("Incorrect or missing tag: <" + tag + ">");
            }

            // If we have already parsed an attribute tag, check for a closing tag
            else if (attTag) {
                // if no closing tag, throw error
                if (tag != ('/' + prevTag)) throw std::runtime_error("Incorrect or missing tag: <" + tag + ">");
                attTag = false; // otherwise we do have closing tag and reset attTag value
            }

            // if we dont yet have an employee tag
            else if (empTag == false) {
                if (tag == "employee") empTag = true;
                else {
                    // tag != "employee", we dont have an opening employee tag
                    throw std::runtime_error("Missing opening employee tag");
                    break;
                }
            }
        }

        // Finished reading in employee
        // If name, id, or salary were not changed throw error
        if (emp->name == "" || emp->id == -1) {
            throw std::runtime_error("Name and Id are required fields");
        }

        // return new Employee(name, id, address, city, state, country, phone, salary);
        return emp;
    }
};