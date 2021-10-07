class Course:
    def __init__(self, num, name, hours, gpa): #must have default values for all parameters and must validate all parameters.
        self.coursNum = num
        self.coursName = name
        self.credHours = hours
        self.gpa = gpa

    def number(self): #retrieve Course Number as an integer
        return self.coursNum

    def name(self): #retrieve Course Name as a string
        return self.coursName

    def credit_hr(self): #retrieve Credits as a floating-point number
        return self.credHours

    def grade(self) : #retrieve Grade as a numeric value in range 4.0 – 0.0
        return self.gpa

    def __str__(self): #returns a string representing a single Course as shown in the Program Output section
        return ""