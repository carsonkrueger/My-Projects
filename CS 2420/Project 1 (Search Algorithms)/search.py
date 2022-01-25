"""Search.py is a program that is composed of 3 different searching algorithms"""
from time import time
import math


def linear_search(lyst, target) -> bool:
    """linear_search will find the 'target' parameter inside the list from 'lyst'
    parameter. Searches the list from index 0 to the end linearly."""
    for i in lyst:
        if i == target:
            return True
    return False


def binary_search(lyst, target) -> bool:
    """binary_search will find the target through binary searching from 'lyst'"""
    higher = len(lyst) - 1
    lower = 0

    while True:
        if higher >= lower:

            halfpoint = lower + (higher - lower) // 2
            if lyst[halfpoint] == target:
                return True

            elif lyst[halfpoint] > target:
                higher = halfpoint - 1

            else:
                lower = halfpoint + 1

        else:
            return False


def jump_search(lyst, target) -> bool:
    """jump_search will find the 'target' through the jump search algorithm"""
    n = len(lyst)
    jump = math.sqrt(n)

    point = 0
    while lyst[int(min(jump, n) - 1)] < target:
        point = jump
        jump += math.sqrt(n)
        if point >= n:
            return False

    while lyst[int(point)] < target:
        point += True

        if point == min(jump, n):
            return False

    if lyst[int(point)] == target:
        return True

    return False


def main():
    pass
    # global lyst
    # target = 82
    # timer = time.perf_counter()

    # CALLS FUNCTIONS
    # linear_search(lyst, target)
    # binary_search(lyst, target)
    # jump_search(lyst, target)

    # timer = time.perf_counter() - timer
    # print("TIME: ", timer)


if __name__ == "__main__":
    main()
