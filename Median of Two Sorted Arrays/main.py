from typing import List


class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        nums3 = nums1 + nums2
        nums3.sort()
        nums3Len = len(nums3)

        if (nums3Len % 2 == 1):
            return float(nums3[nums3Len//2])
        else:
            return (nums3[int(nums3Len/2 - 1)] + nums3[int(nums3Len/2)]) / 2


def main():
    sol = Solution()

    list1 = [1, 3]
    list2 = [2, 4]

    print(sol.findMedianSortedArrays(list1, list2))


if __name__ == "__main__":
    main()
