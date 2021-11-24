import math
import statistics as s
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats



def main():
    # diam = [4.2, 4.4, 4.6, 4.8, 5, 5.2, 5.4, 5.6, 5.8, 6]
    # strength = [51, 54, 69, 81, 75, 79, 89, 101, 98, 102]
    temp = [26.6, 26, 27.4, 21.7, 14.9, 11.3, 15, 8.7, 8.2]
    corrosion = [1.58, 1.45, 1.13, .96, .99, 1.05, .82, .68, .56]
    p = plt.scatter(temp, corrosion)
    plt.show()

    calcCoefficient(temp, corrosion)



def calcCoefficient(x, y):
    slope, intercept, r_value, p_value, std_err = stats.linregress(x,y)
    print("Linear Regression:", slope, "+", intercept)

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

    calc_Fitted_and_Risidual(slope, intercept, x, y)


def calc_Fitted_and_Risidual(m, b, x, y):
    fitted_vals = []
    risid_vals = []

    for i in range(len(x)):
        fit = m * x[i] + b
        fitted_vals.append(fit)
        risid_vals.append(y[i] - fit)

    print(fitted_vals)
    print(risid_vals)


if __name__ == "__main__":
    main()
