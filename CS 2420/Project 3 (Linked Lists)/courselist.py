"""builds the linked list"""

class CourseList:
    """Course list class builds the linked list"""
    def __init__(self, Course = None):
        """to initialize all needed data for an empty list"""
        self.head = Course

    def insert(self, Course):
        """insert the specified Course in Course Number ascending order"""
        cur = self.head
        #print(cur.course.course_num)

        if self.head is None:
            Course.next = None
            self.head = Course

        elif self.head.course_num >= Course.course_num:
            Course.next = self.head
            self.head = Course
            #print("assigned", cur.course_num, "before", cur.next.course_num)

        else:
            while cur.next is not None and cur.next.course_num < Course.course_num:
                cur = cur.next
            Course.next = cur.next
            cur.next = Course

    def remove(self, number):
        """remove the first occurrence of the specified Course"""
        cur = self.head

        if cur is not None:
            if cur.course_num is number:
                self.head = cur.next
                cur = None
                return

        while cur is not None:
            if cur.course_num is number:
                break
            prev = cur
            cur = cur.next

        if cur is None:
            return

        prev.next = cur.next
        cur = None

    def remove_all(self, number):
        """removes ALL occurrences of the specified Course"""
        cur = self.head

        if cur is not None:
            while cur.course_num is number:
                self.head = cur.next
                cur = cur.next

        while cur is not None:
            if cur.course_num is number:
                self.remove(number)
            cur = cur.next

    def find(self, number):
        """find the first occurrance of the specified course in the list or return -1"""
        cur = self.head
        pos = 0

        while cur is not None:
            if cur.course_num is number:
                return cur
            pos += 1
            cur = cur.next

        return -1

    def size(self):
        """return the number of items in the list"""
        cur = self.head
        size = 0

        while cur is not None:
            size += 1
            cur = cur.next

        return size

    def calculate_gpa(self):
        """return the GPA using all courses in the list"""
        cur = self.head
        total = 0
        creds = 0

        while cur is not None:
            total += cur.gpa * cur.cred_hours
            creds += cur.cred_hours
            cur = cur.next

        if creds == 0:
            return 0

        return float(total / creds)

    def is_sorted(self):
        """return True if the list is sorted by Course Number, False otherwise"""
        cur = self.head

        if cur is None:
            return True

        while cur.next is not None:
            if cur.course_num > cur.next.course_num:
                return False
            cur = cur.next

        return True

    def __str__(self):
        """returns a string with each Course’s data on a separate line 
        (as shown in the Program Output)"""
        cur = self.head
        my_str = ""

        while cur is not None:
            my_str += cur.__str__() + "\n"
            cur = cur.next

        return my_str

    def __iter__(self):
        """the linked list must be iterable"""
        return self.head

    def __next__(self):
        """the linked list must be iterable"""
        if self.next is None:
            raise StopIteration

        return self.next
