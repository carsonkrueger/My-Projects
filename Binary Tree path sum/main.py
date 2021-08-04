class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def pathSum(self, root: TreeNode, targetSum: int) -> List[List[int]]:
        pass


def makeTree(prevNode):
    left = TreeNode(root.pop(0))
    right = TreeNode(root.pop(0))
    prevNode.left = left
    prevNode.right = right

    if left.val != None:
        makeTree(left)
    if right.val != None:
        makeTree(right)


def main():
    global root
    global rootNode

    targetSum = 22
    # [5,     4,8,    11,None,    13,4,   7,2,    None,None,  5,1]
    root = [5, 4, 8, 11, None, 13, 4, 7, 2, None, None, 5, 1]
    rootNode = TreeNode(root.pop(0))
    makeTree(rootNode)

    sol = Solution(rootNode, targetSum)


if __name__ == "__main__":
    main()
