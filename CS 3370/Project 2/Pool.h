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
	size_t 	_num_cells;
	
	void* expand();		// Add more blocks
	
public:

	Pool(size_t elemSize, size_t blockSize = 5, bool traceFlag = true) :
	_blockSize (blockSize), _trace (traceFlag),
	_freehead (nullptr),
	_thepool (nullptr),
	_num_blocks (0),
	_num_cells (0)
{
	cout << "Initializing a pool with element size " << elemSize << " and block size " << blockSize << endl;
}
	~Pool();
	void* allocate();       // Get a pointer inside a pre-allocated block for a new object
	void deallocate(void*); // Free an object's slot (push the address on the "free list")
	void profile();
};

template <typename T>
void Pool<T>::deallocate(void* ptr){
	_num_cells--;
    cout << "Cell deallocated at " << ptr << endl;
    reinterpret_cast<element*>(ptr)->next = _freehead;
    _freehead = reinterpret_cast<element*>(ptr);
}

template <typename T>
void* Pool<T>::allocate() {
	_num_cells++;
	void* ptr = (_freehead != nullptr) ? _freehead : expand();
    _freehead = reinterpret_cast<element*>(ptr)->next;
	// if (_freehead == nullptr) {
	// 	expand();
	// 	_freehead = 
	// }
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
	cout << "Expanding pool..." << endl;
	// grow pool by one
	element** newPool = new element*[_num_blocks+1];
	for (int i = 0; i < _num_blocks; i++) newPool[i] = _thepool[i];
	delete [] _thepool;
	_thepool = newPool;
	++_num_blocks;

	// create new free list
	_thepool[_num_blocks-1] = new element[_blockSize];

	// set up linked free list (element* next). 
	// For loop range goes to blockSize-1 to keep last element's next* pointed to nullptr
	cout << "Linking cells starting at " << &_thepool[_num_blocks-1][0] << endl;
	for (size_t i = 0; i < _blockSize; ++i) {
		// 0-1  1-2  2-3  3-4
		cout << "Cell allocated at " << &_thepool[_num_blocks-1][i] << endl;
		if (i != _blockSize-1)
			_thepool[_num_blocks-1][i].next = &(_thepool[_num_blocks-1][i+1]);
		else
			_thepool[_num_blocks-1][i].next = nullptr;
		// if (_thepool[_num_blocks-1][i+1].next == nullptr) cout << "NULLLLLLLL";
	}
	// cout << "Cell allocated at " << &_thepool[_num_blocks-1][_blockSize-1] << endl;
	// cout << _thepool[_num_blocks-1][_blockSize-1].next << endl;
	
	return &(_thepool[_num_blocks-1][0]);
}

template <typename T>
void Pool<T>::profile() {
	size_t freeCells = (_blockSize*_num_blocks)-_num_cells;

	cout << endl << "Live Cells: " << _num_cells << ", Free Cells: " << freeCells << endl;
	cout << "Free list:" << endl;

	size_t num_counted = 0;
    for (int i=_num_blocks-1; i > 0; ++i) {
		for (size_t j=_blockSize-1; j > 0; ++j) {
			if (num_counted == freeCells) break;
			cout << &_thepool[i][j] << endl;
			++num_counted;
		}
		if (num_counted == freeCells) break;
    }
	cout << endl;
}
#endif