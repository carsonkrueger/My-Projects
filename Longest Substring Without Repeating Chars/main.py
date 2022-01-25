class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        longest = 0
        if not s:
            return 0
        else:
            temp = ""
            for char in s:
                if char in temp:
                    longest = max(longest, len(temp))
                    temp = temp[temp.index(char) + 1 :]
                temp += char
                if len(temp) == len(s):
                    longest = len(temp)
        return max(longest, len(temp))


def main():
    s = "aab"
    sol = Solution()
    print(sol.lengthOfLongestSubstring(s))


if __name__ == "__main__":
    main()
