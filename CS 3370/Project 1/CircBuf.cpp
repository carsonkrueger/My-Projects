#include <iostream>
#include <algorithm>
using std::endl;
using std::cout;

#include "CircBuf.h"

CircBuf::CircBuf() {
	buffer = new char[CHUNK] {0};
}

CircBuf::CircBuf(size_t reserve) {
	const int rem = reserve % CHUNK;
	cap = reserve / CHUNK; 
	if (rem != 0) cap += CHUNK;
	buffer = new char[cap] {0};
}

CircBuf::~CircBuf() {
	delete [] buffer;
}

void CircBuf::insert(char ch) {
	if (siz == cap) grow();
	if (insertIndex >= cap) insertIndex = 0;

	buffer[insertIndex] = ch;
	insertIndex ++;
	siz ++;
}

void CircBuf::insert (const char* ch, size_t sz) {
	for (int i = 0; i < sz; i++) {
		if (siz == cap) grow();
		if (insertIndex >= cap) insertIndex = 0;

		buffer[insertIndex] = *(ch+i);
		insertIndex ++;
		siz ++;
	}
}

void CircBuf::insert(const string& str) {
	for (int i = 0; i < str.length(); i++) {
		if (siz == cap) grow();
		if (insertIndex >= cap) insertIndex = 0;

		buffer[insertIndex] = str.at(i);
		insertIndex ++;
		siz ++;
	}
}

char CircBuf::get() {
	if (getIndex >= cap) getIndex = 0;

	char ch = buffer[getIndex];
	buffer[getIndex] = 0;
	getIndex ++;
	siz --;
	return ch;
}

string CircBuf::get(size_t sz) {
	string str = "";
	for (int i = 0; i < sz; i++) {
		if (getIndex >= cap) getIndex = 0;

		const char ch = buffer[getIndex];
		if (ch == 0) break;

		str.push_back(ch);
		buffer[getIndex] = 0;
		getIndex ++;
		siz --;
	}
	return str;
}

string CircBuf::flush() {
	// gets string out of buffer
	string str = CircBuf::convertToStringWQuotations();

	// clears buffer
	delete [] buffer;

	// creates new empty buffer
	buffer = new char[CHUNK];

	// resets all values for CircBuf
	cap = 0;
	siz = 0;
	insertIndex = 0;
	getIndex = 0;

	// returns previous saved buffer string
	return str;
}

string CircBuf::examine() {
	string str = "[";
	for (int i = 0; i < cap; i++) {
		if (buffer[i] == 0) {
			str.push_back('-');
		}
		else {
			str.push_back(buffer[i]);
		}
	}
	str.push_back(']');
	return str;
}

void CircBuf::grow() {
	char* tempBuf = new char[cap + CHUNK]{0};
	
	// if (getIndex > insertIndex) {
		// const size_t amt = getIndex - cap;
	const string str = CircBuf::get(siz);
	delete [] buffer;
	buffer = tempBuf;

	insertIndex = 0;
	getIndex = 0;
	CircBuf::insert(str);
	
	// } else {
	// 	std::copy(buffer, buffer+cap, tempBuf);
	// 	delete [] buffer;
	// 	buffer = tempBuf;
	// }
	cap += CHUNK;
}

string CircBuf::convertToStringWQuotations() {
	string str = "";
	for(int i = 0; i < cap; i++) {
		if(buffer[i] == 0) break;
		str.push_back(buffer[i]);
	}
	// str.push_back('\"');
	return str;
}

void CircBuf::shrink() {
	size_t newCap;
	size_t rem;

	if (siz == 0) {
		newCap = 0;
		char* tempBuf = new char[newCap + CHUNK]{0};

		delete [] buffer;
		buffer = tempBuf;

		cap = newCap;
		insertIndex = 0;
		getIndex = 0;
	}
	else {
		newCap = ((cap - getIndex) / CHUNK) * CHUNK;

		rem = (cap - getIndex) % CHUNK;
		// cout << "remainder" << rem << endl;
		if (rem != 0) newCap += CHUNK;

		char* tempBuf = new char[newCap]{0};

		string str = CircBuf::get(siz);
		delete [] buffer;
		buffer = tempBuf;

		cap = newCap;
		insertIndex = 0;
		getIndex = 0;
		CircBuf::insert(str);
	}
	
	// rem = (cap - getIndex) % CHUNK;
	// // cout << "remainder" << rem << endl;
	// if (rem != 0) newCap += CHUNK;

	// char* tempBuf = new char[newCap]{0};

	// string str = CircBuf::get(siz);
	// delete [] buffer;
	// buffer = tempBuf;

	// cap = newCap;
	// insertIndex = 0;
	// getIndex = 0;
	// CircBuf::insert(str);
}

// int main() {
// 	CircBuf cb;
// 	cb.insert("The Quick Brown Fox Jumped Over the Lazy Poodle");
// 	cout << cb.examine() << endl;
// 	bool isSame = cb.flush() == "The Quick Brown Fox Jumped Over the Lazy Poodle";
// 	cout << isSame << endl;
// 	cout << cb.examine() << endl;
// }