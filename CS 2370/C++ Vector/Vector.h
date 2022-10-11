#pragma once

#include <cstddef>
#include <stdexcept>
#include <iostream>
#include <string>
#include <typeinfo>
using std::size_t;

template <typename T>
class Vector
{
    enum
    {
        CHUNK = 10
    };
    T *data_ptr;     // Pointer to the heap array
    size_t capacity; // Size of the current array allocation (total number of ints)
    size_t n_elems;  // Number of int spaces currently in use, starting from pos0
    void grow()
    {
        T *temp_data_ptr = new T[capacity * 2]; //create new array
        for (int i = 0; i < n_elems; i++)
        {
            temp_data_ptr[i] = data_ptr[i]; // copy elements
        }
        capacity *= 2;
        delete[] data_ptr; //delete
        data_ptr = temp_data_ptr;
    };

public:
    //Object Mgt.
    Vector()
    {
        data_ptr = new T[CHUNK];
        capacity = CHUNK;
        n_elems = 0;
    };

    Vector(const Vector &v)
    {
        data_ptr = new T[v.capacity]; //create new array
        for (int i = 0; i < v.n_elems; i++)
        {
            data_ptr[i] = v.data_ptr[i]; // copy elements
        }
        capacity = v.capacity;
        n_elems = v.n_elems;
    }; // Copy constructor

    Vector &operator=(const Vector &v)
    {
        data_ptr = new T[v.capacity]; //create new array
        for (int i = 0; i < v.n_elems; i++)
        {
            data_ptr[i] = v.data_ptr[i]; // copy elements
        }
        capacity = v.capacity;
        n_elems = v.n_elems;
        return *this;
    }; // Copy assignment operator
    ~Vector() { delete data_ptr; };

    // Accessors
    T front() const
    {
        if (n_elems > 0)
        {
            return data_ptr[0];
        }
        else
        {
            throw std::range_error("Out Of Range");
        }
    }; // Return the int in position 0, if any

    T back() const
    {
        if (n_elems > 0)
        {
            return data_ptr[n_elems - 1];
        }
        else
        {
            throw std::range_error("Out Of Range");
        }
    }; // Return last element (position n_elems-1)

    T at(size_t pos) const
    {
        if ((pos < n_elems) && (pos >= 0))
        {
            //std::cout << "===" << data_ptr[pos] << std::endl;
            return data_ptr[pos];
        }
        else
        {
            throw std::range_error("Out Of Range");
        }
    };                                             // Return element in position "pos" (0-based)
    size_t size() const { return n_elems; };       // Return n_elems
    bool empty() const { return (n_elems == 0); }; // Return n_elems == 0

    // Mutators
    T &operator[](size_t pos) { return data_ptr[pos]; }; // Same as at but no bounds checking

    void push_back(T item)
    {
        if (capacity == n_elems)
        {
            grow();
        }
        //std::cout << "---" << item << std::endl;
        data_ptr[n_elems] = item;
        ++n_elems;

    }; // Append a new element at the end

    void pop_back()
    {
        if (n_elems > 0)
        {
            --n_elems;
        }
        else
        {
            throw std::range_error("Out Of Range");
        }
    }; // --n_elems (nothing else to do)

    void erase(size_t pos)
    {
        if (0 <= pos && pos < n_elems)
        {
            for (size_t i = pos; i < n_elems; i++)
            {
                data_ptr[i] = data_ptr[i + 1];
            }
            --n_elems;
        }
        else
        {
            throw std::range_error("Out Of Range");
        }
    }; // Remove item in position pos by shuffling left

    void insert(size_t pos, T item)
    {
        if (n_elems == capacity)
        {
            grow();
        }

        for (size_t i = n_elems; i > pos; i--)
        {
            data_ptr[i] = data_ptr[i - 1]; // 'i' is actually 1 position ahead of the array
        }

        data_ptr[pos] = item;
        ++n_elems;
    }; // Shuffle items right to make room fornew element

    void clear()
    {
        n_elems = 0;
    }; // n_elems = 0 (keep the current capacity)

    // Iterators
    T *begin()
    {
        return ((n_elems == 0) ? nullptr : data_ptr);
    }; // Return a pointer to 1st element, or nullptr if n_elems == 0

    T *end()
    {
        return ((n_elems == 0) ? nullptr : (data_ptr + n_elems));
    }; // Return a pointer to 1 past last element, or nullptr if n_elems == 0

    // Comparators
    bool operator==(const Vector &v) const
    {
        for (size_t i = 0; i < n_elems; i++)
        {
            if (data_ptr[i] != v.data_ptr[i])
            {
                return false;
            }
        }
        return true;
    };

    bool operator!=(const Vector &v) const
    {
        for (size_t i = 0; i < n_elems; i++)
        {
            if (data_ptr[i] == v.data_ptr[i])
            {
                return false;
            }
        }
        return true;
    };
};