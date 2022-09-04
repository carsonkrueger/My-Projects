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
	return buffer[getIndex];
	getIndex ++;
	siz --;
}

string CircBuf::get(size_t sz) {
	string str = "";
	for (int i = 0; i < sz; i++) {
		str.push_back(buffer[getIndex]);
		getIndex ++;
		siz ++;
	}
}

string CircBuf::flush() {
	
	delete [] buffer;
	buffer = new char[0];
	cap = 0;
	siz = 0;
	insertIndex = 0;
	getIndex = 0;
}

string CircBuf::examine() {
	string str("");
	for (int i = 0; i < cap; i++) {
		if (buffer[i] == 0) {
			str.push_back('-');
		}
		else {
			str.push_back(buffer[i]);
		}
	}
	return str;
}

void CircBuf::grow() {
	char* tempBuf = new char[cap + CHUNK];
	std::copy(buffer, buffer+cap, tempBuf);
	delete [] buffer;
	buffer = tempBuf;
}

string CircBuf::convertToString() {
	string str = "";
	for(auto ch: buffer) {
		
	}
}

int main() {
	CircBuf c(5);
	c.insert("ab");
	cout << c.examine() << endl;
}