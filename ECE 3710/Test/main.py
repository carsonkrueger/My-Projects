import statistics as s
import numpy as np
import matplotlib.pyplot as plt


def main():
    method_A = [
        18,
        18,
        19,
        20,
        21,
        22,
        22.5,
        23.3,
        24,
        24,
        24.5,
        25,
        25,
        25.4,
        26.2,
        26.4,
    ]
    method_B = [
        18.6,
        18.9,
        19.2,
        19.6,
        20.1,
        20.3,
        20.4,
        20.4,
        20.5,
        20.6,
        21.2,
        22,
        22,
        22.3,
        22.5,
        23.6,
    ]
    method_C = [
        20.2,
        20.3,
        20.5,
        20.7,
        20.8,
        20.9,
        21,
        21,
        21,
        21.3,
        21.4,
        21.5,
        21.5,
        21.5,
        21.6,
        21.7,
    ]
    method_D = [
        20,
        20,
        20,
        20.1,
        20.2,
        20.5,
        20.5,
        20.7,
        20.7,
        20.8,
        21,
        21.1,
        21.4,
        21.6,
        22.1,
        22.2,
    ]
    method_A.sort()
    method_B.sort()
    method_C.sort()
    method_D.sort()

    # print(len(method_A), len(method_B), len(method_C), len(method_D))
    print("------------------------------------\n")
    print(
        "MEANS:",
        sum(method_A) / len(method_A),
        sum(method_B) / len(method_B),
        sum(method_C) / len(method_C),
        sum(method_D) / len(method_D),
    )
    print(
        "MEDIANS:",
        s.median(method_A),
        s.median(method_B),
        s.median(method_C),
        s.median(method_D),
    )
    print(
        "FIRST QUARTILES:",
        np.quantile(method_A, 0.25),
        np.quantile(method_B, 0.25),
        np.quantile(method_C, 0.25),
        np.quantile(method_D, 0.25),
    )
    print(
        "THIRD QUARTILES:",
        np.quantile(method_A, 0.75),
        np.quantile(method_B, 0.75),
        np.quantile(method_C, 0.75),
        np.quantile(method_D, 0.75),
    )
    print(
        "STD DEV's:",
        s.stdev(method_A),
        s.stdev(method_B),
        s.stdev(method_C),
        s.stdev(method_D),
    )

    print("\n------------------------------------\n")

    print("Data plotted...")
    twenty_three_samples = [
        2099,
        528,
        2030,
        1350,
        1018,
        384,
        1499,
        1265,
        375,
        424,
        789,
        810,
        522,
        513,
        488,
        200,
        215,
        486,
        257,
        557,
        260,
        461,
        500,
    ]
    x_indexes = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
    ]
    twenty_three_samples.sort()

    box_plot = plt.figure()
    plt.boxplot(twenty_three_samples)

    dot_plot = plt.figure()
    plt.scatter(x_indexes, twenty_three_samples)

    histogram = plt.figure()
    plt.hist(twenty_three_samples)

    plt.show()

    print("\n------------------------------------\n")

    hundred_women_sample = {27: 0, 22: 1, 30: 2, 12: 3, 7: 4, 2: 5}
    children = list(hundred_women_sample.values())

    print("CHILDREN MEAN:", s.mean(children))
    print("CHILDREN STD DEV:", s.stdev(children))
    print("MEDIANS:", s.median(children))
    print("FIRST QUARTILES:", np.quantile(children, 0.25))


if __name__ == "__main__":
    main()
