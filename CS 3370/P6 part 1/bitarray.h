#include <vector>
#include <string>
#include <math.h>
#include <iostream>


using std::string;
using std::ostream;
using std::istream;

template<class IType = size_t>
class BitArray {
    size_t BITS_PER_BLOCK = sizeof(size_t);
    std::vector<IType> bitStr;
    // in bits
    size_t siz = 0;
    // in bits
    size_t cap = 0;
    bool read_bit(size_t bitpos) const {
        size_t block = (bitpos / BITS_PER_BLOCK)-1; // 1 = 50/32
        size_t offset = (bitpos % BITS_PER_BLOCK)-1;// 18 = 50%32
        size_t mask = 1u << (BITS_PER_BLOCK-offset);
        return !!(bitStr[block] & mask);
    }
    void assign_bit(size_t bitpos, bool val) {
        size_t block = (bitpos / BITS_PER_BLOCK)-1; // 1 = 50/32
        size_t offset = (bitpos % BITS_PER_BLOCK)-1;// 18 = 50%32
        size_t mask = 1u << (BITS_PER_BLOCK-offset);
        if (siz == cap) {
            if (block >= bitStr.capacity()-1) bitStr.push_back(0);
            cap++;
        }
        if (val) bitStr[block] = bitStr[block] | mask; //set
        else bitStr[block] = bitStr[block] & mask; // reset
        siz++;
    }
public:
    // Object Management
    explicit BitArray(size_t n=0) {
        size_t newSiz = ceil(n/BITS_PER_BLOCK);
        cap = newSiz * BITS_PER_BLOCK;
        bitStr.resize(newSiz);
    }
    explicit BitArray(const string& s) {
        siz = s.size();
        cap = ceil(siz/BITS_PER_BLOCK) * BITS_PER_BLOCK;
        for (size_t i=0; i<s.size(); ++i) {
            assign_bit(i, s.at(i));
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
        // size_t block = siz / BITS_PER_BLOCK; // 1 = 50/32
        // size_t offset = siz % BITS_PER_BLOCK;// 18 = 50%32
        // size_t mask = 1u << (BITS_PER_BLOCK-offset-1);
        // if (siz == cap) {
        //     if (block >= bitStr.capacity()) bitStr.push_back(0);
        //     cap++;
        // }
        // if (val) bitStr[block] = bitStr[block] | mask; //set
        // else bitStr[block] = bitStr[block] & mask; // reset
        // siz++;
        assign_bit(siz, val);
        return *this;
    } 
    BitArray& operator+=(const BitArray& b); // Append a BitArray
    void erase(size_t pos, size_t nbits = 1); // Remove “nbits” bits at a position
    void insert(size_t n, bool b) { // Insert a bit at a position (slide "right")
        assign_bit(n, b);
    } 
    void insert(size_t pos, const BitArray&); // Insert an entire BitArray object
    // Bitwise ops
    // bitproxy operator[](size_t); // <--------------------------------- put back in
    bool operator[](size_t pos) const {
        return read_bit(pos);
    }
    void toggle(size_t i) {
        assign_bit(i, !read_bit(i));
    }
    void toggle() { // Toggles all bits
        for (size_t i=0; i<siz; ++i) {
            assign_bit(i, !read_bit(i));
        }
    } 
    BitArray operator~() const;
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
    bool any() const; // Optimized version of count() > 0
    // Stream I/O (define these in situ—meaning the bodies are inside the class)
    friend ostream& operator<<(ostream& os, const BitArray& b) {
        bool val;
        char ch;
        for (size_t i=0; i<b.size(); ++i)
            val = b.read_bit(i);
            ch = (val) ? '1' : '0';
            os << ch;
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
        bool val;
        char ch;
        for (size_t i=0; i<siz-1; ++i)
            val = this->read_bit(i);
            ch = (val) ? '1' : '0';
            str.push_back(ch);
        return str;
    }
};