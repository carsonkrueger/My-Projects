#ifndef POOL_H
#define POOL_H
#include <algorithm>

class Pool {
   char** pool;
   size_t poolSize = 1;
   void* nextFree = nullptr;
   size_t blockSize;
   size_t elemSize;

public: 
   Pool(size_t elemSiz, size_t blockSiz = 5);
   // : elemSize{elemSiz}, blockSize{blockSiz}, pool{new char[poolSize]} {
   //    // insert first free list
   //    pool[0] = new char[blockSize*elemSize];
   //    for (size_t i = 0; i < blockSize-1; i++) {
   //       reinterpret_cast<MyObject*>(pool[poolSize-1] + elemSize*(i))->next = pool[poolSize-1] + (elemSize*(i+1)); // connects next* to the successor block
   //    }
   //    nextFree = pool[0];
   // };
   ~Pool(); 
   void* allocate();      // Get a pointer inside a pre-allocated block for a new object 
   void deallocate(void*); // Free an object's slot (push the address on the "free list")
   void profile();
   void* grow(size_t blockSize = 5);
};

#endif