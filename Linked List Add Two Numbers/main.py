# Definition for singly-linked list.
from typing import List
from typing_extensions import Concatenate


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:

        concatVal1 = concatVal2 = ""

        while(l1):
            concatVal1 = str(l1.val) + concatVal1
            l1 = l1.next

        if not l1:
            concatVal1 = "0"

        while(l2):
            concatVal2 = str(l2.val) + concatVal2
            l2 = l2.next

        if not l2:
            concatVal2 = "0"

        sum = int(concatVal1) + int(concatVal2)
        initial = cur = ListNode()

        for i in reversed(str(sum)):
            cur.val = int(i)
            cur = cur.next

        print(initial.next)
        return(initial.next)

        #     n1, n2 = "", ""

        # while l1:
        #     n1 = str(l1.val) +  n1
        #     l1 = l1.next

        # while l2:
        #     n2 = str(l2.val) +  n2
        #     l2 = l2.next

        # if not n1:
        #     n1 = "0"

        # if not n2:
        #     n2 = "0"

        # summ = int(n1) + int(n2)

        # dummy = cur = ListNode()

        # for i in reversed(str(summ)):
        #     cur.next = ListNode(int(i))
        #     cur = cur.next

        # return dummy.next


def main():
    e3 = ListNode(3)
    e2 = ListNode(4, e3)
    e1 = ListNode(2, e2)

    p3 = ListNode(4)
    p2 = ListNode(6, p3)
    p1 = ListNode(5, p2)

    # 342 -> [2,4,3]
    # 465 -> [5,6,4]
    sol = Solution()
    print(sol.addTwoNumbers(e1, p1))


if __name__ == "__main__":
    main()
