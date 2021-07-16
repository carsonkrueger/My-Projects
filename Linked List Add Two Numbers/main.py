# Definition for singly-linked list.
from typing import List
from typing_extensions import Concatenate


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode):  # -> ListNode:
        currNode1 = l1
        currNode2 = l2

        concatVal1 = ""
        concatVal2 = ""

        while(True):
            concatVal1 += str(currNode1.val)
            concatVal2 += str(currNode2.val)

            if(currNode1.next == None or currNode2.next == None):
                break

            currNode1 = currNode1.next
            currNode2 = currNode2.next

        sum = ""
        sum += str(int(concatVal1) + int(concatVal2))
        print(sum)

        list1 = []
        for x in reversed(sum):
            list1 += x

        return (list1)


def main():
    e3 = ListNode(2)
    e2 = ListNode(4, e3)
    e1 = ListNode(3, e2)

    p3 = ListNode(5)
    p2 = ListNode(6, p3)
    p1 = ListNode(4, p2)

    # 342 -> [2,4,3]
    # 465 -> [5,6,4]
    sol = Solution()
    print(sol.addTwoNumbers(e1, p1))


if __name__ == "__main__":
    main()
