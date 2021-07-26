from math import ceil


class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s:
            return ""

        longest = ""
        temp = ""
        x = 0
        newStartingIndex = 1

        while(x < len(s)):  # abcncba

            temp += s[x]
            tempLen = len(temp)
            midpoint = tempLen//2

            # if tempLen == 2:
            #     if temp[0] == temp[1] and len(longest) > tempLen:
            #         longest = temp

            if tempLen % 2 == 0 and tempLen > 1:  # EVEN LENGTH
                if(temp[0:midpoint]) == temp[:midpoint-1:-1]:
                    #print(temp, "EVEN")

                    if tempLen > len(longest):
                        longest = temp
                        temp = ""

            elif tempLen % 2 == 1 and tempLen > 1:  # ODD LENGTH
                if((temp[0:midpoint]) == temp[:midpoint:-1]):
                    #print(temp, "ODD")

                    if(tempLen > len(longest)):
                        longest = temp
                        temp = ""

            if x == len(s) - 1 and newStartingIndex < len(s) - 1:
                temp = ''
                x = newStartingIndex
                newStartingIndex += 1

            x += 1

        return longest

        # longest = ''
        # depth = 0

        # for char in s:
        #     temp = ''

        #     for i in range(depth, len(s)):
        #         temp += s[i]
        #         midpoint = len(temp) // 2
        #         offset = 0 if len(temp) % 2 == 1 else 1

        #         if(temp[0:midpoint] == temp[:midpoint - offset:-1]):
        #             #print(temp, "PALINDROME")
        #             longest = temp if len(temp) > len(longest) else longest

        #     depth += 1

        # return longest


def main():
    sol = Solution()
    palindromeInput = "vnjwvalrbypfcbqnmopltjnoifmzwgvpzqzsdtvawndpjtpmpjbjionjifqtvvocpeaftvhpdgjjfafunfndztdjkcxyihtsyppendfzzjeyxlbwpdygiqmdqcdbmgyjigrmfkswcwryaydjilqqxvcnyvviesuncslvzikawwqykqwdfibggezufqihcjkebapmgkvwixywgdextafxycnipjglsndkyjoqfyfljfkkvoieksmavdlmlhhnstesibffiopqvlyuidvrawndbzonwzbsjmpeqoglmdbinkovqpzfkxihzitdopnomseqhmrrkcsvrzziphwpuhjngeotwcrebcmbtirkgeavojtmpakcewmexhxacngknokxsvtqobdgckutpexswgwqzbosjpxauyflnylfcxsucsehqvakbpvfmkelmkspsqxnutwfwacpqqvovdqafeylobneojdsgqowcbxfsvuqusdbylcgcvgrofgvzubakjmlbffjhrafvnqttwuyhokzpmhlludpbowuxzrebxsdusalljfjgjkucwzpmndqncykvfnbrxcrcaxwisjpstejjqbpwegpxyrtyafxklgralnkwxkmjpuqfixzkonznmguyizlancpxdzcfkgiotyelegprbaytdhbutbuihkxnbtuqrtezaskfqsmrznfohhlqp"
    # palindromeInput = "abba"  # CHANGE ME TO TEST
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
