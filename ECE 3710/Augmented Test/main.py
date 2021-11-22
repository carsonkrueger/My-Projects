import pandas as pn
import numpy as np
import matplotlib.pyplot as p

def main():
    df = pn.read_excel(io="Practice.xlsx")
    dat = df["Close (Y)"].to_numpy()
    dat = np.flip(dat)
    x = df["(X)"].to_numpy()
    x = np.flip(x)
    print(dat)
    print(x)
    p.scatter(x, dat)
    
    xavgt = [x, np.ones(x.size)] #It's easier to make x transposed than x
    xavg = np.transpose(xavgt) #Then transpose that for x
    step1 = np.dot(xavgt, xavg)
    step2 = np.linalg.inv(step1)
    step3 = np.dot(step2, xavgt)
    B = np.dot(step3, dat)
    yhat = np.dot(xavg, B)
    p.plot(x, yhat, 'r')

    p.show()

if __name__ == "__main__":
    main()