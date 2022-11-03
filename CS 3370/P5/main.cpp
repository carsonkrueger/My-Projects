#include <iostream>
#include <iomanip>
#include <fstream>
#include <string>
#include <map>
#include <cstring>
#include <vector>
#include <algorithm>

struct cmp {
    bool operator()(const std::string& str1, const std::string& str2) const {
        return _stricmp(str1.c_str(), str2.c_str()) < 0;
    }
};

// int main(int argc, char* argv[]) {
//     std::fstream f("strings.txt");
//     std::string word = "";
//     std::multimap<std::string, std::pair<int, int>, cmp> words;
//     int line = 1, longWord = 0;
//     while(f) {
//         char n = f.get();
//         if (!std::isalpha(n) && n != '\'' && n != '-') { // found a word to store
//             auto range = words.equal_range(word);
//             bool didInc = false;
//             for (auto it = range.first; it != range.second; ++it) {
//                 if (it->second.first == line) {
//                     it->second.second++;
//                     didInc = true;
//                 }
//             }
//             if (!didInc && word != "") words.emplace(word, std::make_pair(line, 1)); // create key & pair
//             if (n == '\n') ++line;
//             if (word.length() > longWord) longWord = word.length();
//             word = "";
//         }
//         else if (word == "" && !std::isalpha(n)) continue; // does not start with alphabetic char
//         else if (std::isalpha(n) || n == '\'' || n == '-') word += n; // found correct char sequence to add to word
//     }

//     std::string prev = "null";
//     int nums = 1;
//     for (auto w: words) {
//         if (w.first == prev) {
//             std::cout << ",  " << w.second.first << ":" << w.second.second;
//             ++nums;
//         }
//         // else if (w.first == prev && nums >= 9) {
//         //     std::cout << std::endl << std::setw(longWord) << ",  " << w.second.first << ":" << w.second.second;
//         //     nums = 1;
//         // }
//         else {
//             std::cout << std::endl << "-" << std::left << std::setw(longWord) << w.first << " : " << w.second.first << ":" << w.second.second;
//             nums = 1;
//         }
//         prev = w.first;
//     }
// }

int main() {
    std::fstream f("strings.txt");
    std::string word = "";
    std::map<std::string, std::vector<int>, cmp> wLine, wCount;
    int line = 1, longWord = 0;

    while(f) {
        char n = f.get();
        if (!std::isalpha(n) && n != '\'' && n != '-') { // found a word to store
            if (std::find_if(wLine[word].begin(), wLine[word].end(), [line](int x){return x==line;}) != wLine[word].end()) {
                for (size_t i=0; i<wLine[word].size(); ++i) 
                    if (wLine[word][i] == line) {
                        wCount[word][i]++;
                        if (word.length() > longWord) longWord = word.length(); // save longest word
                        break;
                    }
            } else {
                // std::cout << word << " ";
                // wLine.insert(std::pair<std::string, std::vector<int>>(word, {line}));
                // wCount.insert(std::pair<std::string, std::vector<int>>(word, {1}));
                wLine[word].push_back(line);
                wCount[word].push_back(1);
                // std::cout << wLine[word][0] << " : " << wCount[word][0] << std::endl;
                // wLine.emplace(word, line);
                // wCount.emplace(word, 1);
            }
            if (n == '\n') ++line;
            word = "";
        }
        else if (word == "" && !std::isalpha(n)) continue; // does not start with alphabetic char
        else if (std::isalpha(n) || n == '\'' || n == '-') word += n; // found correct char sequence to add to word
    }

    for (std::map<std::string, std::vector<int>>::iterator it=wLine.begin(); it!=wLine.end(); ++it){
        std::cout << std::endl << std::left << std::setw(longWord) << it->first << " : ";
        for (size_t i=1; i<wLine.size(); ++i) {
            if (i % 9 == 0) std::cout << std::endl << std::right << std:: setw(longWord+3) << " : ";
            std::cout << wLine[it->first].at(i) << ":" << wCount[it->first].at(i) << ", " ;
        }
    }
}