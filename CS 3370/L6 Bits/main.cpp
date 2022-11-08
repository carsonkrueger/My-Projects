#include <iostream>

class BitWord {
public:
   explicit BitWord(unsigned int n = 0);
   void set(size_t pos);
   void reset(size_t pos);
   void flip(size_t pos);
   bool test(size_t pos) const;
   unsigned int extract(size_t m, size_t n) const;
   operator unsigned int () const;
   friend std::ostream& operator<<(std::ostream& os, const BitWord& b);
};