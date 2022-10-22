#include <iostream>
#include <fstream>
#include <vector>
#include <array>
#include <iterator>

int main(int argc, char* argv[]) {
    for(int i = 0; i < argc; ++i){
        std::vector<int> data;
        std::ifstream f(argv[i]);

        int n;
        while(f >> n) data.push_back(-n); // negates
        
        std::vector<int> smoothData;
        std::vector<int>::iterator it = smoothData.begin();
        const int siz = data.size();
        for (int j = 0; j < siz; ++j) {
            if (j == 0 || j == 1 || j == 3 || j == siz-1 || j == siz-2 || j == siz-3) 
                smoothData.push_back(*it);
            else 
                smoothData.push_back((it[-3] + 2*it[-2] + 3*it[-1] + 3*it[0] + 3*it[1] + 2*it[2] + it[3]) / 15);
            i++;
        }
    }
}