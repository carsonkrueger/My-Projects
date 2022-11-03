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

int main(int argc, char* argv[]) {
    std::string filename;
    if (argc == 1) {std::cout << "No argument given. Enter file name: "; std::cin >> filename;}
    std::fstream f(filename);
    std::string word = "";
    std::map<std::string, std::vector<size_t>, cmp> wLine, wCount;
    size_t line = 1, longWord = 0;

    while(f) {
        char n = f.get();
        if (!std::isalpha(n) && n != '\'' && n != '-') { // found incorrect character, this means we found an end to a word
            if (std::find_if(wLine[word].begin(), wLine[word].end(), [line](size_t x){return x==line;}) != wLine[word].end()) { // if word exists
                for (size_t i=0; i<wLine[word].size(); ++i) {
                    if (wLine[word][i] == line) {
                        wCount[word][i]++;
                        break;
                    }
                }
            } else if (word != "") { // else word does not exist
                if (word.length() > longWord) longWord = word.length(); // save longest word length
                wLine[word].push_back(line);
                wCount[word].push_back(1);
            }
            if (n == '\n') ++line;
            word = "";
        }
        else if (word == "" && !std::isalpha(n)) continue; // does not start with alphabetic char
        else if (std::isalpha(n) || n == '\'' || n == '-') word += n; // found correct char sequence to add to word
    }

    std::ofstream ofs("output.txt");
    for (std::map<std::string, std::vector<size_t>>::iterator it=wLine.begin(); it!=wLine.end(); ++it){
        ofs << std::endl << std::left << std::setw(longWord) << it->first << " : ";
        for (size_t i=0; i<wLine[it->first].size(); ++i) {
            if (i % 9 == 0 && i != 0) ofs << std::endl << std::right << std:: setw(longWord+3) << " : ";
            ofs << wLine[it->first].at(i) << ":" << wCount[it->first].at(i) << ", " ;
        }
    }
}