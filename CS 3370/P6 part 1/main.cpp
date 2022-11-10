// tbitarray.cpp: A cursory test for the BitArray class
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>
#include "bitarray.h"
#include "test.h"
using namespace std;
// Test program
int main() {
   BitArray<> b;
   const BitArray<> b1{b}; // Test copy constructor
   
   // Test empty Bitarray properties
   test_(b.size() == 0);
   test_(b.count() == 0);
   test_(b.capacity() == 0);
   test_(!b.any());
   
   // Validate construction and to_string()
   BitArray<> b2{5};
   test_(b2.size() == 5);
   test_(b2.to_string() == "00000");
   // Test copy, assign, equality, and from_string
   BitArray<> b3{b2};
   ostringstream os;
   os << "    101" << 'a' << " 0101";
   istringstream is{os.str()};
   b3 = BitArray<>{};
   is >> b3;
   test_(b3.to_string() == "101");
   is.get();
   is >> b3;
   test_(b3.to_string() == "0101");
   os.str("");
   os << "abc";
   istringstream is2{os.str()};
   is2 >> b3;
   test_(!is2);
   test_(b3.to_string() == "0101");
   os.str("");
   os << "11130100";
   istringstream is3{os.str()};
   is3 >> b3;
   test_(b3.to_string() == "111");
   is3.get();
   is3 >> b3;
   test_(b3.to_string() == "0100");
   BitArray<> b9{"11111111111111111111111111000000000000000000000000000011"};
   ostringstream ostr;
   ostr << b9;
   test_(ostr.str() == "11111111111111111111111111000000000000000000000000000011");
   test_(b9.count() == 28);
   BitArray<> b13("");
   test_(b13.size() == 0);
      BitArray<> x{"101010110"}; // Also tests string constructor
   test_(x.count() == 5);
   test_(x.any());
   BitArray<> y{~x};
   test_(!(x == y));
   nothrow_(x.toggle());
   test_(x == y);
   test_(x.to_string() == "010101001");
   test_(y.to_string() == "010101001");
 
   report_();
}