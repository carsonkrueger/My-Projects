#include "Vector.h"

int main()
{
    Vector vect1; 
    vect1.push_back(8);
    vect1.push_back(9);
    vect1.push_back(10);
    Vector vect2 = Vector();
    vect2 = vect1;

    std::cout << "hi there" << std::endl;

    //vect1.erase(4);
    for (int i = 0; i < 7; i++)
    {
        //vect1.push_back(i);
        //std::cout << vect1.at(i) << " --- ";
        //std::cout << vect2.at(i) << std::endl;
    }
    // std::cout << &vect1[0] << std::endl;
    // std::cout << vect1.begin() << std::endl;
} 