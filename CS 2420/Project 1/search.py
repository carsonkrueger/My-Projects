import time


class search:
    def __init__(self, lyst, higher, lower, target) -> None:
        self.halfpoint = len(lyst)//2
        self.higher = len(lyst)
        self.lower = 0
        self.target = target

        # self.linear_search(lyst, target)  # CALLS FUNCTIONS
        self.binary_search(lyst, target)
        # self.jump_search(lyst, target)

    def linear_search(self, lyst, target) -> bool:
        for i in lyst:
            if lyst[i] == target:
                # print("FOUND i:", lyst[i])
                return True
        return False

    def binary_search(self, lyst, target) -> bool:
        while(self.halfpoint != target):
            print(self.halfpoint)
            if self.halfpoint == -1:
                return
            if (target == lyst[self.halfpoint]):
                return True
            elif (lyst[self.halfpoint] < target):  # target is higher
                self.lower = self.halfpoint + 1
                # move halfpoint up
                self.halfpoint += (self.higher - self.halfpoint)//2
            elif (lyst[self.halfpoint] > target):  # target is lower
                self.higher = self.halfpoint - 1
                # move halfpoint down
                self.halfpoint += (self.halfpoint - self.lower)//2

    def jump_search(self, lyst, target) -> bool:
        pass


def main():
    lyst = [82, 14, 55, 98, 2, 27, 47, 65, 37, 67, 52, 54, 87, 42, 88, 77, 62, 8, 62, 16, 56, 23, 27, 83, 74, 65, 81, 61, 80, 52, 49, 79, 43, 31, 5, 51, 48, 89, 62, 27, 13, 14, 85, 68, 46, 43, 95, 58, 22, 76, 77, 46, 6, 18, 26, 11, 53, 11, 52, 17, 31, 35, 62, 11, 38, 42, 27, 53, 63, 75, 50, 19, 93, 47, 2, 51, 41, 89, 64, 34, 70, 83, 58, 75, 4, 40, 89, 30, 57, 22, 17, 77, 43, 94, 97, 37, 58, 39, 10, 12, 46, 73, 55, 65, 42, 6, 6, 98, 24, 21, 78, 25, 90, 29, 83, 98, 21, 14, 20, 86, 3, 26, 38, 67, 59, 64, 12, 59, 59, 65, 29, 97, 22, 4, 95, 24, 79, 73, 41, 38, 41, 34, 39, 93, 86, 62, 1, 5, 56, 1, 7, 5, 60, 63, 94, 7, 18, 52, 54, 95, 99, 8, 18, 10, 4, 6, 67, 56, 46, 10, 19, 83, 3, 76, 95, 18, 38, 9, 25, 47, 13, 86, 16, 82, 66, 81, 55, 76, 48, 32, 67, 26, 95, 16, 95, 74, 50, 96, 1, 88, 76, 38, 48, 93, 19, 8, 38, 8, 72, 33, 94, 46, 47, 61, 71, 73, 52, 79, 98, 88, 62, 69, 57, 75, 81, 58, 6, 7, 89, 21, 68, 23, 75, 4, 68, 99, 29, 49, 79, 68, 39, 45, 93, 46, 49, 24, 66, 16, 33,
            38, 87, 64, 87, 20, 86, 19, 45, 53, 6, 66, 11, 80, 67, 99, 15, 63, 99, 36, 40, 89, 39, 2, 86, 68, 59, 15, 96, 76, 78, 27, 42, 11, 52, 83, 48, 97, 89, 60, 88, 36, 12, 83, 49, 59, 68, 31, 56, 82, 64, 17, 97, 35, 86, 99, 52, 38, 53, 33, 66, 64, 74, 7, 17, 70, 3, 31, 42, 8, 32, 23, 77, 47, 35, 19, 73, 10, 85, 91, 27, 87, 52, 72, 70, 37, 16, 41, 49, 46, 7, 13, 61, 68, 8, 62, 54, 60, 2, 10, 42, 15, 58, 76, 9, 14, 26, 75, 55, 45, 53, 91, 92, 58, 25, 5, 86, 14, 54, 41, 74, 29, 88, 5, 2, 28, 39, 53, 26, 69, 12, 77, 88, 38, 40, 8, 28, 90, 85, 74, 44, 54, 36, 30, 82, 59, 8, 77, 90, 77, 90, 86, 16, 83, 42, 5, 53, 96, 7, 84, 6, 1, 9, 27, 20, 96, 65, 84, 73, 23, 86, 49, 89, 45, 80, 33, 14, 86, 33, 81, 97, 83, 43, 17, 41, 28, 48, 36, 90, 51, 5, 4, 53, 55, 53, 40, 78, 14, 75, 71, 44, 1, 82, 60, 67, 73, 83, 31, 92, 2, 1, 27, 6, 28, 70, 33, 56, 68, 36, 71, 52, 29, 99, 97, 90, 74, 96, 43, 20, 85, 80, 44, 27, 71, 35, 54, 71, 65, 66, 3, 38, 62, 11, 94, 83, 90, 40, 30, 48, 35, 59, 23]
    lyst.sort()
    higher = len(lyst)
    lower = 0
    target = 6

    timer = time.perf_counter()
    srch = search(lyst, higher, lower, target)
    timer = time.perf_counter() - timer
    print("TIME: ", timer)


if __name__ == "__main__":
    main()
