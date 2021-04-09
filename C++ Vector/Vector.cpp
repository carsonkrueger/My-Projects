#include "Vector.h"

Vector::Vector()
{
    //Fstd::cout << "constructed" << std::endl;
    data_ptr = new int[CHUNK];
    capacity = CHUNK;
    n_elems = 0;
}

Vector::~Vector()
{
    //std::cout << "deleted" << std::endl;
    delete data_ptr;
}

void Vector::grow()
{
    //std::cout << "growing" << std::endl;
    int *temp_data_ptr = new int[capacity * 2]; //create new array
    for (int i = 0; i < n_elems; i++)
    {
        temp_data_ptr[i] = data_ptr[i]; // copy elements
    }
    capacity *= 2;
    delete[] data_ptr; //delete
    data_ptr = temp_data_ptr;
}

Vector::Vector(const Vector &v)
{
    data_ptr = new int[v.capacity]; //create new array
    for (int i = 0; i < v.n_elems; i++)
    {
        data_ptr[i] = v.data_ptr[i]; // copy elements
    }
    capacity = v.capacity;
    n_elems = v.n_elems;
} // Copy constructor

Vector &Vector::operator=(const Vector &v)
{
    data_ptr = new int[v.capacity]; //create new array
    for (int i = 0; i < v.n_elems; i++)
    {
        data_ptr[i] = v.data_ptr[i]; // copy elements
    }
    capacity = v.capacity;
    n_elems = v.n_elems;
    return *this;
} // Copy assignment operator

// Accessors
int Vector::front() const
{
    if (n_elems > 0)
    {
        return data_ptr[0];
    }
    else
    {
        throw std::range_error("Out Of Range");
    }
} // Return the int in position 0, if any

int Vector::back() const
{
    if (n_elems > 0)
    {
        return data_ptr[n_elems - 1];
    }
    else
    {
        throw std::range_error("Out Of Range");
    }
} // Return last element (position n_elems-1)

int Vector::at(size_t pos) const
{
    if (pos < n_elems && pos >= 0)
    {
        return data_ptr[pos];
    }
    else
    {
        throw std::range_error("Out Of Range");
    }
} // Return element in position "pos" (0-based)

size_t Vector::size() const
{
    return n_elems;
} // Return n_elems

bool Vector::empty() const
{
    return (n_elems == 0);
} // Return n_elems == 0

// Mutators
int &Vector::operator[](size_t pos)
{
    return data_ptr[pos];
} // Same as at but no bounds checking

void Vector::push_back(int item)
{
    if (capacity == n_elems)
    {
        grow();
    }
    data_ptr[n_elems] = item;
    ++n_elems;
} // Append a new element at the end

void Vector::pop_back()
{
    if (n_elems > 0)
    {
        --n_elems;
    }
    else
    {
        throw std::range_error("Out Of Range");
    }
} // --n_elems (nothing else to do)

void Vector::erase(size_t pos)
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
} // Remove item in position pos by shuffling left

void Vector::insert(size_t pos, int item)
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
} // Shuffle items right to make room fornew element

void Vector::clear()
{
    n_elems = 0;
} // n_elems = 0 (keep the current capacity)

// Iterators
int *Vector::begin()
{
    return ((n_elems == 0) ? nullptr : data_ptr);
} // Return a pointer to 1st element, or nullptr if n_elems == 0

int *Vector::end()
{
    return ((n_elems == 0) ? nullptr : (data_ptr + n_elems));
} // Return a pointer to 1 past last element, or nullptr if n_elems == 0

// Comparators
bool Vector::operator==(const Vector &v) const
{
    for (size_t i = 0; i < n_elems; i++)
    {
        if (data_ptr[i] != v.data_ptr[i])
        {
            return false;
        }
    }
    return true;
}

bool Vector::operator!=(const Vector &v) const
{
    for (size_t i = 0; i < n_elems; i++)
    {
        if (data_ptr[i] == v.data_ptr[i])
        {
            return false;
        }
    }
    return true;
}