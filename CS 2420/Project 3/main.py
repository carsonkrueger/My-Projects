# data = [1400,Introduction to Programming,4,3.61410,C++ Programming,4,2.62810,Computer Architecture,3,3.82420,Introduction to Data Structures,4,3.21030,Introduction to Computers,2,3.2]
from courselist import CourseList
from course import Course


def main():
    f = open("data.txt", "r")
    line = f.readline()
    LinkedList = CourseList()

    while line:
        line = line.strip("\n").split(",")
        course = Course(int(line[0]), line[1], float(line[2]), float(line[3]))
        #print(course.coursNum, course.coursName, course.credHours, course.gpa)
        if LinkedList.head == None:
            LinkedList.head = course   # inserts head
        else:
            LinkedList.insert(course)  # inserts middle elements
        line = f.readline()
    f.close()
    #print("sorted?:", LinkedList.is_sorted())

    for _ in LinkedList:
        print(_)

    LinkedList.__str__()


if __name__ == "__main__":
    main()
