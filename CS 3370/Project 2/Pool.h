#ifndef POOL_H
#define POOL_H

#include <cstddef>
#include <new>
#include <iostream>
#include <stdio.h>
#include <string.h>

using std::size_t;
using std::cout;
using std::endl;
// using std::byte;

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
	
	void expand();		// Add more blocks
	
	void link(element*);
	
public:

	Pool(size_t blockSize = 5, bool traceFlag = true) :
	_blockSize (blockSize), _trace (traceFlag),
	_freehead (nullptr),
	_thepool (nullptr),
	_num_blocks (0)
{}
	~Pool();
	void* allocate();       // Get a pointer inside a pre-allocated block for a new object
	void deallocate(void*); // Free an object's slot (push the address on the "free list")
	void* grow(size_t blockSize) {
		cout << "growing pool size by 1" << endl;
		// grow pool by one
		element** newPool = new char*[_num_blocks+1];
		if (_thepool != nullptr) {
			for (size_t i = 0; i < _num_blocks; i++) newPool[i] = _thepool[i];
			delete [] _thepool;
		}
		_thepool = newPool;
		++_num_blocks;

		// create new free list
		// _thepool[_num_blocks-1] = new char[blockSize*elemSize];
		_thepool[_num_blocks-1] = new element;
		// set up linked free list. For loop range goes to blockSize-1 to keep last element's next* pointed to nullptr
		// for (size_t i = 0; i < blockSize-1; i++) 
		//     reinterpret_cast<MyObject*>(_thepool[_num_blocks-1] + elemSize*(i))->next = _thepool[_num_blocks-1] + (elemSize*(i+1)); // connects next* to the successor block
		for (size_t i = 0; i < blockSize-1; i++)
			cout << _thepool[_num_blocks-1][i] << endl;

		return _thepool[_num_blocks-1];
	}
};


// Add the member function definitions here
#endif