class newStr:
    def __init__(self, str=""):
        self.str = str


class Solution:
    def convert(self, s: str, numRows: int) -> str:

        zigZaggedStr = ""
        numOfMiddleLetters = numRows // 2
        offsetToNextLetter = numOfMiddleLetters + numRows
        secondOffsetToNextLetter = 0
        index = 0
        resetIndex = 1
        isSwitch = True

        if(numRows == 1):
            return s
        else:
            x = 0
            while(x != len(s)):

                print(x, end="**")
                try:
                    zigZaggedStr += s[index]  # ADDS to zigZaggedStr
                except IndexError:  # if out of bounds
                    print("Out of Range: ", IndexError)
                    index = resetIndex
                    resetIndex += 1

                    if offsetToNextLetter == 0:
                        offsetToNextLetter = numOfMiddleLetters + numRows
                        secondOffsetToNextLetter = 0
                    else:
                        offsetToNextLetter -= 2
                        secondOffsetToNextLetter += 2
                    continue

                print(offsetToNextLetter, secondOffsetToNextLetter)

                if isSwitch is True and offsetToNextLetter > 0:
                    index += offsetToNextLetter
                    if(secondOffsetToNextLetter > 0):
                        isSwitch = False
                else:
                    index += secondOffsetToNextLetter
                    if(offsetToNextLetter > 0):
                        isSwitch = True
                x += 1

            print(zigZaggedStr)


def main():
    s = "PAYPALISHIRING"
    numRows = 4
    sol = Solution()
    sol.convert(s, numRows)


if __name__ == "__main__":
    main()
