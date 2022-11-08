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
   bool test(size_t pos) const;
   unsigned int extract(size_t m, size_t n) const;
   operator unsigned int () const;
   friend std::ostream& operator<<(std::ostream& os, const BitWord& b) {
      unsigned int n = b.word;
      unsigned int mask = 1u;
      // for (int i=0; i<31; ++i) {
      mask << 1;
      os << (mask);
      // }
      return os;
   }
};

int main() {
   BitWord b{4};
   std::cout << b;
}