#include "Pool.h"
#include "MyObject.h"

Pool::Pool(size_t elemSiz, size_t blockSiz): elemSize{elemSiz}, blockSize{blockSiz}, pool{new char*[poolSize]} {
    // insert first free list
    pool[0] = new char[blockSize*elemSize];
    for (size_t i = 0; i < blockSize-1; i++) {
        reinterpret_cast<MyObject*>(pool[0] + elemSize*(i))->next = pool[0] + (elemSize*(i+1)); // connects next* to the successor block
    }
    nextFree = pool[0];
   };

Pool::~Pool() {
    char* ptr = pool[0];
    for (size_t i=0; i < poolSize; i++) {
        void* tempNext = reinterpret_cast<MyObject*>(*pool[i] + elemSize*(i))->next;
        delete pool[i] + elemSize*(i);
    }
    delete pool;
}

void* Pool::allocate() {
    void* ptr = (nextFree != nullptr) ? nextFree : grow();
    nextFree = reinterpret_cast<MyObject*>(ptr)->next;
    return ptr;
}

void Pool::deallocate(void* ptr){
    delete ptr;
}

void* Pool::grow(size_t blockSize) {
    // grow pool by one
    char* newPool = new char[poolSize+1];
    for (size_t i = 0; i < poolSize; i++) newPool[i] = *pool[i];
    delete [] pool;
    *pool = newPool;
    poolSize += 1;

    // create new free list
    pool[poolSize-1] = new char[blockSize*elemSize];

    // set up linked free list. For loop range goes to blockSize-1 to keep last element's next* pointed to nullptr
    for (size_t i = 0; i < blockSize-1; i++) 
        reinterpret_cast<MyObject*>(pool[poolSize-1] + elemSize*(i))->next = pool[poolSize-1] + (elemSize*(i+1)); // connects next* to the successor block
    
    return pool[poolSize-1];
}