import random
import time
import matplotlib as mat
from matplotlib import pyplot


class VisualSorters:

    # ------------------------INIT-------------------------------------------------------------------
    def __init__(self, data):
        # mat.pyplot.ion()
        self.data = data
        self.dataLen = len(data)
        self.x_axis = []

        for x in range(0, self.dataLen):
            self.x_axis.append(x)
        # CREATE AND INITIALIZE SUBPLOT
        self.ax = mat.pyplot.subplot()
        self.ax.set_xlabel("Number")
        self.ax.set_ylabel("Data")
        self.ax.bar(self.x_axis, self.data)

    # -----------------------DRAWBAR-----------------------------------------------------------------

    def drawBar(self):
        self.ax.cla()
        self.ax.bar(self.x_axis, self.data)
        # self.ax.update(self.data)
        mat.pyplot.pause(.01)
        mat.pyplot.draw()

    # ----------------------AMIMATE------------------------------------------------------------------
    """
    Updates the mat.pyplot.bar() function by using the FuncAnimation() in main.
        INTERVAL is the FIRST ARGUMENT passed into the animate() function as i.

        THIS FUNCTION IS NOT USED IN ANY SORTING ALGORITHM EXCEPT FOR IN ITSELF
    """

    def animate(self, i):  # , x_axis, data, dataLen):
        # print("animate executed\n")
        # self.ani = mat.animation.FuncAnimation(mat.pyplot.gcf(), self.insertionSort, interval=300) #, fargs=(x_axis,data,dataLen))\
        rNum = random.randint(0, 1000)
        self.data.append(rNum)
        self.dataLen += 1
        self.x_axis.append(self.dataLen)
        # print(self.dataLen)

        self.ax.cla()
        mat.pyplot.bar(self.x_axis, self.data)

    # ------------------INSERTION SORT---------------------------------------------------------------

    def insertionSort(self):
        for i in range(1, self.dataLen):
            stored = self.data[i]
            j = i - 1

            while j >= 0 and self.data[j] > stored:
                self.data[j + 1] = self.data[j]
                self.drawBar()
                j -= 1

            self.data[j + 1] = stored
            self.drawBar()
            # mat.pyplot.close()

    # --------------------MERGE DATA------------------------------------------------------------------

    def mergeSort(array):
        if len(array) > 1:

            # Finding the mid of the arrayay
            mid = len(array)//2

            # Dividing the arrayay elements
            left = array[:mid]

            # into 2 halves
            right = array[mid:]

            # Sorting the first half
            mergeSort(left)

            # Sorting the second half
            mergeSort(right)

            i = j = k = 0

            # Copy data to temp arrayays left[] and right[]
            while i < len(left) and j < len(right):
                if left[i] < right[j]:
                    array[k] = left[i]
                    i += 1
                else:
                    array[k] = right[j]
                    j += 1
                k += 1

            # Checking if any element was left
            while i < len(left):
                array[k] = left[i]
                i += 1
                k += 1

            while j < len(right):
                array[k] = right[j]
                j += 1
                k += 1
