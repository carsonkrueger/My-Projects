template<class IType = size_t>
class BitArray {
public:
 // Object Management
 explicit BitArray(size_t = 0);
 explicit BitArray(const string&);
 BitArray(const BitArray& b) = default; // Copy constructor
 BitArray& operator=(const BitArray& b) = default; // Copy assignment
 BitArray(BitArray&& b) noexcept; // Move constructor
 BitArray& operator=(BitArray&& b) noexcept; // Move assignment
 size_t capacity() const; // # of bits the current
allocation can hold
 // Mutators
 BitArray& operator+=(bool); // Append a bit
 BitArray& operator+=(const BitArray& b); // Append a BitArray
 void erase(size_t pos, size_t nbits = 1); // Remove “nbits” bits at a position
 void insert(size_t, bool); // Insert a bit at a position (slide
"right")
 void insert(size_t pos, const BitArray&); // Insert an entire BitArray object
 // Bitwise ops
 bitproxy operator[](size_t);
 bool operator[](size_t) const;
 void toggle(size_t);
 void toggle(); // Toggles all bits
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
 size_t size() const; // Number of bits in use in the vector
 size_t count() const; // The number of 1-bits present
 bool any() const; // Optimized version of count() > 0
 // Stream I/O (define these in situ—meaning the bodies are inside the class)
 friend ostream& operator<<(ostream&, const BitArray&);
 friend istream& operator>>(istream&, BitArray&);
 // String conversion
 string to_string() const;
};