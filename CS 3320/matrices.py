import numpy as np

if __name__ == "__main__":
    e = np.array([
        [0, -7, 5],
        [0, 4, 7],
        [4, -3, 7],
    ])
    c = np.array(
        [50, -30, -40]
    )
    print("question 1: ", np.linalg.solve(e, c))

    e = np.array([
        [0, -3, 7],
        [1, 2, -1],
        [5, -2, 0],
    ])
    c = np.array(
        [4, 0, 3]
    )
    print("question 2: ", np.linalg.solve(e, c))
    print("question 2 det: ", np.linalg.det(e))


    e = np.array([
        [2, 1, -2],
        [4, -1, 2],
        [2, -1, 1],
    ])

    e = np.array([
        [  1,   0,   0],[2,  1,    -2],
        [1/2,   1,   0],[0, .5,    -3], 
        [  1, 1/4,   1],[0,  0, -2.25],
    ])