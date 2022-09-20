#include "Pools.h"
#include "MyObject.h"
#include <iostream>

using std::cout;
using std::endl;

Pool::Pool(size_t elemSiz, size_t blockSiz): blockSize{blockSiz}, elemSize{elemSiz} {
    // insert first free list
    cout << "Initializing a pool with element size " << elemSiz << " and block size " << blockSiz << endl;
    // creates freelist of size elemsize * blockSize
    // pool[0] = new char[elemSiz*blockSiz];

    //// connects next* to the successor block
    //// for (size_t i = 0; i < blockSize-1; i++) 
    ////     reinterpret_cast<MyObject*>(pool[0] + elemSize*(i))->next = pool[0] + (elemSize*(i+1)); 

    // freeHead = pool[0];
   };

Pool::~Pool() {
    for (size_t i=0; i < poolSize; i++) {
        // void* ptr = pool[i];
        for (size_t j=0; j<blockSize; j++) {
            // reinterpret_cast<MyObject*>((char*)ptr + elemSize*(j))->next;
            delete (pool[i] + elemSize*(j));
        }
    }
    delete pool;
}

void* Pool::allocate() {
    void* ptr = (freeHead != nullptr) ? freeHead : grow();
    // freeHead = reinterpret_cast<MyObject*>(ptr)->next;
    freeHead = *ptr += elemSize;
    return freeHead;
}

void Pool::deallocate(void* ptr){
    cout << "deleting " << ptr << endl;
    // delete reinterpret_cast<MyObject*>(ptr); // <---- infinite loop, bad code
    // delete static_cast<char*>(ptr);
    freeHead = ptr; // this does not delete
}

void* Pool::grow(size_t blockSize) {
    cout << "growing pool size by 1" << endl;
    // grow pool by one
    char** newPool = new char*[poolSize+1];
    if (pool != nullptr) {
        for (size_t i = 0; i < poolSize; i++) newPool[i] = pool[i];
        delete [] pool;
    }
    pool = newPool;
    ++poolSize;

    // create new free list
    pool[poolSize-1] = new char[blockSize*elemSize];

    // set up linked free list. For loop range goes to blockSize-1 to keep last element's next* pointed to nullptr
    // for (size_t i = 0; i < blockSize-1; i++) 
    //     reinterpret_cast<MyObject*>(pool[poolSize-1] + elemSize*(i))->next = pool[poolSize-1] + (elemSize*(i+1)); // connects next* to the successor block
    
    return pool[poolSize-1];
}

void Pool::profile() {
    for (size_t i=0; i < poolSize; i++) {
        // cout << "pool " << &pool[i] << ":" << pool[i]-> << endl; 
        for (size_t j=0; j < blockSize; j++) {
            if (pool[i] + elemSize*(j))
            cout << *reinterpret_cast<MyObject*>(pool[i] + elemSize*(j)) << endl;
        }
    }
}