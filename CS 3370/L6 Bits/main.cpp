#include <iostream>

class BitWord {
   unsigned int word;
public:
   explicit BitWord(unsigned int n = 0) : word{n} {};
   void set(size_t pos) {
      unsigned int mask = 1u << pos;
      word |= mask;
   }
   void reset(size_t pos) {
      unsigned int mask = 1u << pos;
      word &= ~mask;
   }
   void flip(size_t pos) {
      unsigned int mask = 1u << pos;
      word ^= mask;
   }
   bool test(size_t pos) const {
      unsigned int mask = 1u << pos;
      return !!(word & mask);
   }
   unsigned int extract(size_t m, size_t n) const {
      unsigned int tmp = this->word;
      unsigned int mask = ((1u << (n-m)) - 1);
      return (tmp >> m) & mask;
   }
   operator unsigned int () const;
   friend std::ostream& operator<<(std::ostream& os, const BitWord& b) {
      os << b.word << std::endl;
      return os;
   }
};

int main() {
   BitWord b{15};
   std::cout << b;
   
   std::cout << b.extract(1,4) << std::endl;

   for (int i=0; i<8; ++i) {
      std::cout << b.test(i) << " ";
   }
}