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
    struct bitproxy {
        size_t pos;
        BitArray* obj;
        // constructor
        bitproxy (BitArray* obj, size_t p) : obj{obj}, pos{p} {
            if (p >= obj->size()) throw std::logic_error("Error: Out of range");
        }
        // 2 assignment operators, 1 returns a bool, & 1 returns a bitproxy
        bitproxy& operator=(bool val) {
            obj->assign_bit(pos, val);
            return *this;
        }
        bitproxy& operator=(bitproxy bp) {
            obj->assign_bit(pos, bp);
            return *this;
        }
        // operator bool
        operator bool() {
            return obj->read_bit(pos);
        }
    };

    // Object Management
    explicit BitArray(size_t n=0) : siz{n} {
        if (n != 0) {
            size_t newCap = (n/BITS_PER_BLOCK) + 1;
            cap = newCap;
            bitStr.resize(newCap);
            for (size_t i=0; i<n; ++i) 
                assign_bit(i, 0);
        }
    }
    explicit BitArray(const string& s) : siz{s.size()} {
        size_t newCap = (siz/BITS_PER_BLOCK) + 1;
        cap = newCap;
        bitStr.resize(newCap);
        for (size_t i=0; i<s.size(); ++i) {
            bool val = (s.at(i) == '1') ? true : false;
            assign_bit(i, val);
        }
    }
    BitArray(const BitArray& b) = default; // Copy constructor
    BitArray& operator=(const BitArray& b) = default; // Copy assignment
    BitArray& operator=(const string s){ // Copy String assignment
        for (size_t i=0; i<s.size(); ++i) {
            bool val = (s.at(i) == '1') ? true : false;
            assign_bit(i, val);
        }
        siz = s.size();
        return *this;
    }
    BitArray(BitArray&& b) noexcept : BITS_PER_BLOCK{b.BITS_PER_BLOCK}, bitStr{b.bitStr}, siz{b.siz}, cap{b.cap} {} // Move constructor
    
    BitArray& operator=(BitArray&& b) noexcept { // Move assignment
        bitStr = std::move(b.bitStr);
        siz = b.siz;
        cap = b.cap;
        return *this;
    }
    size_t capacity() const { // # of bits the current allocation can hold
        return cap;
    }
    // Mutators
    BitArray& operator+=(bool val) { // Append a bit
        if (siz == cap) {
            if (siz/BITS_PER_BLOCK >= bitStr.capacity()) bitStr.push_back(0);
        }
        assign_bit(siz, val);
        siz++;
        return *this;
    } 
    BitArray& operator+=(const BitArray& b) { // Append a BitArray
        for (size_t i=0; i<b.siz; ++i) {
            bool val = b.read_bit(i);
            this->operator+=(val);
        }
        return *this;
    }
    void erase(size_t pos, size_t nbits = 1) { // Remove “nbits” bits at a position
        std::string s = to_string();
        s.erase(pos, nbits);
        this->operator=(s);
    }
    void insert(size_t pos, bool val) { // Insert a bit at a position (slide "right")
        std::string s = to_string();
        s.insert(pos, val ? "1" : "0");
        this->operator=(s);
    } 
    void insert(size_t pos, const BitArray& b) {  // Insert an entire BitArray object
        std::string s = to_string();
        s.insert(pos, b.to_string());
        this->operator=(s);
    }
    // Bitwise ops
    bitproxy operator[](size_t pos) {
        bitproxy bp{this, pos};
        return bp;
    }
    bool operator[](size_t pos) const {
        return read_bit(pos);
    }
    void toggle(size_t i) {
        if (i >= siz) throw std::logic_error("Error: Out of range");
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
    BitArray operator<<(unsigned int n) const { // Shift operators…
        std::string s = to_string();
        s.erase(0, n);
        for (int i=0; i<n; ++i) s.push_back('0');
        return BitArray<>{s};
    } 
    BitArray operator>>(unsigned int n) const {
        // for (size_t i=0; i<b.bitStr.size(); ++i){ std::cout << i << " ";
        //     b.bitStr[i] <<= n;}
        std::string s = to_string();
        s.erase(siz-n, n);
        for (int i=0; i<n; ++i) s.insert(0, "0");
        return BitArray<>{s};
    }
    BitArray& operator<<=(unsigned int n) {
        std::string s = to_string();
        s.erase(0, n);
        for (int i=0; i<n; ++i) s.push_back('0');
        this->operator=(s);
        return *this;
    }
    BitArray& operator>>=(unsigned int n) {
        std::string s = to_string();
        s.erase(siz-n, n);
        for (int i=0; i<n; ++i) s.insert(0, "0");
        this->operator=(s);
        return *this;
    }

    // Extraction ops
    BitArray slice(size_t pos, size_t count) const { // Extracts a new sub-array
        std::string s;
        for (int i=pos; i<pos+count; ++i) 
            s.push_back(read_bit(i) ? '1' : '0');
        return BitArray<>{s};
    }

    // String mutators
    void trunc(std::string& s1, std::string& s2, size_t i, size_t j) const {
        while((i != 0 && j != 0)) {
            if (s1.at(i) == '1' && s2.at(j) == '1') break;
            if (s1.at(i) != '1') {
                s1.pop_back();
                --i;
            }
            if (s2.at(j) != '1') {
                s2.pop_back();
                --j;
            }
        }
    }
    void reverse(std::string& s1) const {
        for (size_t i=0; i<(s1.size()/2); ++i)
            std::swap(s1[i],s1[s1.size()-i-1]);
    }

    // Comparison ops
    bool operator==(const BitArray& b) const {
        std::string s1 = to_string();
        std::string s2 = b.to_string();
        trunc(s1, s2, siz-1, b.siz-1);
        return s1 == s2;
    }
    bool operator!=(const BitArray& b) const {
        return !this->operator==(b);
    }
    bool operator<(const BitArray& b) const {
        std::string s1 = to_string();
        std::string s2 = b.to_string();
        reverse(s1);
        reverse(s2);
        return std::stoll(s1) < std::stoll(s2);
    }
    bool operator<=(const BitArray& b) const {
        if (*this == b) return true;
        return *this < b;
    }
    bool operator>(const BitArray& b) const {
        std::string s1 = to_string();
        std::string s2 = b.to_string();
        reverse(s1);
        reverse(s2);
        return std::stoll(s1) > std::stoll(s2);
    }
    bool operator>=(const BitArray& b) const {
        if (*this == b) return true;
        return *this > b;
    }

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
        bool found = false;
        char ch = is.get();
        while (ch != '1' && ch != '0' && is) ch = is.get();
        while (is) {
            if (!found) {
                found = true;
                b.siz = 0;
            }
            bool val = (ch == '1') ? true : false;
            b += val;
            ch = is.get();
            if (ch != '1' && ch != '0') {
                is.unget();
                break;
            }
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