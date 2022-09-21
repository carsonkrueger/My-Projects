#ifndef POOL_H
#define POOL_H

#include <cstddef>
#include <new>
#include <iostream>
#include <stdio.h>
#include <string.h>
#include <new>

using std::size_t;
using std::cout;
using std::endl;
// using std::char;

template <typename T>
class Pool
{
	union element {
		char object[sizeof(T)];
		element* next;
	};
	
	const size_t	_blockSize;
	const bool	_trace;
	
	element*	_freehead;
	element**	_thepool;
	
	int		_num_blocks;
	
	void* expand();		// Add more blocks
	
public:

	Pool(size_t blockSize = 5, bool traceFlag = true) :
	_blockSize (blockSize), _trace (traceFlag),
	_freehead (nullptr),
	_thepool (nullptr),
	_num_blocks (0)
{cout << blockSize;}
	~Pool();
	void* allocate();       // Get a pointer inside a pre-allocated block for a new object
	void deallocate(void*); // Free an object's slot (push the address on the "free list")
	void profile();
};

template <typename T>
void Pool<T>::deallocate(void* ptr){
    // cout << "deleting " << ptr << endl;
    reinterpret_cast<element*>(ptr)->next = _freehead;
    _freehead = reinterpret_cast<element*>(ptr);
}

template <typename T>
void* Pool<T>::allocate() {
	void* ptr = (_freehead != nullptr) ? _freehead : expand();
    _freehead = reinterpret_cast<element*>(ptr)->next;
    return ptr;
}

template <typename T>
Pool<T>::~Pool() {
	for (int i=0; i < _num_blocks; i++) {
        for (size_t j=0; j < _blockSize; j++) {
            deallocate(&_thepool[i][j]);
        }
		delete [] _thepool[i];
    }
	delete [] _thepool;
}

template <typename T>
void* Pool<T>::expand() {
	cout << "growing pool size by 1" << endl;
	// grow pool by one
	element** newPool = new element*[_num_blocks+1];
	for (int i = 0; i < _num_blocks; i++) newPool[i] = _thepool[i];
	delete [] _thepool;
	_thepool = newPool;
	_num_blocks++;

	// create new free list
	_thepool[_num_blocks-1] = new element[_blockSize];

	// set up linked free list (element* next). 
	// For loop range goes to blockSize-1 to keep last element's next* pointed to nullptr
	for (size_t i = 0; i < _blockSize-1; i++) {
		// cout <<	i << ":" << _blockSize << endl;
		_thepool[_num_blocks-1][i].next = &(_thepool[_num_blocks-1][i+1]);
	}
	
	return &(_thepool[_num_blocks-1][0]);
}

template <typename T>
void Pool<T>::profile() {
    for (int i=0; i < _num_blocks; ++i) {
		// cout << *(reinterpret_cast<T*>(_thepool[i][i].object)) << endl;
		
		// element* ptr = &_thepool[i][0];
		// for (size_t j=0; j < _blockSize; ++j) {
		// 	cout << *(reinterpret_cast<T*>(ptr->object)) << endl;
		// 	if (ptr->next == nullptr) break;
		// 	ptr = ptr->next;
		// }
		
		// size_t j = 0;
		// do {
		// 	cout << *(reinterpret_cast<T*>(_thepool[i][j].object)) << endl;
		// 	++j;
		// }
        // while (_thepool[i][j-1].next != nullptr);

		for (size_t j=0; j < _blockSize; j++) {
			cout << *(reinterpret_cast<T*>(_thepool[i][j].object)) << endl;
		}
    }
}
#endif