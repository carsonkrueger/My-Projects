#pragma once
#include <iostream>
#include <bitset>

class Bits {
    using IType = unsigned long long;
    enum {NBITS = sizeof(IType)*8};
    IType bits = 0;
    public:
        Bits(){
            bits = 0;
        }
        Bits(IType n) {
            bits = n;
        }
        static int size() {
            return NBITS;
        }
        friend std::ostream& operator<<(std::ostream& out, Bits &c){
            out << std::bitset<64>(c.bits) << std::endl;
            return out;
        }
        friend bool operator==(Bits &rhs, Bits &lhs){
            return(rhs.bits == lhs.bits);
        }
        friend bool operator!=(Bits &rhs, Bits &lhs){
            return(rhs.bits != lhs.bits);
        }
        void printBits(){
            std::cout << bits << " : " << std::bitset<64>(bits) << std::endl;
        }
        bool at(int pos) const{     // Returns (tests) the bit at bit position pos
            return (bits & (1 << pos) ? true : false);
        }
        void set(int pos){         // Sets the bit at position pos
            bits |= (1 << pos);
        }
        void set(){               // Sets all bits
            for(int i = size()-1; i >= 0; i--){
                bits |= (1 << i);
            }
        }
        void reset(int pos){      // Resets (makes zero) the bit at position pos
            bits &= ~(1 << pos);
        }
        void reset(){             // Resets all bits
            for(int i = size()-1; i >= 0; i--){
                bits &= ~(1 << i);
            }
        }
        void assign(int pos, bool val){ // Sets or resets the bit at position pos depending on val
            bits = (val) ? (bits |= (1 << pos)) : (bits &= ~(1 << pos));
        }
        void assign(IType n){           // Replaces the underlying integer with n
            bits = n;
        }
        void toggle(int pos){           // Flips the bit at position pos
            bits ^= (1 << pos);
        }
        void toggle(){                  // Flips all bits
            bits = ~bits;
        }
        void shift(int n){              // If n > 0, shifts bits right n places; if n < 0, shifts left
            bits = (n > 0) ? (bits >> n) : (bits << -n);
        }
        void rotate(int n){             // If n > 0, rotates right n places; if n < 0, rotates left
            if(n == 0){
                bits = bits;
            } else if(n > 0) {
                bits = (bits >> n) | (bits << (size() - n));
            } else {
                bits = (bits << -n) | (bits >> (size() + n));
            }
        }
        int ones() const;         // Returns how many bits are set in the underlying integer
        int zeroes() const {      // Returns how many bits are reset in the underlying integer
            return NBITS - ones();
        }
        IType to_int() const {
            return bits;
        }
};