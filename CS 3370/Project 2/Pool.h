

class Pool {
public: 
   Pool(size_t elemSize, size_t blockSize = 5);
   ~Pool(); 
   void* allocate();       // Get a pointer inside a pre-allocated block for a new object 
   void deallocate(void*); // Free an object's slot (push the address on the "free list")
   void profile();
}