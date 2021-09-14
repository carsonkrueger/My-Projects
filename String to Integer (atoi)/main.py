class Solution:
    def myAtoi(self, s: str) -> int:
        n = 1
        if '-' in s:
            n = -1

        # num_filter = filter(str.isdigit, s)
        # s = "".join(num_filter)

        s = s.strip()

        for i in range(len(s)):
            if s[i].isnumeric():
                if i == 0:
                    return 0
                s = s[0:i]
            else:
                break

        s = int(s)

        if s > 2147483648:
            s = 2147483648
        # if s > -2147483648:
        #     s = -2147483648

        return s * n


def main():
    s = "  987  "
    # print("LEN", len(s))
    sol = Solution()
    print(sol.myAtoi(s))


if __name__ == "__main__":
    main()
