import math
import statistics as s
import numpy as np
import matplotlib.pyplot as plt


def main():
    x = np.linspace(1, 2, 100)
    # fig = plt.figure()
    # x = range(0,100)

    data = [400, 300, 150, 100, 50]
    x_vals = [0, 1, 2, 3, 4]

    plt.bar(x_vals, data)
    plt.show()

    plt.plot(x, create_CDF_list(x))
    plt.show()

    # plt.plot(PDF(x), x)
    # plt.show()


def create_CDF_list(x):
    prev = 0
    CDF_list = []
    for i in x:
        prev += -3 / (i ** 4)
        CDF_list.append(prev)
    return CDF_list
    # prev = 0
    # CDF_list = []
    # for i in x:
    #     prev += .4 * math.e ** (-.4 * i)
    #     CDF_list.append(prev)
    # return CDF_list


# prev = 0
# def CDF(x):
#     global prev
#     prev += .4 * math.e ** (-.4 * x)
#     output = prev
#     return output


def PDF(x):
    output = 2 * (1 - x)
    return output


main()
