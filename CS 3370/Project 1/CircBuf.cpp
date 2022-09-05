#include <iostream>
#include <algorithm>
using std::endl;
using std::cout;

#include "CircBuf.h"

CircBuf::CircBuf() {
	buffer = new char[CHUNK] {0};
}

CircBuf::CircBuf(size_t reserve) {
	buffer = new char[reserve] {0};
	cap = reserve;
}

CircBuf::~CircBuf() {
	delete [] buffer;
}

void CircBuf::insert(char ch) {
	buffer[insertIndex] = ch;
	insertIndex ++;
	siz ++;
}

void CircBuf::insert (const char* ch, size_t sz) {
	for (int i = 0; i < sz; i++) {
		buffer[insertIndex] = *(ch+i);
		insertIndex ++;
		siz ++;
	}
}

void CircBuf::insert(const string& str) {
	for (int i = 0; i < str.length(); i++) {
		buffer[insertIndex] = str.at(i);
		insertIndex ++;
		siz ++;
	}
}

char CircBuf::get() {
	char ch = buffer[getIndex];
	getIndex ++;
	siz --;
	return ch;
}

string CircBuf::get(size_t sz) {
	string str = "";
	for (int i = 0; i < sz; i++) {
		str.push_back(buffer[getIndex]);
		getIndex ++;
		siz --;
	}
	return str;
}

string CircBuf::flush() {
	// gets string out of buffer
	string str = CircBuf::convertToString();

	// clears buffer
	delete [] buffer;

	// creates new empty buffer
	buffer = new char[0];

	// resets all values for CircBuf
	cap = 0;
	siz = 0;
	insertIndex = 0;
	getIndex = 0;

	// returns previous saved buffer string
	return str;
}

string CircBuf::examine() {
	string str("[");
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
	char* tempBuf = new char[cap + CHUNK];
	std::copy(buffer, buffer+cap, tempBuf);
	delete [] buffer;
	buffer = tempBuf;
	cap += CHUNK;
}

string CircBuf::convertToString() {
	string str = "";
	for(int i = 0; i < cap; i++) {
		str.push_back(buffer[i]);
	}
	return str;
}

void CircBuf::shrink() {
	char tempBuf[siz];
	int count = 0;

	for (int i = 0; i < cap; i++) {
		if (buffer[i] != 0) {
			tempBuf[count] = buffer[i];
			count ++;
		}
	}

	delete [] buffer;

	buffer = tempBuf;
	cap = siz;
	insertIndex = 0;
	getIndex = 0;
}

int main() {
	CircBuf ab;
	ab.insert("ONE", 3);
	ab.get(2);
	cout << ab.examine() << endl;
}