class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        longest = 0
        if not s:
            return 0
        else:
            sl = ''
            for ch in s:
                if ch in sl:
                    longest = max(longest, len(sl))
                    sl = sl[sl.index(ch)+1:]
                sl += ch
                if len(sl) == len(s):
                    longest = len(sl)
        return max(longest, len(sl))
        # longest = ""
        # lengthOfS = len(s)
        # if(lengthOfS < 2):
        #     return lengthOfS

        # for i in range(lengthOfS):
        #     newStr = ""  # reset newStr
        #     for y in range(lengthOfS-i):
        #         if(s[i+y] in newStr):   # if we find a duplicate
        #             # print("---")
        #             if len(newStr) > len(longest):  # save newStr if its longer
        #                 longest = newStr
        #                 # print(longest)
        #             break                           # break

        #         else:                   # else no duplicate found
        #             newStr += s[i+y]        # add char to newStr
        #             # print(newStr, longest, len(s)-1, y)
        #             if(y+i == (lengthOfS-1) and len(newStr) >= len(longest)):  # if end reached
        #                 longest = newStr                                # longest is set to newStr
        #                 return len(longest)

        # return len(longest)


def main():
    s = "aab"
    sol = Solution()
    print(sol.lengthOfLongestSubstring(s))


if __name__ == "__main__":
    main()
