import math
import statistics as s
import numpy as np
import matplotlib.pyplot as plt

def main():
    x = np.linspace(0, 1, 100) 
    fig = plt.figure()

    plt.plot(CDF(x), np.sin(x)) 
    plt.show()

    plt.plot(PDF(x), np.sin(x))
    plt.show()

def CDF(x):
    output = 2 * (x - (x**2)/2)
    return output

def PDF(x):
    output = 2 * (1 - x)
    return output

main()