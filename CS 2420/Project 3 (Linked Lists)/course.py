"""Builds the Course objects"""

class Course:
    """must have default values for all parameters and must validate all parameters."""

    def __init__(self, num=0, name="", hours=0.0, gpa=0.0):
        """initializes Course"""
        if isinstance(num, int) and num >= 0:
            self.course_num = num
        else:
            raise ValueError

        if isinstance(name, str):
            self.course_name = name
        else:
            raise ValueError

        if isinstance(hours, float) and hours >= 0:
            self.cred_hours = hours
        else:
            raise ValueError

        if isinstance(gpa, float) and gpa >= 0:
            self.gpa = gpa
        else:
            raise ValueError

        self.next = None

    def number(self):
        """retrieve Course Number as an integer"""
        return self.course_num

    def name(self):
        """retrieve Course Name as a string"""
        return self.course_name

    def credit_hr(self):
        """retrieve Credits as a floating-point number"""
        return self.cred_hours

    def grade(self):
        """retrieve Grade as a numeric value in range 4.0 – 0.0"""
        return self.gpa

    # def __str__(self):
    #     """returns a string representing a single Course as shown in the Program Output section"""
    #     my_str = "cs" + str(self.course_num) + ", " + str(self.course_name) + " grade:" + str(self.cred_hours) + ", " + str(self.gpa)
    #     return my_str

    # def __next__(self):
    #     """returns next iterator"""
    #     if self.next == None:
    #         raise StopIteration
    #     else:
    #         return self.next
