

class Node:
    def __init__(self, course = None):
        self.clas = course
        self.next = None

class CourseList:
    def __init__(self, Course = Node()): #to initialize all needed data for an empty list
        self.head = Course

    def insert(self, Course): #insert the specified Course in Course Number ascending order
        cur = self.head
        #print(cur.course.coursNum)

        if self.head.clas is None:
            Course.next = None
            self.head = Course

        elif self.head.clas.coursNum >= Course.clas.coursNum:
            Course.next = self.head
            self.head = Course
            #print("assigned", cur.coursNum, "before", cur.next.coursNum)

        else:
            while cur.next != None and cur.next.clas.coursNum < Course.clas.coursNum:
                cur = cur.next
            Course.next = cur.next
            cur.next = Course

    def remove(self, number): #remove the first occurrence of the specified Course
        cur = self.head
 
        if cur is not None:
            if cur.clas.coursNum == number:
                self.head = cur.next
                cur = None
                return
 
        while cur is not None:
            if cur.clas.coursNum == number:
                break
            prev = cur
            cur = cur.next
 
        # if key was not present in linked list
        if(cur == None):
            return
 
        # Unlink the node from linked list
        prev.next = cur.next
 
        cur = None

    def remove_all(self, number): #removes ALL occurrences of the specified Course
        cur = self.head
 
        while(cur.next != None):
            if cur.clas.
            


    def find(self, number): #find the first occurrance of the specified course in the list or return -1
        temp = self
        if temp.course.coursNum == number:
            return self.course

        while temp.course.coursNum != number:
            if temp.course.coursNum == number:
                return temp
            elif temp.next == None:
                break
            temp = temp.next
            
        return -1

    def size(self): #return the number of items in the list
        temp = self
        size = 0

        if temp.next == None:
            size += 1
            return size

        while temp.next != None:
            size += 1
            temp = temp.next

        return size

    def calculate_gpa(self): #return the GPA using all courses in the list
        temp = self
        totalGpa = 0

        if temp.next == None:
            totalGpa += self.course.gpa
            return totalGpa

        while temp.next != None:
            totalGpa += self.course.gpa
            temp = temp.next

        return totalGpa

    def is_sorted(): #return True if the list is sorted by Course Number, False otherwise
        pass

    def __str__(self): #returns a string with each Course’s data on a separate line (as shown in the Program Output)
        cur = self.head
        while(cur != None):
            print(cur.clas.coursNum, cur.clas.coursName, cur.clas.credHours, cur.clas.gpa)
            cur = cur.next

    def __iter__(self): #the linked list must be iterable
        return self

    def __next__(self): #the linked list must be iterable
        if self.next == None:
            raise StopIteration
        else:
            return self.next