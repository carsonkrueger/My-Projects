import glob
import scipy.linalg
import numpy.linalg
import copy

def factor(A: list, n, pivot):
    # 1. factor(A, n, pivot) 
    # a. A is the square matrix of coefficients 
    # b. n is the rank (number of rows/columns) of A 
    # c. pivot is an output vector that records the partial pivoting swaps
    L = copy.deepcopy(pivot) 
    U = copy.deepcopy(A)
    Pa, La, Ua = scipy.linalg.lu(A)
    for i in range(n):
        if (i == n-1): break
        nums = []
        for j in range(i+1,n):
            nums.append(A[j][i])
        mx = max(nums, key=abs) # find max in column
        maxPos = nums.index(mx) + (n - len(nums))
        
        if (A[i][i] == 0 or abs(A[i][i]) < abs(mx)): # pivot
            tmpA = A[i]
            tmpP = pivot[i]
            A[i] = A[maxPos]
            A[maxPos] = tmpA
            pivot[i] = pivot[maxPos]
            pivot[maxPos] = tmpP

    for i in range(1,n):
        # identityVal = A[i][i]
        for j in range(i,n): # writes only bottom half of L
            L[j][i-1] = U[j][i-1]/U[i-1][i-1]

            for k in range(i-1,n): # writes over rest of row for 'U'
                U[j][k] = U[j][k] - (L[j][i-1] * U[i-1][k])

        A = copy.deepcopy(U)

    return Pa, La, Ua

def solve(A, n, pivot, b, x):
    # 2. solve(A, n, pivot, b, x) 
    # a. A, n and pivot are from factor() (A is overwritten with its own LU 
    # factorization) 
    # b. b is a right-hand side to solve for 
    # c. x is an output vector with the solution of Ax = b 
    return numpy.linalg.solve(A, b)

def main():
    for file in glob.glob("./*.dat"):
        print("\n\nFile ", file)
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
        
        pivot = []
        for n in range(nRows):
            pivot.append([0] * nRows)
            pivot[n][n] = 1

        try:
            P, L, U = factor(A, nRows, pivot)
        except:
            print("ERROR: improper data")
            continue
        

        print("L\\U = ", end=" ")
        top = nRows
        bot = 0
        LU = []
        while (top > 0):
            lyst = []
            for i in range(0, bot):
                print(L[bot][i], " ", end="")
                lyst.append(L[bot][i])
            for i in range(bot, nRows):
                print(U[bot][i], " ", end="")
                lyst.append(U[bot][i])
            bot += 1
            top -= 1
            print("")
            LU.append(lyst)

        x = []
        try:
            for bCol in B:
                print("b = ", bCol)
                print("x = ", solve(LU, nRows, P, bCol, x))
        except:
            print("ERROR: improper data")
            continue
    
if __name__ == "__main__":
    main()