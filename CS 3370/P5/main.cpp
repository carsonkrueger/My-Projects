#include <iostream>
#include <iomanip>
#include <fstream>
#include <string>
#include <map>
#include <cstring>

struct cmp {
    bool operator()(const std::string& str1, const std::string& str2) const {
        return _stricmp(str1.c_str(), str2.c_str()) < 0;
    }
};

int main() { 
    std::fstream f("strings.txt");
    std::string word = "";
    std::multimap<std::string, std::pair<int, int>, cmp> words;
    int line = 1, longWord = 0;
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
            if (word.length() > longWord) longWord = word.length();
            word = "";
        }
        else if ((std::isalpha(n) || n == '\'' || n == '-') && n != '\n') word += n;
    }

    std::string prev = words.begin()->first;
    int nums = 1;
    for (auto w: words) {
        if (w.first == prev) {
            std::cout << ",  " << w.second.first << ":" << w.second.second;
            nums++;
        }
        // else if (w.first == prev && nums >= 9) {
        //     std::cout << std::endl << std::setw(longWord) << ",  " << w.second.first << ":" << w.second.second;
        //     nums = 1;
        // }
        else std::cout << std::endl << std::left << std::setw(longWord) << w.first << " : " << w.second.first << ":" << w.second.second;
        prev = w.first;
    }
}

