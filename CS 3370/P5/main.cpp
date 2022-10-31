#include <iostream>
#include <fstream>
#include <string>
#include <map>

struct cmp {
    bool operator()(std::string str1, std::string str2) const {
        std::string::iterator it1 = str1.begin(), it2 = str2.begin();
        while(it1 != str1.end() && it2 != str2.end()) {
            if (std::tolower((it1++)[0]) < std::tolower((it2++)[0])) return true;
            else if (std::tolower((it1++)[0]) > std::tolower((it2++)[0])) return false;
        }
        return false;
    }
};

int main() { 
    std::fstream f("strings.txt");
    std::string word = "";
    std::multimap<std::string, std::pair<int, int>> words;
    int line = 1;
    while(f) {
        char n = f.get();
        if (!std::isalpha(n) && n != '\'' && n != '-') { // found a word to store
            auto range = words.equal_range(word);
            bool didInc = false;
            for (auto it = range.first; it != range.second; ++it) {
                if (it->second.first == line) {
                    it->second.second++;
                    didInc = true;
                }
            }
            if (!didInc) words.emplace(word, std::make_pair(line, 1)); // create key & pair
            if (n == '\n') ++line;
            word = "";
        }
        else if (std::isalpha(n) || n == '\'' || n == '-') word += n;
    }

    std::string prev = words.begin()->first;
    for (auto w: words) {
        if (w.first == prev) std::cout << ",  " << w.second.first << ":" << w.second.second;
        else std::cout << std::endl << w.first << "   :   " << w.second.first << ":" << w.second.second;
        prev = w.first;
    }
}

