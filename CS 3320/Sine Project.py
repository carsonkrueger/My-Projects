import sys
import math

epsilon = sys.float_info.epsilon

def mySine(x):
    if (x > 10**9):
        # print("too big")
        return math.nan
    elif (x**2 <= epsilon):
        # print("too small")
        return math.sin(x)

    x = x % 90

    doNeg = True
    for i in range(3,21+1,2):
        if (doNeg):
            x -= (x**i)/(math.factorial(i))
        else:
            x += (x**i)/(math.factorial(i))
        doNeg = not doNeg # flip doNeg

    return x
    # return math.sin(x)
    
    # redu = x % (math.pi/2)
    

if __name__ == "__main__":
    print(mySine(1.0e-08)) #1e-08 
    print(mySine(0.00001)) #9.999999999833334e-06 
    print(mySine(0)) #0 
    print(mySine(math.pi/2)) #1.0000000000000002 
    print(mySine(math.pi)) #-0.0 
    print(mySine(100)) #-0.5063656411097555 
    print(mySine(-1000)) #-0.8268795405320125 
    print(mySine(999999999)) #-0.4101372630100049 
    print(mySine(-1000000001)) #nan
