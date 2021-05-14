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

    def mergeData(self, left, right):
        print(left, end="---")
        print(right)

        try:
            if (len(left) == 0):
                return

            if (len(right) == 0):
                return

        except(TypeError):
            return

        result = []
        index_left = index_right = 0

        while len(result) < len(left) + len(right):
            #print(left, end=" ")
            # print(right)
            # print(result)
            if left[index_left] <= right[index_right]:
                result.append(left[index_left])
                index_left += 1
            else:
                result.append(right[index_right])
                index_right += 1

            # self.data = left + right
            # self.drawBar()

            if index_right == len(right):
                result += left[index_left:]
                # self.drawBar()
                break

            if index_left == len(left):
                result += right[index_right:]
                # self.drawBar()
                break

    # ---------------------MERGE SORT----------------------------------------------------------------

    def merge(self, array):
        # print(array)

        if len(array) < 2:
            return array
        # print(array[midpoint:])

        midpoint = len(array) // 2
        print(array[:midpoint], end=" ")
        print(array[midpoint:])

        self.mergeData(left=self.merge(array[:midpoint]),
                       right=self.merge(array[midpoint:]))
