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
        const int siz = data.size();
        for (int j = 0; j < siz; ++j) {
            if (j == 0 || j == 1 || j == 3 || j == siz-1 || j == siz-2 || j == siz-3) 
                smoothData.push_back(data[j]);
            else 
                smoothData.push_back((data[j-3] + 2*data[j-2] + 3*data[j-1] + 3*data[j] + 3*data[j+1] + 2*data[j+2] + data[j+3]) / 15);
            
        }
    }
}