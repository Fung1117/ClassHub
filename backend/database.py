import mysql.connector
from mysql.connector import errorcode

conn = mysql.connector.connect(user='root', password='your password', database='project')   #local mysql
cursor = conn.cursor()

TABLES = {}
TABLES['user'] = ('create table user ('
                  'UID int primary key NOT NULL AUTO_INCREMENT,'
                  'name varchar(20),'
                  'email varchar(30),'
                  'password varchar(20) NOT NULL)')
TABLES['course'] = ('create table course ('
                    'courseID int primary key NOT NULL AUTO_INCREMENT,'
                    'course_name varchar(50),'
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

cursor.close()
conn.close()