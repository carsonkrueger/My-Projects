import statistics as s
from matplotlib.colors import Normalize
import numpy as np
import matplotlib.pyplot as plt


def main():
    x = [0, 1, 3, 4, 5]
    y = [.1, .2, .2, .4, .1]
    y2 = [.1, .3, .5, .9, 1]
    fig = plt.figure()
    plt.bar(x, y2)
    plt.show()


if __name__ == "__main__":
    main()
