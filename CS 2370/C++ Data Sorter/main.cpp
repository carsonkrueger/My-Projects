#include <iostream>
#include <string>


int Log(std::string str);
void addprint();

int main() {
    
}

int Log(std::string str) {
    std::cout << str << std::endl;
}

void addprint() {
    static int s = 1;
    std::cout << ++s;
}

