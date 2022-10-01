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

        // ----- get

        bool empTag = false;
        bool attTag = false;

        char n;
        string tag = "";
        string attVal = "";
        while(in) {
            n = in.get();
            tag = "";

            // gets the element tag
            if (n == '<') {
                while (in && n != '>') {
                    n = in.get();
                    tag += n;
                }
            }

            // if we dont yet have an employee tag
            if (empTag == false) {
                if (tag == "employee") empTag = true;
                else throw std::runtime_error;
                continue; // this will allow us to get the next tag for the attributes
            }

            // if we need to close employee tag
            if (empTag == true && tag == "/employee") empTag = false;
            
            // if we already have employee tag, start getting attribute values
            
            switch (tag) {
                // case ("employee") 
                case ("name") name = getAttVal(in);
                case ("id") id = static_cast<int>(getAttVal(in));
                case ("address") address = getAttVal(in);
                case ("city") city = getAttVal(in);
                case ("state") state = getAttVal(in);
                case ("country") country = getAttVal(in);
                case ("phone") phone = getAttVal(in);
                case ("salary") salary = static_cast<double>(getAttVal(in));
            }
        }

        // ------ >>

        // string s;
        // while(in) {
        //     in >> s;
        //     int idx = s.find("<employee>");
        //     if (idx != string::npos) {
        //         cout << idx << ": " << s << endl;
        //     }
        // }
        
        // ----- split method

        // std::vector<string> wordVector;

        // string line;
        // while(in >> line) {
        //     cout << line << endl;

        //     std::size_t prev = 0, pos;
        //     while ((pos = line.find_first_of("<>", prev)) != std::string::npos){
        //         if (pos > prev)
        //             wordVector.push_back(line.substr(prev, pos-prev));
        //         prev = pos+1;
        //     }
        //     if (prev < line.length())
        //         wordVector.push_back(line.substr(prev, std::string::npos));
        // }

        // for (int i=0; i<wordVector.size(); ++i) {
        //     if 
        // }

        Employee* emp = new Employee();
        return emp;
    }

    string getAttVal(std::istream& in) {
        string attVal = "";
        while (in && n != '<') {
            attVal += n;
            n = in.get();
        }
        in.unget(); // pushes the '<' back onto the buffer
        return attVal;
    }
};