import math
import statistics as s
import numpy as np
import matplotlib.pyplot as plt
import scipy.stats as sc

def main():
    x=[0,0,0.1,0.5,0.9,0.2,0.1]
    mean = s.mean(x)
    variance = s.variance(x)
    print("X's Mean:", mean, "StdDev:", variance)

    x_values = np.arange(-2, 2, 0.1)
    y_values = sc.norm(mean, variance)

    plt.plot(x_values, y_values.pdf(x_values))
    plt.show()


    gamma_values = sc.gamma(.6, 2.35)
    plt.plot(x_values, gamma_values.pdf(x_values))
    plt.show()


if __name__ == "__main__":
    main()