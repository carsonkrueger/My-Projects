from math import ceil

class Solution:
    def longestPalindrome(self, s: str) -> str:
        palindrome = ""
        pal_len = 0

        for i in range(len(s)):

            #odd
            l, r = i, i
            while(l >= 0 and r < len(s) and s[l] == s[r]):
                if(r - l + 1) > pal_len:
                    palindrome = s[l:r+1]
                    pal_len = r - l + 1
                r += 1
                l -= 1

            #even len
            l, r = i, i+1
            while(l >= 0 and r < len(s) and s[l] == s[r]):
                if(r - l + 1) > pal_len:
                    palindrome = s[l:r+1]
                    pal_len = r - l + 1
                r += 1
                l -= 1
        
        return palindrome


def main():
    sol = Solution()
    palindromeInput = "babad"  # CHANGE ME TO TEST
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
