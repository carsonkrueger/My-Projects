#include <vector>
#include <string>
#include <math.h>
#include <iostream>
#include <algorithm>

using std::string;
using std::ostream;
using std::istream;

template<class IType = size_t>
class BitArray {
    size_t BITS_PER_BLOCK = sizeof(IType);
    std::vector<IType> bitStr;
    // in bits
    size_t siz = 0;
    // in bits
    size_t cap = 0;
    bool read_bit(size_t bitpos) const {
        size_t block = bitpos / BITS_PER_BLOCK; // 1 = 50/32
        size_t offset = bitpos % BITS_PER_BLOCK;// 18 = 50%32
        size_t mask = 1u << offset;
        return !!(bitStr[block] & mask);
    }
    void assign_bit(size_t bitpos, bool val) {
        size_t block = bitpos / BITS_PER_BLOCK; // 1 = 50/32
        size_t offset = bitpos % BITS_PER_BLOCK;// 18 = 50%32
        size_t mask = 1u << offset;
        if (val) bitStr[block] |= mask; //set
        else bitStr[block] &= ~mask; // reset
    }
public:
    // struct bitproxy {
        
    // }
    // Object Management
    explicit BitArray(size_t n=0) : siz{n} {
        size_t newCap = (n/BITS_PER_BLOCK) + 1;
        cap = newCap;
        bitStr.resize(newCap);
        std::fill(bitStr.begin(), bitStr.end(), 0);
        for (size_t i=0; i<n; ++i) 
            assign_bit(i, 0);
    }
    explicit BitArray(const string& s) : siz{s.size()} {
        size_t newCap = (cap/BITS_PER_BLOCK) + 1;
        cap = newCap;
        bitStr.resize(newCap);
        std::fill(bitStr.begin(), bitStr.end(), 0);
        for (size_t i=0; i<s.size(); ++i) {
            bool val = (s.at(i) == '1') ? true : false;
            assign_bit(i, val);
        }
    }
    BitArray(const BitArray& b) = default; // Copy constructor
    BitArray& operator=(const BitArray& b) = default; // Copy assignment
    BitArray(BitArray&& b) noexcept; // Move constructor

    
    BitArray& operator=(BitArray&& b) noexcept; // Move assignment
    size_t capacity() const { // # of bits the current allocation can hold
        return cap;
    } 
    // Mutators
    BitArray& operator+=(bool val) { // Append a bit
        if (siz == cap) {
            if (siz/BITS_PER_BLOCK >= bitStr.capacity()) bitStr.push_back(0);
            cap++;
        }
        assign_bit(siz, val);
        siz++;
        return *this;
    } 
    BitArray& operator+=(const BitArray& b); // Append a BitArray
    void erase(size_t pos, size_t nbits = 1); // Remove “nbits” bits at a position
    void insert(size_t n, bool val); // Insert a bit at a position (slide "right")
    void insert(size_t pos, const BitArray&); // Insert an entire BitArray object
    // Bitwise ops
    // bitproxy operator[](size_t) { // <--------------------------------- put back in
    //     return bitproxy(this);
    // }
    bool operator[](size_t pos) const {
        return read_bit(pos);
    }
    void toggle(size_t i) {
        assign_bit(i, !read_bit(i));
    }
    void toggle() { // Toggles all bits
        for (size_t i=0; i<siz; ++i) 
            toggle(i);
    } 
    BitArray operator~() const {
        BitArray tmp = *this;
        tmp.toggle();
        return tmp;
    }
    BitArray operator<<(unsigned int) const; // Shift operators…
    BitArray operator>>(unsigned int) const;
    BitArray& operator<<=(unsigned int);
    BitArray& operator>>=(unsigned int);

    // Extraction ops
    BitArray slice(size_t pos, size_t count) const; // Extracts a new sub-array

    // Comparison ops
    bool operator==(const BitArray& b) const;
    bool operator!=(const BitArray& b) const;
    bool operator<(const BitArray& b) const;
    bool operator<=(const BitArray& b) const;
    bool operator>(const BitArray& b) const;
    bool operator>=(const BitArray& b) const;

    // Counting ops
    size_t size() const { // Number of bits in use in the vector
        return siz;
    } 
    size_t count() const { // The number of 1-bits present
        size_t n = 0;
        for (size_t i=0; i<siz; ++i) 
            if (read_bit(i) == true) n++;
        return n;
    }
    bool any() const { // Optimized version of count() > 0
        for (size_t i=0; i < siz; ++i)
            if (read_bit(i)) return true;
        return false;
    }
    // Stream I/O (define these in situ—meaning the bodies are inside the class)
    friend ostream& operator<<(ostream& os, const BitArray& b) {
        for (size_t i=0; i<b.size(); ++i) {
            bool val = b.read_bit(i);
            char ch = (val) ? '1' : '0';
            os << ch;
        }
        return os;
    }
    friend istream& operator>>(istream& is, BitArray& b) {
        while (is) {
            char ch = is.get();
            if (ch != '1' && ch != '0') break;
            bool val = (ch == '1') ? true : false;
            b += val;
        }
        return is;
    }
    // String conversion
    string to_string() const {
        std::string str = "";
        for (size_t i=0; i<siz; ++i) {
            bool val = this->read_bit(i);
            char ch = (val) ? '1' : '0';
            str.push_back(ch);
        }
        return str;
    }
};