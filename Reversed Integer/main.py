class Solution:
    def reverse(self, x: int):  # -> int:
        x = str(x)
        y = x[::-1]
        if y[-1] == '-':
            y = '-' + y[:-1]
        y = int(y)
        if y < -2147483648 or y > 2147483648:
            return 0
        return y
        # n = 1

        # if(x < 0):
        #     x *= -1
        #     n = -1

        # x = reversed(str(x))
        # s = ""
        # cur = next(x)

        # while(cur):
        #     try:
        #         s += str(cur)
        #         cur = next(x)
        #     except:
        #         break

        # s = int(s)
        # if(s > 2147483648 or s < -2147483648):
        #     s = 0
        # return s * n


def main():
    x = -8463847412  # 2147483648 is max, -2147483648 is min
    sol = Solution()
    print(sol.reverse(x))


if __name__ == "__main__":
    main()
