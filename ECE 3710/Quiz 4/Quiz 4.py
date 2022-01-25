import statistics as s
from matplotlib.colors import Normalize
import numpy as np
import matplotlib.pyplot as plt


def main():
    x = [0, 1, 3, 4, 5]
    y = [0.1, 0.2, 0.2, 0.4, 0.1]
    y2 = [0.1, 0.3, 0.5, 0.9, 1]
    fig = plt.figure()
    plt.bar(x, y2)
    plt.show()


if __name__ == "__main__":
    main()
