

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

        if cur is not None:
            while cur.clas.coursNum == number:
                self.head = cur.next
                cur = cur.next

        while cur is not None:
            if cur.clas.coursNum == number:
                self.remove(number)
            cur = cur.next

    def find(self, number): #find the first occurrance of the specified course in the list or return -1
        cur = self.head
        pos = 0

        while cur is not None:
            if cur.clas.coursNum == number:
                return pos
            pos += 1
            cur = cur.next

        return -1
            
    def size(self): #return the number of items in the list
        cur = self.head
        size = 0

        while cur is not None:
            size += 1
            cur = cur.next

        return size

    def calculate_gpa(self): #return the GPA using all courses in the list
        cur = self.head
        total = 0
        size = 0

        while cur is not None:
            total += cur.clas.gpa
            size += 1
            cur = cur.next
            
        return float(round(total / size, 2))

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