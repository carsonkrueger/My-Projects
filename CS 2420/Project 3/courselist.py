#from course import Course


class CourseList:
    # to initialize all needed data for an empty list
    def __init__(self, Course=None, next=None):
        self.head = Course
        self.next = next

    def insert(self, Course):  # insert the specified Course in Course Number ascending order
        cur = self.head
        # print(cur.course.coursNum)

        if self.head is None:
            Course.next = None
            self.head = Course

        elif self.head.coursNum >= Course.coursNum:
            Course.next = self.head
            self.head = Course
            #print("assigned", cur.coursNum, "before", self.next.coursNum)

        else:
            while self.next != None and self.next.coursNum < Course.coursNum:
                cur = self.next
            Course.next = self.next
            self.next = Course

    def remove(self, number):  # remove the first occurrence of the specified Course
        cur = self.head

        if cur is not None:
            if cur.coursNum == number:
                self.head = self.next
                cur = None
                return

        while cur is not None:
            if cur.coursNum == number:
                break
            prev = cur
            cur = self.next

        # if key was not present in linked list
        if(cur == None):
            return

        # Unlink the node from linked list
        prev.next = self.next

        cur = None

    def remove_all(self, number):  # removes ALL occurrences of the specified Course
        cur = self.head

        if cur is not None:
            while cur.coursNum == number:
                self.head = self.next
                cur = self.next

        while cur is not None:
            if cur.coursNum == number:
                self.remove(number)
            cur = self.next

    def find(self, number):  # find the first occurrance of the specified course in the list or return -1
        cur = self.head
        pos = 0

        while cur is not None:
            if cur.coursNum == number:
                return cur
            pos += 1
            cur = self.next

        return -1

    def size(self):  # return the number of items in the list
        cur = self.head
        size = 0

        while cur is not None:
            size += 1
            cur = self.next

        return size

    def calculate_gpa(self):  # return the GPA using all courses in the list
        cur = self.head
        total = 0
        size = 0

        while cur is not None:
            total += cur.gpa
            size += 1
            cur = self.next

        if size is 0:
            return 0.0

        return total/size
        # return float(round(total / size, 2))

    def is_sorted(self):  # return True if the list is sorted by Course Number, False otherwise
        cur = self.head

        if cur is None:
            return True

        while self.next is not None:
            if cur.coursNum > self.next.coursNum:
                return False
            cur = self.next

        return True

    def __str__(self):  # returns a string with each Course’s data on a separate line (as shown in the Program Output)
        cur = self.head
        while(cur != None):
            cur.__str__()
            cur = self.next

    def __iter__(self):  # the linked list must be iterable
        return self

    def __next__(self):  # the linked list must be iterable
        #cur = self.head
        if self.next == None:
            raise StopIteration
        else:
            return self.next
