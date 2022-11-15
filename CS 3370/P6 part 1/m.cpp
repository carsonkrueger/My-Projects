#include "bitarray.h"
#include <ostream>

int main() {
    // BitArray<> b{"1010101"};
    BitArray<> b{"100011"};
    b += true;
    // std::cout << b.to_string() << std::endl;
    // for (int i=0; i < 32; ++i)
    //     std::cout << b[i];
    b.toggle(5);
    std::cout << b.to_string();
    return 0;
}