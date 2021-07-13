class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        longest = ""
        if(len(s) == "None"):
            return 0
        elif(len(s) == 1):
            return 1

        for i in range(len(s)):
            newStr = "" # reset newStr
            for y in range(len(s)-i):
                if(s[i+y] in newStr):   # if we find a duplicate
                    if len(newStr) > len(longest):  # save newStr if its longer
                        longest = newStr
                        # print(longest)
                    break                           # break
                else:                   # else no duplicate found
                    newStr += s[i+y]        # add char to newStr
                    if(i == len(s)):        # if end reached
                        longest = newStr        # longest is newStr

        return len(longest)


def main():
    s = "au"
    sol = Solution()
    print(sol.lengthOfLongestSubstring(s))


if __name__ == "__main__":
    main()
