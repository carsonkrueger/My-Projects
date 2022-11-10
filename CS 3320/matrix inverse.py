import numpy as np
import numpy.linalg

if __name__ == "__main__":
    A = np.array([
    [15,-3,-1],
    [-3,18,-6],
    [-4,-1,12]
    ])
    b = np.array([4000,1200,2350])
    AInv = numpy.linalg.inv(A)
    print(np.matmul(AInv, b), "\n")


    A = np.array([
    [8,2,-10],
    [-9,1,3],
    [15,-1,6]
    ])
    AInv = numpy.linalg.inv(A)
    norm = numpy.linalg.norm(AInv, 1)
    print(norm, "\n")


    # A = np.array([[1,2,3],[4,1,6],[7,8,2]])
    # print(numpy.linalg.inv(A))
