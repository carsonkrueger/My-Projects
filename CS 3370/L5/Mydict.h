#include <iostream>
#include <string>
#include <map>

class mydict {
    std::map<string, int> words;
public:
    int howmany(string s) {
        try {
            return words.at(s);
        }
        catch(std::out_of_range) {
            return 0;
        }
    }

    void dump(std::ostream& os) {
        for (auto word: words) 
            os << word.first << " " << word.second << std::endl;
    }

    void tally_word(string  s) {
        words[s]++;
    }
};
