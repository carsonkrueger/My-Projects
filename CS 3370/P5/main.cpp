#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <iterator>

struct cmp {
    bool operator()(std::string str1, std::string str2) const {
        std::string::iterator it1 = str1.begin(), it2 = str2.begin();
        while(it1 != str1.end() && it2 != str2.end()) {
            if (std::tolower((it1++)[0]) < std::tolower((it2++)[0])) return true;
            else if (std::tolower((it1++)[0]) > std::tolower((it2++)[0])) return false;
        }
        return true;
    }
};

int main() { 
    std::fstream f("strings.txt");
    std::string word = "";
    std::multimap<std::string, std::pair<int, int>> words;
    int line = 1;
    while(f) {
        char n = f.get();
        if (!std::isalpha(n) && n != '\'' && n != '-') {
            // words[std::make_pair(word, line)]++;
            // if(words.find(word) != words.end()) // increment
            // words.equal_range
            else words.emplace(word, std::make_pair(line, 1)); // create key & pair
            if (n == '\n') ++line;
            word = "";
            continue;
        }
        word += n;
    }

    // for (auto w: words) {
    //     std::cout << w.first.first << "    :    " << w.first.second << ":" << w.second << std::endl;
    // }
}

