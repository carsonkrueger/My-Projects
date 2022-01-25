import math
import statistics as s
import numpy as np
import matplotlib.pyplot as plt
import scipy.stats as sc


def main():
    x = [0, 1, 2, 5, 13, 39, 55, 99]
    print(x)
    print("median:", np.median(x))
    print("mean:", (0 + 1 + 5 + 2 + 55 + 39 + 99 + 13) / 8)
    # print("1st qrt:",(x[2]+x[3])/2)
    print("1st qrt:", np.median([0, 1, 2, 5]))

    print()

    print("mean:", 0 * 0.1 + 1 * 0.2 + 3 * 0.2 + 4 * 0.4 + 5 * 0.1)

    print()

    y = [1, 3, 8, 10, 12]
    print(np.mean(y))

    print((7 / 10) * (3 / 9) + (3 / 10) * (2 / 9))


if __name__ == "__main__":
    main()
