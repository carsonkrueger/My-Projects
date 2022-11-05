import glob, os

def factor(A, n, pivot):
    pass
    # 1. factor(A, n, pivot) 
    # a. A is the square matrix of coefficients 
    # b. n is the rank (number of rows/columns) of A 
    # c. pivot is an output vector that records the partial pivoting swaps 

def solve(A, n, pivot, b, x):
    pass
    # 2. solve(A, n, pivot, b, x) 
    # a. A, n and pivot are from factor() (A is overwritten with its own LU 
    # factorization) 
    # b. b is a right-hand side to solve for 
    # c. x is an output vector with the solution of Ax = b 

def main():
    for file in glob.glob("./*.dat"):
        print("File ", file)
        f = open(file, mode="r")

        nRows = int(f.readline().split()[0])
        A = []
        for row in range(nRows):
            A.append(f.readline().split())
            A[row] = list(map(int, A[row]))

        nRights = int(f.readline().split()[0])
        B = []
        for row in range(nRights):
            B.append(f.readline().split())
            B[row] = list(map(int, B[row]))

        pivot = [[1,0,0], [0,1,0], [0,0,1]]

    

if __name__ == "__main__":
    main()