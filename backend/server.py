from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

conn = mysql.connector.connect(
    user='root', password=os.getenv("DB_PASSWORD"), database='project')  # local mysql
cursor = conn.cursor()

app = Flask(__name__)

CORS(app)

@app.route('/Login', methods=['POST'])
def Login():
    login_data = request.json
    is_face = login_data.get('isFace', False)
    email = login_data.get('email')
    if is_face:
        # Face login logic
        image = login_data.get('image')
        # Implement your face login verification here
        if True:
            return jsonify({'success': True, 'UID': 1, 'Name': 'Fung'})
        else:
            return jsonify({'success': False})
    else:
        password = login_data.get('password')
        print(email, password)
        if email == "example@example.com" and password == "123456":
            return jsonify({'success': True, 'UID': 1, 'Name': 'Fung'})
        else:
            return jsonify({'success': False})


@app.route('/course', methods=['GET'])
def TimeTable():
    uid = request.args.get('uid')
    print(uid)

    cursor.execute('select * from course')
    query = cursor.fetchall()
    keys = ['ID', 'name', 'classroom', 'startTime',
            'endTime', 'day', 'zoomLink', 'teacher']
    courses = [{key: value for key, value in zip(keys, tpl)} for tpl in query]
    print(courses)
    return jsonify(courses)

@app.route('/upcomingCourse', methods=['GET'])
def OneHrCourse():
    uid = request.args.get('uid')
    print(uid)

    # get closest upcoming course here
    course = {
            "uid": "COMP3214",
            "name": "Introduction to React",
            "teacher": "John Doe",
            "startTime": "22:30",
            "endTime": "23:20",
            "day": "Mon",
            "classroom": "Room 101",
            "zoomLink": "https://zoom.us/j/123456789?pwd=QWERTYUIOP",
            "resourceLink": "https://notes.com/j/123456789?pwd=QWERTYUIOP"
        },
    return jsonify(course)


@app.route('/messages', methods=['GET'])
def Messages():
    uid = request.args.get('uid')
    print(uid)

    messages = [
        {
            "courseUid": "COMP3330",
            "teacher": "Teacher 1",
            "message": "Hello students! Please submit your assignments by the end of this week.",
        },
        {
            "courseUid": "COMP3330",
            "teacher": "Teacher 2",
            "message": "Reminder: There will be a quiz on Monday. Prepare well!",
        },
    ]
    return jsonify(messages)


@app.route("/enroll", methods=["POST"])
def enroll_course():
    data = request.get_json()
    course_id = data.get("courseId")
    # add course here pls by sql
    return jsonify({"success": True, "message": "Course enrolled successfully"})


@app.route("/drop", methods=["POST"])
def drop_course():
    data = request.get_json()
    course_id = data.get("courseId")
    # drop course here pls by sql
    return jsonify({"success": True, "message": "Course dropped successfully"})

@app.route("/get-current-courses", methods=["GET"])
def get_current_courses():
    current_courses = [
        {"id": 1, "title": "Mathematics"},
        {"id": 2, "title": "History"},
        # Add more courses as needed
    ]
    return jsonify({"currentCourses": current_courses})

@app.route("/get-available-courses", methods=["GET"])
def get_available_courses():
    available_courses = [
        {
            "uid": "COMP3214",
            "name": "Introduction to React",
            "teacher": "John Doe",
            "startTime": "09:30",
            "endTime": "10:20",
            "day": "Mon",
            "classroom": "Room 101",
        },
        {
            "uid": "COMP2396",
            "name": "Advanced JavaScript",
            "teacher": "Jane Smith",
            "startTime": "13:30",
            "endTime": "15:20",
            "day": "Tue",
            "classroom": "Room 202",
        },
    ]
    return jsonify({"availableCourses": available_courses})


@app.route('/Time', methods=['GET'])
def Time():
    uid = request.args.get('uid')
    print(uid)

    time_data = [100, 200, 300, 400, 150, 200,
                 10, 100, 200, 300, 400, 150, 200, 10]
    date_data = [
        '11/11', '12/11', '13/11', '14/11', '15/11', '16/11',
        '17/11', '11/10', '12/10', '13/10', '14/10', '15/10',
        '16/10', '17/10'
    ]
    return jsonify(time=time_data, date=date_data)


@app.route('/last-login', methods=['GET'])
def LastLogin():
    uid = request.args.get('uid')
    print(uid)
    last_login = '2023-11-01 15:33:00'
    return jsonify({'lastLogin': last_login})


@app.route('/Logout', methods=['POST'])
def Logout():

    pass


if __name__ == '__main__':
    app.run(debug=True)
