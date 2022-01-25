import statistics as s
from matplotlib.colors import Normalize
import numpy as np
import matplotlib.pyplot as plt


def main():
    # question_one()
    question_two()


def question_one():
    print("\n______QUESTION ONE______\n")
    x = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0]
    x_size = len(x)

    zero_occ = x.count(0)
    one_occ = x.count(1)

    fig = plt.figure()
    plt.bar([0, 1], [zero_occ, one_occ])
    # plt.hist(x,bins=2)
    plt.show()

    zero_norm = zero_occ / x_size
    one_norm = one_occ / x_size

    print("P(X=0):", zero_norm, "    ", "P(X=1):", one_norm)
    # print("Mean:", (0 * zero_norm + 1 * one_norm))
    print("Mean:", s.mean(x), "Variance:", s.variance(x))

    plt.bar([0, 1], [zero_norm, one_norm])
    axes = plt.gca()
    axes.set_xlim([0, 1])
    axes.set_ylim([0, 1])
    plt.show()

    plt.bar([0, 1], [0.7, 0.3])
    axes = plt.gca()
    axes.set_xlim([0, 1])
    axes.set_ylim([0, 1])
    plt.show()


def question_two():
    print("\n______QUESTION TWO______\n")
    x = [
        201.4579,
        200.9891,
        207.9385,
        195.9777,
        203.4831,
        204.1754,
        198.7814,
        201.0784,
        194.1708,
        194.2602,
        200.5244,
        203.6113,
        212.9275,
        196.6655,
        200.9367,
        199.5875,
        190.3349,
        197.8052,
        191.0266,
        204.2019,
    ]
    y = []
    domain = np.linspace(0, 1000, 1000)

    mean = s.mean(x)
    variance = s.variance(x)
    print("Mean:", mean, "    ", "Variance:", variance)

    plt.hist(x, bins=5)
    plt.show()

    x2 = np.arange(180, 220.01, 0.01)
    print(x2)

    for item in x2:
        y.append(PDF(item, variance, mean))

    plt.plot(x2, y)
    plt.show()


def PDF(x, var, mean):
    output = 1 / np.sqrt(2 * np.pi * var) * np.e ** (-1 / (2 * var * (x - mean) ** 2))
    return output


if __name__ == "__main__":
    main()
