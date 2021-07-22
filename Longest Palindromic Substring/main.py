from math import ceil


class Solution:
    def longestPalindrome(self, s: str) -> str:
        longest = 0

        if not s:
            return ""

        longest = ''
        depth = 0

        for char in s:
            temp = ''

            for i in range(depth, len(s)):
                temp += s[i]
                midpoint = len(temp) // 2
                offset = 0 if len(temp) % 2 == 1 else 1

                if(temp[0:midpoint] == temp[:midpoint - offset:-1]):
                    #print(temp, "PALINDROME")
                    longest = temp if len(temp) > len(longest) else longest

            depth += 1

        return longest


def main():
    sol = Solution()
    palindromeInput = "hiapaguizzuiuzzkolplo"  # CHANGE ME TO TEST
    print("returned", sol.longestPalindrome(palindromeInput))


if __name__ == "__main__":
    main()
