class newStr:
    def __init__(self, str=""):
        self.str = str


class Solution:
    def convert(self, s: str, numRows: int) -> str:

        zigZaggedStr = ""
        numOfMiddleLetters = numRows // 2
        offsetToNextLetter = numOfMiddleLetters + numRows
        secondOffsetToLetter = 0
        index = 0
        resetIndex = 1
        isSwitch = True
        if(numRows == 1):
            return s
        else:
            x = 0
            while(x != len(s)):

                print(x, end=" -> ")

                try:
                    zigZaggedStr += s[index]  # ADDS to zigZaggedStr
                except IndexError:  # if out of bounds
                    #print("Out of Range: ", IndexError)
                    index = resetIndex
                    resetIndex += 1
                    offsetToNextLetter -= 2
                    secondOffsetToLetter += 2

                    if offsetToNextLetter == 0:
                        isSwitch = False
                    else:
                        isSwitch = True
                    continue

                print(index, s[index], offsetToNextLetter,
                      secondOffsetToLetter)

                if isSwitch is True:
                    index += offsetToNextLetter
                    if(secondOffsetToLetter > 0):
                        isSwitch = False
                else:
                    index += secondOffsetToLetter
                    if(offsetToNextLetter > 0):
                        isSwitch = True
                x += 1
            print(zigZaggedStr)
            return zigZaggedStr


def main():
    s = "ABC"
    # print("LEN", len(s))
    numRows = 2
    sol = Solution()
    sol.convert(s, numRows)


if __name__ == "__main__":
    main()
