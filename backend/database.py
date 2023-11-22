import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

conn = mysql.connector.connect(
    user='root', password=os.getenv("DB_PASSWORD"))  # local mysql
cursor = conn.cursor()
cursor.execute("show databases like \'project\'")
# check if project database exists and delete it
if cursor.fetchall():
    cursor.execute("drop database project")
    conn.commit()

cursor.execute("create database project")
cursor.execute("use project")

TABLES = {}
TABLES['user'] = ('create table user ('
                  'UID varchar(10) primary key NOT NULL,'
                  'name varchar(20),'
                  'email varchar(30),'
                  'password varchar(20) NOT NULL)')
TABLES['course'] = ('create table course ('
                    'courseID varchar(8) primary key NOT NULL,' # e.g. COMP3278
                    'course_name varchar(50),'
                    'classroom varchar(10),'
                    'startTime varchar(10),'
                    'endTime varchar(10),'
                    'day char(3),'
                    'zoomLink varchar(300),'
                    'teacher_name varchar(20))')
TABLES['study'] =  ('create table study ('
                    'UID varchar(10),'
                    'courseID varchar(8),'
                    'PRIMARY KEY(UID, courseID),'
                    'FOREIGN KEY(UID) REFERENCES user(UID),'
                    'FOREIGN KEY(courseID) REFERENCES course(courseID))')
TABLES['course_note'] = ('create table course_note ('
                            'courseID varchar(8),'
                            'note varchar(300),'
                            'FOREIGN KEY(courseID) REFERENCES course(courseID))')
TABLES['course_message'] = ('create table course_message ('
                            'courseID varchar(8),'
                            'message varchar(1000),'
                            'FOREIGN KEY(courseID) REFERENCES course(courseID))')
TABLES['time'] = ('create table time ('
                  'UID varchar(10),'
                  'login_time varchar(10),'
                  'logout_time varchar(10),'
                  'login_date varchar(10),'
                  'logout_date varchar(10),'
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
    { 'day': 'Mon', 'startTime': '09:30', 'endTime': '10:20', 'ID': 'MATH1851', 'name': 'Math', 'teacher': 'T1', 'classroom': 'RM100' },
    { 'day': 'Tue', 'startTime': '10:30', 'endTime': '11:20', 'ID': 'CAES1000', 'name': 'English', 'teacher': 'T2', 'classroom': 'RM101' },
    { 'day': 'Wed', 'startTime': '11:30', 'endTime': '12:20', 'ID': 'PHYS1240', 'name': 'Physics', 'teacher': 'T3', 'classroom': 'RM102' },
    { 'day': 'Thu', 'startTime': '12:30', 'endTime': '14:20', 'ID': 'CHEM1340', 'name': 'Chemistry', 'teacher': 'T4', 'classroom': 'RM103' },
    { 'day': 'Fri', 'startTime': '14:30', 'endTime': '15:20', 'ID': 'CCGL9007', 'name': 'common core', 'teacher': 'T5', 'classroom': 'RM104' },
    # Add more courses as needed
]

add_course = ('insert into course (courseID, course_name, classroom, startTime, endTime, day, teacher_name) values (%s, %s, %s, %s, %s, %s, %s)')
for course in courses:
    cursor.execute(add_course, (course['ID'], course['name'], course['classroom'], course['startTime'], course['endTime'], course['day'], course['teacher']))
conn.commit()

users = [
    {'UID': '3035928287', 'name': 'Fung Gor', 'email': 'fung@connect.hku.hk', 'password': "12345678"},
    {'UID': '3035926447', 'name': 'P', 'email': 'pilottam@connect.hku.hk', 'password': "12345678"},
    {'UID': '3035926758', 'name': 'FOX', 'email': 'foxhui71@connect.hku.hk', 'password': "12345678"},
    {'UID': '3035930797', 'name': 'Ian', 'email': 'iltlo@connect.hku.hk', 'password': "12345678"},
]

add_user = ('insert into user (UID, name, email, password) values (%s, %s, %s, %s)')
for user in users:
    cursor.execute(add_user, (user['UID'], user['name'], user['email'], user['password']))
conn.commit()

studies = [
    {'UID': '3035926447', 'courseID': 'MATH1851'},
    {'UID': '3035926447', 'courseID': 'CCGL9007'},
    {'UID': '3035926447', 'courseID': 'CAES1000'},
]

add_study = ('insert into study (UID, courseID) values (%s, %s)')
for study in studies:
    cursor.execute(add_study, (study['UID'], study['courseID']))
conn.commit()

time = [
    {"UID": '3035928287', "login_time": "09:30", "logout_time": "10:20", "login_date": "11/11", "logout_date": "11/11"},
    {"UID": '3035926447', "login_time": "10:30", "logout_time": "11:20", "login_date": "12/11", "logout_date": "12/11"},
    {"UID": '3035926758', "login_time": "11:30", "logout_time": "12:20", "login_date": "13/11", "logout_date": "13/11"},
    {"UID": '3035926758', "login_time": "09:30", "logout_time": "12:20", "login_date": "15/11", "logout_date": "15/11"},
    {"UID": '3035926758', "login_time": "13:30", "logout_time": "13:40", "login_date": "20/11", "logout_date": "20/11"},
]

add_time = ('insert into time (UID, login_time, logout_time, login_date, logout_date) values (%s, %s, %s, %s, %s)')
for t in time:
    cursor.execute(add_time, (t['UID'], t['login_time'], t['logout_time'], t['login_date'], t['logout_date']))
conn.commit()

cursor.close()
conn.close()