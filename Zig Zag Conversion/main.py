class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows >= len(s) or numRows == 1:
            return s

        step = numRows + (numRows - 2)
        sts = step
        res = ""
        jump = 0
        start = 0
        for i in range(numRows, 0, -1):
            if i == numRows:
                res += s[start::step]
                jump += 2
                start += 1
            elif i == 1:
                res += s[start::sts]
            else:
                res += s[start]
                c = start + step
                while c < len(s):
                    res += s[c]
                    if c + jump < len(s):
                        res += s[c + jump]
                    c = c + jump + step
                jump += 2
                start += 1
            step -= 2
        return res


def main():
    s = "PAYPALISHIRING"
    # print("LEN", len(s))
    numRows = 4
    sol = Solution()
    sol.convert(s, numRows)


if __name__ == "__main__":
    main()
