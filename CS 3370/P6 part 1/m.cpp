#include "bitarray.h"
#include <ostream>

int main() {
    BitArray<> b;
    b += true;
    b += false;
    std::cout << b[1];
    return 0;
}