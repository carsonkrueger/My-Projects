#include "bitarray.h"
#include <ostream>

int main() {
    // BitArray<> b{"1010101"};
    BitArray<> b{"10001111"};
    b += true;
    // std::cout << b.to_string() << std::endl;
    // for (int i=0; i < 32; ++i)
    //     std::cout << b[i];
    // b.toggle(5);
    std::cout << b.to_string() << std::endl;
    b <<= 2;
    std::cout << b.to_string() << std::endl;
    std::cout << (b << 2) << std::endl;
    return 0;
}