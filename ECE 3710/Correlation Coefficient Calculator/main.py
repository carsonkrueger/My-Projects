import math
import statistics as s
import numpy as np
import matplotlib.pyplot as plt


def main():
    diam = [4.2, 4.4, 4.6, 4.8, 5, 5.2, 5.4, 5.6, 5.8, 6]
    strength = [51, 54, 69, 81, 75, 79, 89, 101, 98, 102]
    p = plt.scatter(diam, strength)
    plt.show()

    calcCoefficient(diam, strength)


def calcCoefficient(x, y):
    # temp = [110, 110, 111, 111, 112, 112, 114, 114,
    #         117, 117, 122, 122, 130, 130, 143, 143]
    # x = [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60]
    # y = [70.27, 72.29, 72.57, 74.69, 76.09, 73.14, 75.61, 69.56,
    #      74.41, 73.49, 79.18, 75.44, 81.71, 83.03, 76.98, 80.99]

    xStdev = s.stdev(x)
    yStdev = s.stdev(y)
    xMean = s.mean(x)
    yMean = s.mean(y)
    #print("xMean:", xStdev)

    output = 0
    for i in range(len(x)):
        output += ((x[i] - xMean)/xStdev) * ((y[i] - yMean)/yStdev)
    output *= 1/(len(x)-1)

    print("Correlation Coefficient:", output)


def calc_Fitted_and_Risidual(m, b, x, y):
    fitted_vals = []
    for i in x:
        fit = i * x + b
        fitted_vals.append(fit)


if __name__ == "__main__":
    main()
