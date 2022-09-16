#include "MyObject.h"
#include <iostream>
using namespace std;

Pool MyObject::pool{sizeof(MyObject)};

ostream& operator<<(ostream& os, const MyObject& o) {
    return os << '{' << o.id << ',' << o.name << '}';
}
