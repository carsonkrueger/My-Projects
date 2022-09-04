#include <iostream>
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
	CircBuf::buffer[insertIndex] = ch;
	insertIndex ++;
	siz ++;
}

void CircBuf::insert(const string& str) {
	for (int i = 0; i < str.length(); i++) {
		CircBuf::buffer[insertIndex] = str.at(i);
		insertIndex ++;
		siz ++;
	}
}

char CircBuf::get() {
	return CircBuf::buffer[getIndex];
	getIndex ++;
	siz --;
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

int main() {
	CircBuf c(5);
	c.insert('0');
	cout << c.examine() << endl;
}