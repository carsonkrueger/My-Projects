from typing import List
import math


class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        nums1 += nums2
        nums1.sort()
        nums1Len = len(nums1)
        median = 0

        if (nums1Len % 2 == 1):
            median = float(nums1[math.floor(nums1Len/2)])
        else:
            median = (nums1[int(nums1Len/2 - 1)] + nums1[int(nums1Len/2)]) / 2

        print(median)
        return median


def main():
    sol = Solution()

    list1 = [1, 3]
    list2 = [2, 4]

    sol.findMedianSortedArrays(list1, list2)


if __name__ == "__main__":
    main()
