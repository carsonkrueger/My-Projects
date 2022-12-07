#include "bitarray.h"
#include <ostream>

int main() {
    // BitArray<> b{"1010101"};
    BitArray<> b;
    b[0];
    BitArray<> b2{"101111111"};
    BitArray<> b3;
    // b3.toggle(0);
    std::cout << (b <= b2) << std::endl;
    b[b.size()-1] = b[0];
    std::cout << "-> " << b[2] << std::endl;
    // b += true;
    // std::cout << b.to_string() << std::endl;
    // for (int i=0; i < 32; ++i)
    //     std::cout << b[i];
    // b.toggle(5);
    std::cout << b.to_string() << std::endl;
    b >>= 2;
    // b = "101010111";
    std::cout << b.to_string() << std::endl;
    std::cout << (b >> 2) << std::endl;
    b.insert(1, b2);
    std::cout << b << std::endl;
    
   BitArray<> b6{"10101"}; // 21
   BitArray<> b7{"101010"}; // 21

//    b6.insert(4, b7);
//    std::cout << "here" << b6.to_string() << std::endl;
//    b6.insert(7, b2);
//    std::cout << "here" << b6.to_string() << std::endl;

   std::cout << "comparisons" << std::endl;
   std::cout << (b6 < b7) << std::endl; //fail
   std::cout << (b6 <= b7) << std::endl; //fail
   std::cout << (b6 <= b6) << std::endl;
   std::cout << (b7 > b6) << std::endl; //fail
   std::cout << (b7 >= b6) << std::endl; //fail
   std::cout << (b7 >= b7) << std::endl;
   std::cout << (BitArray<>("111") > BitArray<>("10111")) << std::endl; // fail
}