class Course:
    # must have default values for all parameters and must validate all parameters.
    def __init__(self, num=0, name="", hours=0.0, gpa=0.0):
        if isinstance(num, int) and num >= 0:
            self.coursNum = num
        else:
            raise ValueError

        if isinstance(name, str):
            self.coursName = name
        else:
            raise ValueError

        if isinstance(hours, float) and hours >= 0:
            self.credHours = hours
        else:
            raise ValueError

        if isinstance(gpa, float) and gpa >= 0:
            self.gpa = gpa
        else:
            raise ValueError

    def number(self):  # retrieve Course Number as an integer
        return self.coursNum

    def name(self):  # retrieve Course Name as a string
        return self.coursName

    def credit_hr(self):  # retrieve Credits as a floating-point number
        return self.credHours

    def grade(self):  # retrieve Grade as a numeric value in range 4.0 – 0.0
        return self.gpa

    def __str__(self):  # returns a string representing a single Course as shown in the Program Output section
        print(self.coursNum, self.coursName, self.credHours, self.gpa)
