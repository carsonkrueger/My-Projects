#data = [1400,Introduction to Programming,4,3.61410,C++ Programming,4,2.62810,Computer Architecture,3,3.82420,Introduction to Data Structures,4,3.21030,Introduction to Computers,2,3.2]
from courselist import CourseList, Node
from course import Course

def main():
    f = open("data.txt", "r")
    line = f.readline()
    LinkedList = CourseList()

    while line:
        line = line.strip("\n").split(",")
        course = Course(int(line[0]), line[1], int(line[2]), float(line[3]))
        #print(course.coursNum, course.coursName, course.credHours, course.gpa)
        if LinkedList.head.clas == None:
            LinkedList.head = Node(course)   # inserts head
        else:
            LinkedList.insert(Node(course))  # inserts middle elements
        line = f.readline()
    
    print("gpa:", LinkedList.calculate_gpa())
    f.close()
    LinkedList.__str__()
    
    


if __name__ == "__main__":
    main()