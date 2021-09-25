"""Sort.py is a program composed of 4 different sorting algorithms"""

def quicksort(lyst):
    """calls the quicksort algorithm"""
    start = 0
    lystlen = len(lyst)
    return doQuicksort(lyst, start, lystlen - 1)

def doQuicksort(lyst, start, end):
    """implement quicksort, return the sorted list"""

    def partition(lyst, start, end):
        """creates partition for quicksort function"""
        pivot_index = start
        pivot = lyst[pivot_index]

        while start < end:
            while start < len(lyst) and lyst[start] <= pivot:
                start += 1

            while lyst[end] > pivot:
                end -= 1

            if start < end:
                lyst[start], lyst[end] = lyst[end], lyst[start]

        lyst[end], lyst[pivot_index] = lyst[pivot_index], lyst[end]
        return end

    if (start < end):
        p = partition(lyst, start, end)
        doQuicksort(lyst, start, p - 1)
        doQuicksort(lyst, p + 1, end)

    return lyst


def mergesort(lyst):
    """implement mergesort, return the sorted list"""
    if len(lyst) > 1:

        mid = len(lyst)//2
        left = lyst[:mid]
        right = lyst[mid:]

        mergesort(left)
        mergesort(right)

        i = j = k = 0

        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                lyst[k] = left[i]
                i += 1

            else:
                lyst[k] = right[j]
                j += 1

            k += 1

        while i < len(left):
            lyst[k] = left[i]
            i += 1
            k += 1

        while j < len(right):
            lyst[k] = right[j]
            j += 1
            k += 1
    return lyst


def selection_sort(lyst):
    """implement selection sort, return the sorted list"""
    for i in range(len(lyst)):
        min = i

        for j in range(i+1, len(lyst)):
            if lyst[min] > lyst[j]:
                min = j

        lyst[i], lyst[min] = lyst[min], lyst[i]
    return lyst


def insertion_sort(lyst):
    """implement insertion sort, return the sorted list"""
    for i in range(1, len(lyst)):
        pos = lyst[i]
        j = i-1

        while j >= 0 and pos < lyst[j]:
            lyst[j + 1] = lyst[j]
            j -= 1
        lyst[j + 1] = pos
    return lyst

def is_sorted(lyst):
    """implment is_sorted function, return bool whether lyst is sorted"""
    prev = lyst[0]
    #print("INITIAL: ", prev)

    for i in lyst:
        #print(prev, i)
        if prev > i or not isinstance(i, int) or not isinstance(lyst, list):
            #if prev is greater than next, or if i is not an int, or if lyst is not a list
            return False
        prev = i
    return True

def main():
    """main function"""
    pass

if __name__ == "__main__":
    """calls main function"""
    main()
