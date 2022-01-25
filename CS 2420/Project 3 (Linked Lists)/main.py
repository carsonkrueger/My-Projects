"""Driver module"""

from courselist import CourseList
from course import Course


def main():
    """main function"""
    f = open("data.txt", "r")
    line = f.readline()
    LinkedList = CourseList()

    while line:
        line = line.strip("\n").split(",")
        course = Course(int(line[0]), line[1], float(line[2]), float(line[3]))

        if LinkedList.head == None:
            LinkedList.head = course  # inserts head
        else:
            LinkedList.insert(course)  # inserts middle elements

        line = f.readline()
    f.close()

    LinkedList.__str__()


if __name__ == "__main__":
    """calls main function"""
    main()
