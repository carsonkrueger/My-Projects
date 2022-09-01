#include <iostream>
#include <typeinfo>

#define type(x) std::cout << #x " = " << typeid(x).name() << std::endl;
#define bytes(x) std::cout << "sizeof " #x " = " << sizeof x << std::endl;
#define describe(x) type(x) bytes(x)

void questionOne();
void questionTwo();
void questionFive();

class C
{
public:
    void f() {std::cout << "C::f\n";}
    void g() {std::cout << "C::g\n";}
};

int main() {

    questionOne();

    std::cout << std::endl << std::endl;

    questionTwo();

    std::cout << std::endl << std::endl;


    int a[2][3][4][5] =
    {
      {
        {{0,1,2,3,4},{5,6,7,8,9},{0,1,2,3,4},{5,6,7,8,9}},
        {{0,1,2,3,4},{5,6,7,8,9},{0,1,2,3,4},{5,6,7,8,9}},
        {{0,1,2,3,4},{5,6,7,8,9},{0,1,2,3,4},{5,6,7,8,9}},
      },
      {
        {{0,1,2,3,4},{5,6,7,8,9},{0,1,2,3,4},{5,6,7,8,9}},
        {{0,1,2,3,4},{5,6,7,8,9},{0,1,2,3,4},{5,6,7,8,9}},
        {{0,1,2,3,4},{5,6,7,8,9},{0,1,2,3,4},{5,6,7,8,9}},
      }
    };

    describe(a);
    type(a+1);
    describe(a[1]);
    type(a[1]+1);
    describe(a[1][1]);
    type(a[1][1]+1);
    describe(a[1][1][1]);
    type(a[1][1][1]+1);
    describe(a[1][1][1][1]);
    std::cout << a[1][1][1][1] << std::endl;


    std::cout << std::endl << std::endl;


    C c;
    
    // Using an object
    void (C::*pmf)() = &C::f;
    (c.*pmf)();     // Executes c.f()
    pmf = &C::g;
    (c.*pmf)();     // Executes c.g()
    
    // Using pointer to an object
    C* cp = &c;
    pmf = &C::f;
    (cp->*pmf)();   // Executes cp->f()
    pmf = &C::g;
    (cp->*pmf)();   // Executes cp->g()


    std::cout << std::endl << std::endl;

    questionFive();

}

void questionOne() {
    int a[] = {10,15,4,25,3,-4};
    int *p = &a[2];

    std::cout << *(p+1) << std::endl;
    std::cout << p[-1] << std::endl;
    std::cout << p-a << std::endl;
    std::cout << a[*p++] << std::endl;
    std::cout << *(a+a[2]) << std::endl;
}

void questionTwo() {
    char s[] = "desolate", *ptr = s;

    std::cout << *ptr++ << std::endl;
    std::cout << *(ptr++) << std::endl;
    std::cout << (*ptr)++ << std::endl;
    std::cout << *++ptr << std::endl;
    std::cout << *(++ptr) << std::endl;
    std::cout << ++*ptr << std::endl;
    std::cout << ++(*ptr) << std::endl;
    std::cout << s << std::endl;
}

void questionFive() {
    int a[1][1][1][4] = {{{{1}}}};

    std::cout << sizeof(a)/sizeof(a[0]) << std::endl;
    std::cout << sizeof(a[0])/sizeof(a[0][0]) << std::endl;
    std::cout << sizeof(a[0][0])/sizeof(a[0][0][0]) << std::endl;
    std::cout << sizeof(a[0][0][0])/sizeof(int) << std::endl;
    
}