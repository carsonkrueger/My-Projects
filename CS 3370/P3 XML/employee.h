#include <iostream>
#include <string>
#include <exception>
#include <memory>

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
    ~Employee() = default;
    // Employee(string na, int i, string a, string ci, string st, string co, string p, double sa): 
    //     name{na}, id{i}, address{a}, city{ci}, state{st}, country{co}, phone{p}, salary{sa} {};

    //std::ostream&
    void display(std::ostream& stream) const { // Write a readable Employee representation to a stream
        stream << endl << "id: " << this->id << endl << "name: " << this->name << endl << "address: " << this->address
        << endl << "city: " << this->city << endl << "state: " << this->state << endl << "country: " 
        << this->country << endl << "phone: " << this->phone << endl << "salary: " << this->salary << endl;
    }; 

    void write(std::ostream& bos) const { // Write a fixed-length record to current file position
        // EmployeeRec empRec = EmployeeRec();
        EmployeeRec empRec;
        
        empRec.id = this->id;
        stobuf(this->name, empRec.name, sizeof(empRec.name)-1);
        stobuf(this->address, empRec.address, sizeof(empRec.address)-1);
        stobuf(this->city, empRec.city, sizeof(empRec.city)-1);
        stobuf(this->state, empRec.state, sizeof(empRec.state)-1);
        stobuf(this->country, empRec.country, sizeof(empRec.country)-1);
        stobuf(this->phone, empRec.phone, sizeof(empRec.phone)-1);
        empRec.salary = this->salary;

        // cout << empRec.name << empRec.id << endl;

        bos.write(reinterpret_cast<const char*>(&empRec), sizeof(empRec));
    };

    void store(std::iostream& ios) const { // Overwrite (or append) record in (to) file
        std::streampos pos = ios.tellg();
        cout << "get pos: " << pos << endl;
        
        while(ios) {
            Employee* emp = Employee::read(ios);
            if (emp->id == this->id) {
                // overwrite file
            }
            else if (!ios) {
                // append file
            }
            else pos = ios.tellg();
        }
    };

    //std::ostream&
    void toXML(std::ostream& stream) const { // Write XML record for Employee
        stream << endl << "<Employee>" << endl;
        stream << "\t" << "<Name>" << name << "</Name>" << endl;
        stream << "\t" << "<ID>" << id << "</ID>" << endl;
        if (address != "") stream << "\t" << "<Address>" << address << "</Address>" << endl;
        if (city != "") stream << "\t" << "<City>" << city << "</City>" << endl;
        if (state != "") stream << "\t" << "<State>" << state << "</State>" << endl;
        if (country != "") stream << "\t" << "<Country>" << country << "</Country>" << endl;
        if (phone != "") stream << "\t" << "<Phone>" << phone << "</Phone>" << endl;
        if (salary != -1) stream << "\t" << "<Salary>" << salary << "</Salary>" << endl;
        stream << "</Employee>" << endl;
    };

    static Employee* read(std::istream& bis) { // Read record from current file position
        EmployeeRec empRec;
        bis.read(reinterpret_cast<char*>(&empRec), sizeof(empRec));

        Employee* emp = new Employee();

        if (bis) {
            // cout << "EMPREC ID: " << empRec.id << ", NAME: " << empRec.name << endl;
            emp->id = empRec.id;
            emp->name = empRec.name;
            emp->address = empRec.address;
            emp->city = empRec.city;
            emp->state = empRec.state;
            emp->country = empRec.country;
            emp->phone = empRec.phone;
            emp->salary = empRec.salary;
        }
        else return nullptr;

        return emp;
    };

    static Employee* retrieve(std::istream& bis, int id) { // Search file for record by id
        EmployeeRec empRec;
        Employee* emp = new Employee();

        while(bis) {
            bis.read(reinterpret_cast<char*>(&empRec), sizeof(empRec));

            if (bis && empRec.id == id) {
                // Found employee
                emp->id = empRec.id;
                emp->name = empRec.name;
                emp->address = empRec.address;
                emp->city = empRec.city;
                emp->state = empRec.state;
                emp->country = empRec.country;
                emp->phone = empRec.phone;
                emp->salary = empRec.salary;
                return emp;
            }
        }
        // found no employee with matching id
        return nullptr;
    };

    static Employee* fromXML(std::istream& is) { // Read the XML record from a stream
        Employee* emp = new Employee();

        bool empTag = false;
        bool valTag = false;
        char n;
        string tag = "";
        string prevTag = "";
        string attVal = "";

        while(is) {
            n = is.get();
            if (n == '\n' || n == '\t' || std::isspace(n)) continue;
            else if (!is) return nullptr;
            prevTag = tag;
            tag = getXMLTag(is, n);

            // if we already have employee tag but dont already have an opening attribute tag, 
            // start getting attribute values
            if (empTag && !valTag) {
                if (tag == "/employee") break; // if we need to close employee tag
                else if (tag == "name") emp->name = getAttVal(is, valTag);
                else if (tag == "id") emp->id = std::stoi(getAttVal(is, valTag));
                else if (tag == "address") emp->address = getAttVal(is, valTag);
                else if (tag == "city") emp->city = getAttVal(is, valTag);
                else if (tag == "state") emp->state = getAttVal(is, valTag);
                else if (tag == "country") emp->country = getAttVal(is, valTag);
                else if (tag == "phone") emp->phone = getAttVal(is, valTag);
                else if (tag == "salary") emp->salary = std::stod(getAttVal(is, valTag));
                else throw std::runtime_error("Incorrect tag: <" + tag + ">");
            }

            // If we have already parsed an attribute tag and value, check for a closing tag
            else if (valTag) {
                // if no closing tag, throw error
                if (tag != ('/' + prevTag)) throw std::runtime_error("Missing tag: </" + prevTag + ">");
                valTag = false; // otherwise we do have closing tag and reset attTag value
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