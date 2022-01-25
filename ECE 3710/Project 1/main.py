import csv
import random
import math
import statistics as s
import numpy as np
import matplotlib.pyplot as plt
import scipy.stats as sc


def main():
    print()  # Spaces console nicely

    bins, temps = read_CSV()
    mean = s.mean(temps)
    variance = s.variance(temps)
    std_dev = s.stdev(temps)
    print("TOTAL:", mean, variance)

    convenienice_mean, convenience_var = compute_sample_convenience(temps)
    print("SAMPLE CONVENIENCE:", convenienice_mean, convenience_var)

    random_mean, random_var = compute_simple_random(temps)
    print("RANDOM SIMPLE:", random_mean, random_var)

    # plot_histograms(bins, temps)
    plot_population(bins, temps, mean, convenienice_mean, random_mean)
    normal_distribution(bins, temps, mean, std_dev)

    print()  # Spaces console nicely


def read_CSV():
    f = open("testWeather.csv", "r")
    csv_reader = csv.reader(f)
    temps = []
    bins = []

    for row in csv_reader:
        temps.append(int(row[2]))
        bins.append(row[1])

    return bins, temps


def compute_sample_convenience(temps):
    lst = []

    for i in range(20):
        lst.append(temps[i])

    mean = s.mean(lst)
    var = s.variance(lst)

    return mean, var


def compute_simple_random(temps):
    lyst = []

    for i in range(20):
        ran = math.floor(random.random() * (len(temps) - 1))
        lyst.append(temps[ran])

    mean = s.mean(lyst)
    var = s.variance(lyst)

    return mean, var


def plot_histograms(bins, temps):
    # Regular Histogram
    plt.cla()
    plt.hist(temps, 10, label="Histogram")
    plt.show()

    # Normalized Histogram
    plt.cla()
    plt.hist(temps, label="Normalized Histogram", density=True)
    plt.show()


def plot_population(bins, temps, mean, con_mean, ran_mean):
    plt.cla()
    plt.plot(bins, temps, color="orange")
    plt.ylabel("Temperature")
    plt.xlabel("Dates")
    plt.title(bins[0] + "  -  " + bins[-1])

    plt.axhline(mean, color="red")
    plt.axhline(ran_mean, color="blue")
    plt.axhline(con_mean, color="black")

    plt.legend(
        ["Population", "Mean", "SRS Mean", "Conv. Mean", "Gaussian"], loc="lower right"
    )
    plt.show()


def normal_distribution(bins, temps, mean, std_dev):
    plt.cla()
    x_axis = np.arange(0, 366, 1)
    plt.plot(bins, sc.norm.pdf(temps), label="norm pdf", color="orange")
    plt.show()


if __name__ == "__main__":
    main()
