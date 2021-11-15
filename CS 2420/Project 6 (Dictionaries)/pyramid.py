import sys
import time

time.perf_counter()
cache = tuple()

def weight_on(r, c):
    global functionHits
    global cacheHits
    global cache
    global totalRows
    #f = open("output.txt", "a")

    string = ""
    functionHits += 1
    thisWeightOn = 0

    if r == totalRows - 1 and c == r+1:        # checks to see if we have completed the pyramid
        print("\nElapsed Time: " + str(time.perf_counter()) + " seconds")
        print("Number of function calls:", functionHits)
        print("Number of cache hits:", cacheHits)
        # print(pyramidWeights)
        return 0  # PROGRAM FINISHED

    if(c == r+1 and r+1 <= totalRows):      # if end of row AND next row exists
        r += 1                              # moves function to new row
        c = 0                               # resets column to first position
        #print("new row")

    if(c > 0 and c < r):                    # if column is middle
        thisWeightOn = (cache.get((r-1, c-1)) + cache.get((r-1, c)) + 400) / 2
        cacheHits += 2
        string = format(thisWeightOn, ".2f")
        f.write(str(string) + " ")
        print(string, end=" ")

    elif(c == r):
        if(r == 0):  # if column is in first row
            string = format(thisWeightOn, ".2f")
            print(string)
            # print("first")
        else:  # else column is on right side
            thisWeightOn = (cache.get((r-1, c-1)) + 200) / 2
            cacheHits += 1
            string = format(thisWeightOn, ".2f")
            print(string)

        f.write(str(string) + "\n")

    elif(c == 0):                        # if column is left side
        thisWeightOn = (cache.get((r-1, c)) + 200) / 2
        cacheHits += 1
        string = format(thisWeightOn, ".2f")
        f.write(str(string) + " ")
        print(string, end=" ")

    cache[tuple((r, c))] = thisWeightOn
    # print(pyramidWeights.get((r,c)))
    weight_on(r, c+1)


if __name__ == "__main__":
    f = open("output.txt", "w")
    f.close
    f = open("output.txt", "a")

    functionHits = 0
    cacheHits = 0
    cache = {}

    if len(sys.argv) > 1:
        totalRows = int(sys.argv[1])
        weight_on(0, 0)
        f.close()
    else:
        print("You did not enter anything! ")
