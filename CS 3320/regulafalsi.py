from asyncio.windows_events import NULL


def reg(xu, xl, func):
    root = (xu + xl) / 2
    flag = False
    # func val at found root
    numIters = 0

    while (True):
        val = func(root)
        if (val < 0):
            xu = root
        elif (val > 0):
            xl = root
        elif (val == 0):
            print("FOUND ROOT", root)
        root = (xu + xl) / 2
            

if __name__ == "__main__":
    pass