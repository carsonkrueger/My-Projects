#include <iostream>
#include <string>
using std::cin, std::cout, std::endl;
using std::string;

#include "Mydict.h"

int main() {
    mydict d;
    string s;
    while (true) {
        cout << "Enter a word: ";
        cin >> s;
        if (s == "q")
            break;
        d.tally_word (s);
    }
    while (true) {
        cout << "Enter a word to get the count for: ";
        cin >> s;
        if (s == "q")
            break;
        cout << s << " appeared " << d.howmany(s) << " times" << endl;
    }
    d.dump(cout);
}