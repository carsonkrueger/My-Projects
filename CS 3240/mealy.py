def convert(inputStr):
    outputStr = ""
    A = "+BF-AFA-FB+"
    B = "-AF+BFB+FA-"

    for char in inputStr:
        if char.lower() == 'a':
            outputStr += A
        elif char.lower() == 'b':
            outputStr += B
        else: 
            outputStr += char

    return outputStr

def main():
    while True:
        print("\n------------ENTER q TO QUIT------------\n")

        inputStr: str = input("Enter a string to be converted containing \"A,B,F,+, or -\": ")
        if inputStr.lower() == 'q':
            break
        numTimes: int = input("Enter integer for number of times to be converted: ")
        if numTimes.lower() == 'q':
            break

        for i in range(int(numTimes)):
            inputStr = convert(inputStr)

        print("\nOUTPUT:\n\n", inputStr)
    
if __name__ == "__main__":
    main()