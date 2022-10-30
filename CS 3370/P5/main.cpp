#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <iterator>

int main() { 
    std::fstream f("strings.txt");
    std::string word;
    std::multimap<std::string, std::pair<int, int>, cmp> words;
    while(f >> word) {
        std::cout << word << std::endl;
    }
}

struct cmp {
    bool operator()(std::string str1, std::string str2) const {
        // return std::strcmp(str1, str2);
        std::string::iterator it1 = str1.begin(), it2 = str2.begin();
        while(it1 != str1.end() && it2 != str2.end()) {
            if (std::tolower((it1++)[0]) < std::tolower((it2++)[0])) return true;
            else if (std::tolower((it1++)[0]) > std::tolower((it2++)[0])) return false;
        }
        return true;
    }
};
