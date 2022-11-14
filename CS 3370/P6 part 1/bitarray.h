#include <vector>
#include <string>
#include <math.h>

using std::string;

template<class IType = size_t>
class BitArray {
    size_t BITS_PER_BLOCK = sizeof(size_t);
    std::vector<IType> bitStr;
    // in bits
    size_t siz = 0;
    // in bits
    size_t cap = 0;
    bool read_bit(size_t bitpos) {
        size_t block = bitpos / BITS_PER_BLOCK; // 1 = 50/32
        size_t offset = bitpos % BITS_PER_BLOCK;// 18 = 50%32
        size_t mask = 1u << BITS_PER_BLOCK-bitpos;
        return !!(bitStr[block] & mask);
    }
    void assign_bit(size_t bitpos, bool val) {
        size_t block = bitpos / BITS_PER_BLOCK; // 1 = 50/32
        size_t offset = bitpos % BITS_PER_BLOCK;// 18 = 50%32
        size_t mask = 1u << BITS_PER_BLOCK-bitpos;
        if (val) bitStr[block] |= mask; //set
        else bitStr[block] &= mask; // reset
    }
public:
    // Object Management
    explicit BitArray(size_t n=0) : siz{n} {
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
    BitArray& operator+=(bool); // Append a bit
    BitArray& operator+=(const BitArray& b); // Append a BitArray
    void erase(size_t pos, size_t nbits = 1); // Remove “nbits” bits at a position
    void insert(size_t n, bool b) { // Insert a bit at a position (slide "right")
        assign_bit(n, b)
    } 
    void insert(size_t pos, const BitArray&); // Insert an entire BitArray object
    // Bitwise ops
    bitproxy operator[](size_t);
    bool operator[](size_t pos) const;
    void toggle(size_t) {
        assign_bit(!read_bit(i));
    }
    void toggle() { // Toggles all bits
        for (size_t i=0; i<siz; ++i) {
            assign_bit(!read_bit(i));
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
    bool operator==(const BitArray&) const;
    bool operator!=(const BitArray&) const;
    bool operator<(const BitArray&) const;
    bool operator<=(const BitArray&) const;
    bool operator>(const BitArray&) const;
    bool operator>=(const BitArray&) const;

    // Counting ops
    size_t size() const { // Number of bits in use in the vector
        return siz;
    } 
    size_t count() const; // The number of 1-bits present
    bool any() const; // Optimized version of count() > 0
    // Stream I/O (define these in situ—meaning the bodies are inside the class)
    friend ostream& operator<<(ostream&, const BitArray&);
    friend istream& operator>>(istream&, BitArray&);
    // String conversion
    string to_string() const;
};