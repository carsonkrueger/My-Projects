#ifndef POOLS_H
#define POOLS_H

#include <cstddef>

class Pool {
   char** pool;
   size_t poolSize = 1;
   void* nextFree = nullptr; // next available slot in the block to be allocated at
   size_t blockSize;
   size_t elemSize;

public: 
   Pool(size_t elemSiz, size_t blockSiz = 5);
   ~Pool(); 
   void* allocate();      // Get a pointer inside a pre-allocated block for a new object 
   void deallocate(void*); // Free an object's slot (push the address on the "free list")
   void profile();
   void* grow(size_t blockSize = 5);
};

void Pool::profile() {
    for (size_t i=0; i < poolSize; i++) {
        // cout << "pool " << &pool[i] << ":" << pool[i]-> << endl; 
        for (size_t j=0; j < blockSize; j++) {
            if (pool[i] + elemSize*(j))
            cout << *reinterpret_cast<MyObject*>(pool[i] + elemSize*(j)) << endl;
        }
    }
}

#endif