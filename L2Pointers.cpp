#include <iostream>

int main() {
    int a[] = {10,15,4,25,3,-4};
    int *p = &a[2];

    std::cout << *(p+1) << std::endl;
    std::cout << p[-1] << std::endl;
    std::cout << p-a << std::endl;
    std::cout << a[*p++] << std::endl;
    std::cout << *(a+a[2]) << std::endl;

    std::cout << std::endl << "spacer" << std::endl;

    char s[] = "desolate", *ptr = s;
    std::cout << "BEFORE" << s << std::endl;
    std::cout << *ptr++ << std::endl;
    std::cout << *(ptr++) << std::endl;
    std::cout << (*ptr)++ << std::endl;
    std::cout << *++ptr << std::endl;
    std::cout << *(++ptr) << std::endl;
    std::cout << ++*ptr << std::endl;
    std::cout << ++(*ptr) << std::endl;
    std::cout << s << std::endl;
}