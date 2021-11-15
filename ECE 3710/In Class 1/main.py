import matplotlib as plt

def main():
    x = [1,2,3,4,5,8]
    x_aug = [x.^2, x, ones(6, 1)]
    y = [3,6.8,13.6,20.4,27.2,30]
    
    plt.plot(x, )
    plt.show()    

if __name__ == "__main__":
    main()