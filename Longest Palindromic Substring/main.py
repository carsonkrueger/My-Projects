from math import ceil


class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s:
            return ""

        longest = ""
        longLen = 0

        for i in range(len(s)):
            left, right = i, i

            while(left >= 0 and right < len(s) and s[left] == s[right]):
                if(right - left + 1) > longLen:
                    longest = s[left:right+1]
                    longLen = (right - left + 1)
                left -= 1
                right += 1

            left, right = i, i+1
            while(left >= 0 and right < len(s) and s[left] == s[right]):
                if(right - left + 1) > longLen:
                    longest = s[left:right+1]
                    longLen = (right - left + 1)
                left -= 1
                right += 1

        return longest


def main():
    sol = Solution()
    palindromeInput = "abba"  # CHANGE ME TO TEST
    print("returned", sol.longestPalindrome(palindromeInput))
    # palindromeInput = "oabba"  # CHANGE ME TO TEST
    # print("returned", sol.longestPalindrome(palindromeInput))
    # palindromeInput = "oabbabuyhbbhyu"  # CHANGE ME TO TEST
    # print("returned", sol.longestPalindrome(palindromeInput))
    # palindromeInput = "oabbabuyhbbhyunmluvu"  # CHANGE ME TO TEST
    # print("returned", sol.longestPalindrome(palindromeInput))
    # palindromeInput = "oabbabuyhbbhyuls.d,dfmymymymymymymym"  # CHANGE ME TO TEST
    # print("returned", sol.longestPalindrome(palindromeInput))
    # palindromeInput = "nhnhnhnhnhnhnabbauvuoo"  # CHANGE ME TO TEST
    # print("returned", sol.longestPalindrome(palindromeInput))


if __name__ == "__main__":
    main()
