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
    Employee(string na, int i, string a, string ci, string st, string co, string p, double sa): 
        name{na}, id{i}, address{a}, city{ci}, state{st}, country{co}, phone{p}, salary{sa} {};

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
        string name = "";
        int id = -1;
        string address = "";
        string city = "";
        string state = "";
        string country = "";
        string phone = "";
        double salary = -1;

        bool empTag = false;
        char n;
        string tag = "";
        string prevTag = "";
        string attVal = "";

        while(in) {
            n = in.get();
            if (n == '\n' || n == '\t') continue;
            prevTag = tag;
            tag = "";

            // gets the element tag
            if (n == '<') {
                n = in.get();
                while (in && n != '>') {
                    tag += n;
                    n = in.get();
                }
                cout << tag << endl;
            }

            // if we already have employee tag, start getting attribute values
            if (empTag == true) {
                if (tag == "/employee") break; // if we need to close employee tag
                else if (tag == "name") name = getAttVal(in);
                else if (tag == "id") id = std::stoi(getAttVal(in));
                else if (tag == "address") address = getAttVal(in);
                else if (tag == "city") city = getAttVal(in);
                else if (tag == "state") state = getAttVal(in);
                else if (tag == "country") country = getAttVal(in);
                else if (tag == "phone") phone = getAttVal(in);
                else if (tag == "salary") salary = std::stod(getAttVal(in));
                else if (tag != ('/' + prevTag)) throw std::runtime_error("Incorrect or missing tag: \"" + tag + "\"");
            }

            // if we dont yet have an employee tag
            if (empTag == false) {
                if (tag == "employee") empTag = true;
                else { 
                    // tag != "employee", but we dont have an opening employee tag
                    throw std::runtime_error("Missing opening employee tag");
                    break;
                }
                continue; // this will allow us to get the next tag for the attributes
            }

            
        }

        if (name == "" || id == -1 || salary == -1) {
            throw std::runtime_error("Name, Id, and Salary are all required fields");
        }

        return new Employee(name, id, address, city, state, country, phone, salary);
    }

    static string getAttVal(std::istream& in) {
        cout << "getAttVal" << endl;
        string attVal = "";
        char n = in.get();
        while (in && n != '<') {
            attVal += n;
            n = in.get();
        }
        if (attVal == "") throw std::runtime_error("Attribute value cannot be empty");
        in.unget(); // pushes the '<' back onto the buffer
        return attVal;
    }
};