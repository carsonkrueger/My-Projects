import sys
import math
import numpy as np

base = sys.float_info.radix
eps = sys.float_info.epsilon
prec = sys.float_info.mant_dig
inf = math.inf

def sign(x):
    num = convertTo754(x)
    signBit = num[0]
    mantBits = num[12:64]
    # if (x == 0): print(x, num)
    if (exponent(x) == 0 and "1" not in mantBits):
        return 0
    if (signBit == "1"):
        return -1
    return 1

def exponent(x):
    num = convertTo754(x)
    expBits = num[1:12]
    exp = int(expBits, 2)
    if (x == 0): exp = 1023
    if (x == 1): exp = 1024
    return exp - 1023 

def fraction(x):
    num = convertTo754(x)
    mantBits = num[12:64]
    exp = exponent(x)

    placeVal = 2
    fraction = 0
    # 10 9 8 ... 0
    for i in mantBits:
        if (i == '1'):
            fraction += 1/placeVal
        placeVal *= 2

    return fraction

def mantissa(x):
    frac = fraction(x)
    if (frac == 0):
        return frac
    return frac+1

def is_posinfinity(x):
    num = convertTo754(x)
    signBit = num[0]
    expBits = num[2:12]
    mantBits = num[12:64]

    if (signBit == "1"): return False
    if ("0" in expBits): return False
    if ("1" in mantBits): return False

    return True
    
def is_neginfinity(x):
    num = convertTo754(x)
    signBit = num[0]
    expBits = num[2:12]
    mantBits = num[12:64]

    if (signBit == "0"): return False
    if ("0" in expBits): return False
    if ("1" in mantBits): return False

    return True

def ulp(a):
    return math.ulp(a)

def ulps(a,b):
    if ((a <= 0 and b >= 0) or (a >= 0 and b <= 0)):
        return inf
    elif (a == inf or b == inf):
        return inf

    # swap if a is greater than b
    if (a > b):
        tempA = a
        a = b
        b = tempA

    # ulps
    ulpA = math.ulp(a)
    ulpB = math.ulp(b)

    # exponents
    expA = math.frexp(ulpA)[1]
    expB = math.frexp(ulpB)[1]

    numUlps = 0
    intervalExp = expA
    lowerBound = a

    while (intervalExp <= expB):
        upperBound = 2**((prec-2)+intervalExp+1)
        intervalUlp = math.ulp(lowerBound)

        # if upperbound goes beyond b, set b as the upperbound
        if (upperBound > b):
            upperBound = b

        # adds number of ulps in this interval to total ulps
        numUlps += (upperBound - lowerBound)/intervalUlp
        lowerBound = upperBound
        intervalExp += 1

    return numUlps

def toBin(num):
    try:
        whl, dec = str(num).split(".")
    except:
        whl = str(num)
        dec = "0"
    length = 52 - len(whl)
    whl = int(whl)
    res = (str(bin(whl))+".").replace('0b','')
    
    for x in range(length):
        dec = str('0.')+str(dec)
        temp = '%1.51f' %(float(dec)*2)
        whl, dec = temp.split(".")
        res += whl
    return res

def convertTo754(num):
    if(num == -inf): return "1111111111110000000000000000000000000000000000000000000000000000"
    elif(num == inf): return "0111111111110000000000000000000000000000000000000000000000000000"
    elif(num == np.nextafter(0,1)): return "0000000000010000000000000000000000000000000000000000000000000001"
    elif(math.isnan(num)): return "0111111111110000000000000000000000000000000000000000000000000000"
    sign = 0
    if num < 0 :
        sign = 1
        num = num * (-1)
    # p = 52

    dec = toBin(num)#, p)
 
    dotPlace = dec.find('.')
    mantOne = dec.find('1')
    
    if mantOne > dotPlace:
        dec = dec.replace(".","")
        mantOne -= 1
        dotPlace -= 1
    elif mantOne < dotPlace:
        dec = dec.replace(".","")
        dotPlace -= 1
    mantissa = dec[mantOne+1:]
 
    # exponent
    exponent = dotPlace - mantOne
    exponent_bits = exponent + 1023
    exponent_bits = bin(exponent_bits).replace("0b",'')
 
    mantissa = mantissa[0:52]
    res = str(sign) + exponent_bits.zfill(11) + mantissa
 
    return res

if __name__ == "__main__":
    y = 6.5
    subMin = np.nextafter(0,1) #subMin = 5e-324 
    print(sign(y)) #1 
    print(sign(0.0)) # 0 
    print(sign(-y)) # -1 
    print(sign(-0.0)) #0 
    print(exponent(y)) # 2 
    print(exponent(16.6)) # 4 
    print(fraction(0.0)) #0.0 
    print(mantissa(y)) #1.625 
    print(mantissa(0.0)) #0.0 
    var1 = math.nan
    print(exponent(var1)) # 1024 
    print(exponent(0.0)) # 0 
    print(exponent(subMin)) # -1022 
    print(is_posinfinity(math.inf)) # True 
    print(is_neginfinity(math.inf)) # False 
    print(not is_posinfinity(-math.inf)) #True 
    print(is_neginfinity(-math.inf)) #True 
    print(ulp(y)) # 8.881784197001252e-16 
    print(ulp(1.0)) # 2.220446049250313e-16 
    print(ulp(0.0)) # 5e-324 
    print(ulp(subMin)) # 5e-324 
    print(ulp(1.0e15)) # 0.125 
    print(ulps(1,2)) # 4503599627370496
