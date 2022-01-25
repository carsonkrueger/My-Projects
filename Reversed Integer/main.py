class Solution:
    def reverse(self, x: int):  # -> int:
        x = str(x)
        y = x[::-1]
        if y[-1] == "-":
            y = "-" + y[:-1]
        y = int(y)
        if y < -2147483648 or y > 2147483648:
            return 0
        return y


def main():
    x = -8463847412  # 2147483648 is max, -2147483648 is min
    sol = Solution()
    print(sol.reverse(x))


if __name__ == "__main__":
    main()
