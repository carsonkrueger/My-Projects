#include <iostream>

class ClassOne {
    public:
        void print() { 
            std::cout << "this is ClassOne" << std::endl; 
        };
};

class ClassTwo {
    public:
        void print() { 
            std::cout << "this is ClassTwo" << std::endl; 
        };
};

int main () {
    // static cast from double to int, (truncates)
    double num = 5.2;
    std::cout << static_cast<int>(num) << std::endl;

    // reinterpret_cast from one class to another
    ClassOne* b = new ClassOne();
    b->print(); // before cast

    ClassTwo* d = reinterpret_cast<ClassTwo*>(b);
    d->print(); // after cast
}
