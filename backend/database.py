import mysql.connector
from mysql.connector import errorcode

conn = mysql.connector.connect(user='root', password='your password', database='project')   #local mysql
cursor = conn.cursor()

TABLES = {}
TABLES['user'] = ('create table user ('
                  'UID int primary key NOT NULL,'
                  'name varchar(20),'
                  'email varchar(30),'
                  'password varchar(20) NOT NULL)')
TABLES['course'] = ('create table course ('
                    'courseID int primary key NOT NULL AUTO_INCREMENT,'
                    'course_name varchar(50),'
                    'classroom varchar(10),'
                    'startTime varchar(10),'
                    'endTime varchar(10),'
                    'day char(3),'
                    'zoomLink varchar(300),'
                    'teacher_name varchar(20))')
TABLES['study'] =  ('create table study ('
                    'UID int,'
                    'courseID int,'
                    'PRIMARY KEY(UID, courseID),'
                    'FOREIGN KEY(UID) REFERENCES user(UID),'
                    'FOREIGN KEY(courseID) REFERENCES course(courseID))')
TABLES['course_note'] = ('create table course_note ('
                            'courseID int,'
                            'note varchar(300),'
                            'FOREIGN KEY(courseID) REFERENCES course(courseID))')
TABLES['course_message'] = ('create table course_message ('
                            'courseID int,'
                            'message varchar(1000),'
                            'FOREIGN KEY(courseID) REFERENCES course(courseID))')
TABLES['time'] = ('create table time ('
                  'UID int,'
                  'login_time varchar(10),'
                  'logout_time varchar(10),'
                  'date varchar(10),'
                  'FOREIGN KEY(UID) REFERENCES user(UID))')

for table_name in TABLES:
    table_description = TABLES[table_name]
    try:
        print("Creating table {}: ".format(table_name), end='')
        cursor.execute(table_description)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
            print("already exists.")
        else:
            print(err.msg)
    else:
        print("OK")

courses = [
    { 'day': 'Mon', 'startTime': '8:30', 'endTime': '9:20', 'name': 'Math', 'teacher': 'T1', 'classroom': 'RM100' },
    { 'day': 'Tue', 'startTime': '9:30', 'endTime': '10:20', 'name': 'English', 'teacher': 'T2', 'classroom': 'RM101' },
    { 'day': 'Wed', 'startTime': '10:30', 'endTime': '11:20', 'name': 'Physics', 'teacher': 'T3', 'classroom': 'RM102' },
    { 'day': 'Thu', 'startTime': '11:30', 'endTime': '12:20', 'name': 'Chemistry', 'teacher': 'T4', 'classroom': 'RM103' },
    { 'day': 'Fri', 'startTime': '12:30', 'endTime': '14:20', 'name': 'CC', 'teacher': 'T5', 'classroom': 'RM104' },
    # Add more courses as needed
]

add_course = ('insert into course (course_name, classroom, startTime, endTime, day, teacher_name) values (%s, %s, %s, %s, %s, %s)')
for course in courses:
    cursor.execute(add_course, (course['name'], course['classroom'], course['startTime'], course['endTime'], course['day'], course['teacher']))
conn.commit()

cursor.close()
conn.close()