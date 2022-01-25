import math
import statistics as s
import numpy as np
import matplotlib.pyplot as plt
import scipy.stats as sc


def main():
    sixty_five = [71.3, 69.1, 70.3, 69.9, 71.1, 70.7, 69.8, 68.5, 70.9, 69.8]
    eighty = [90.3, 90.8, 91.2, 90.7, 89, 89.7, 91.3, 91.2, 89.7, 91.1]
    sixty_mean = s.mean(sixty_five)
    eighty_mean = s.mean(eighty)
    sixty_uncertaintity = s.stdev(sixty_five)
    eighty_uncertaintity = s.stdev(eighty)

    print("sixty mean:", sixty_mean, "sixty uncertaintity:", sixty_uncertaintity)
    print("eighty mean:", eighty_mean, "eighty uncertaintity:", eighty_uncertaintity)


if __name__ == "__main__":
    main()
