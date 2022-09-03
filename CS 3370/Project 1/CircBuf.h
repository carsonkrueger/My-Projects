//
#ifndef CIRCBUF_H
#define CIRCBUF_H

#include <string>
#include <cstddef>
using std::string;

class CircBuf {
	const size_t CHUNK { 8 };
	// Insert your private stuff here
	char* buffer;
	size_t siz {0};
	size_t cap {0};
	size_t insertIndex = {0};
	size_t getIndex = {0};
	
public:
	CircBuf();
	CircBuf(size_t reserve = 0);		// Number of elements you want it to be able to hold to start with.
	~CircBuf();
	size_t	size() {return siz;}
	size_t	capacity() {return CHUNK;}
	
	void		insert(char);
	// void		insert (const char*, size_t sz);
	void		insert(const string&);
	char		get();
	string	get(size_t);
	string	flush();	// Returns a string with all the characters, AND shrinks the buffer to zero.	
	string	examine();	
	void		shrink();	// Reduces the unused space in the buffer.
};
#endif
