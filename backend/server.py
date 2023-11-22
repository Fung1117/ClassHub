import datetime
import time
from flask import Flask, request, render_template, redirect, jsonify
from flask_cors import CORS
from flask_mail import Mail
from flask_mail import Message
import mysql.connector
from dotenv import load_dotenv

from recognition import recognize_face

import os

# Load environment variables from .env file
load_dotenv()

conn = mysql.connector.connect(
    user='root', password=os.getenv("DB_PASSWORD"), database='project')  # local mysql
cursor = conn.cursor()

app = Flask(__name__)

CORS(app)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.office365.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")

# Initialize Flask-Mail
mail = Mail(app)

@app.route('/sendEmail', methods=['POST'])
def SendEmail():
    send_email_data = request.json
    courseUid = send_email_data.get('courseUid')
    email = send_email_data.get('email')
    cursor.execute("""
                   select name 
                   from user 
                   where email = %s
                   """, [email])
    query = cursor.fetchall()
    conn.commit()
    name = query[0][0]

    cursor.execute("""
                   select C.courseID, C.course_name, C.classroom, C.zoomLink, C.teacher_name, CN.note, CM.message
                   from course C, course_note CN, course_message CM
                   where C.courseID = CN.courseID and C.courseID = CM.courseID and C.courseID = %s
                   """ [courseUid])
    query = cursor.fetchall()
    conn.commit()

    courseID = query[0][0]
    course_name = query[0][1]
    classroom = query[0][2]
    zoomLink = query[0][3]
    teacher_name = query[0][4]
    note = query[0][5]
    message = query[0][6]

    message = f"""
    Dear {name},

    You have a class coming up soon! Here are the details:
    courseId: {courseID}
    course_name: {course_name}
    classroom: {classroom}
    teacher_name: {teacher_name}
    message: {message}
    note: {note}

    You can click the following link to join the class:
    zoomLink: <a href={zoomLink}>{zoomLink}</a>

    Best regards,
    Your friendly reminder
    """
    subject = "Information about your upcoming courses"
    msg = Message(recipients=email, body=message, subject=subject)

    conn.send(msg)

@app.route('/Login', methods=['POST'])
def Login():
    login_data = request.json
    is_face = login_data.get('isFace', False)
    email = login_data.get('email')

    cursor.execute('select UID, name, password from user where email = %s', [email])
    query = cursor.fetchall()
    if query == []:
        return jsonify({'success': False, 'message': 'User not found'})
    print(query)

    # result of query
    DB_UID = query[0][0]
    DB_name = query[0][1]
    DB_password = query[0][2]

    current_time = datetime.datetime.now()
    today = current_time.strftime('%d/%m')
    now = current_time.strftime('%H:%M')

    print(today, now)

    if is_face:
        # Face login logic
        image = login_data.get('image')
        # Implement your face login verification here
        print(recognize_face("FOX", image))
        if recognize_face("FOX", image):
            cursor.execute('INSERT INTO time (login_time, login_date, UID) VALUES (%s, %s, %s)', [now, today, DB_UID])
            conn.commit()
            return jsonify({'success': True, 'uid': DB_UID, 'Name': DB_name})
        else:
            return jsonify({'success': False, 'message': 'Face not recognized'})
    else:
        input_password = login_data.get('password')
        print(email, input_password)
        if input_password == DB_password:
            cursor.execute('INSERT INTO time (login_time, login_date, UID) VALUES (%s, %s, %s)', [now, today, DB_UID])
            conn.commit()
            return jsonify({'success': True, 'uid': DB_UID, 'Name': DB_name})
        else:
            return jsonify({'success': False, 'message': 'Wrong password'})


@app.route('/course', methods=['GET'])
def TimeTable():
    uid = request.args.get('uid')
    print(uid)

    cursor.execute('select * from course where courseID in (select courseID from study where uid = %s)', [uid])
    query = cursor.fetchall()
    keys = ['ID', 'name', 'classroom', 'startTime',
            'endTime', 'day', 'zoomLink', 'teacher']
    courses = [{key: value for key, value in zip(keys, tpl)} for tpl in query]
    return jsonify(courses)


@app.route('/upcomingCourse', methods=['GET'])
def OneHrCourse():
    uid = request.args.get('uid')
    print(uid)

    # get closest upcoming course here
    now = time.strftime('%a %H:%M').split(" ")
    cursor.execute("select * from course "
                   "where day = %s and "
                   "startTime > %s and "
                   "courseID in (select courseID from study where UID = %s) "
                   "order by startTime "
                   "limit 1", [now[0], now[1], uid])
    query = cursor.fetchall()
    if query == []:
        return jsonify([])
    keys = ['uid', 'name', 'classroom', 'startTime', 'endTime', 'day', 'zoomLink', 'teacher']
    course = [{key: value for key, value in zip(keys, tpl)} for tpl in query]
    return jsonify(course)
    # return jsonify([{
    #     "uid": "COMP3278",
    #     "name": "Introduction to React",
    #     "classroom": "Room 101",
    #     "startTime": "09:30",
    #     "endTime": "10:20",
    #     "day": "Mon",
    #     "zoomLink": "https://zoom.us/j/1234567890",
    #     "teacher": "John Doe",
    # }])

@app.route('/messages', methods=['GET'])
def Messages():
    uid = request.args.get('uid')
    print(uid)
    # messages = [
    #     {
    #         "courseUid": "COMP3330",
    #         "teacher": "Teacher 1",
    #         "message": "Hello students! Please submit your assignments by the end of this week.",
    #     },
    #     {
    #         "courseUid": "COMP3330",
    #         "teacher": "Teacher 2",
    #         "message": "Reminder: There will be a quiz on Monday. Prepare well!",
    #     },
    # ]
    cursor.execute("select cm.courseID, cm.message, temp.teacher_name "
                   "from course_message cm, (select c.courseID, c.teacher_name from course c, study s where s.UID = %s and s.courseID = c.courseID) as temp "
                   "where temp.courseID = cm.courseID;", [uid])
    query = cursor.fetchall()
    print(query)
    keys = ['courseUid', 'message', 'teacher']
    messages = [{key: value for key,
                          value in zip(keys, tpl)} for tpl in query]
    return jsonify(messages)


@app.route("/enroll", methods=["POST"])
def enroll_course():
    data = request.get_json()
    uid = data.get('uid')
    course_id = data.get("courseId")
    # add course here pls by sql
    cursor.execute("insert into study (UID, courseID) values (%s, %s)", [uid, course_id])
    conn.commit()
    return jsonify({"success": True, "message": "Course enrolled successfully"})


@app.route("/drop", methods=["POST"])
def drop_course():
    data = request.get_json()
    uid = data.get('uid')
    course_id = data.get("courseId")
    # drop course here pls by sql
    cursor.execute("DELETE FROM study WHERE UID = %s AND courseID = %s", [uid, course_id])
    conn.commit()    
    return jsonify({"success": True, "message": "Course dropped successfully"})


@app.route("/get-current-courses", methods=["GET"])
def get_current_courses():
    # current_courses = [
    #     {"id": 1, "title": "Mathematics"},
    #     {"id": 2, "title": "History"},
    # ]
    uid = request.args.get('uid')
    cursor.execute('select courseID from study where UID = %s', [uid])
    query = cursor.fetchall()
    keys = ['title']
    current_courses = [{key: value for key,
                          value in zip(keys, tpl)} for tpl in query]
    for i in range(len(current_courses)):
        current_courses[i]['id'] = i
    return jsonify({"currentCourses": current_courses})


@app.route("/get-available-courses", methods=["GET"])
def get_available_courses():
    # available_courses = [
    #     {
    #         "id": 1,
    #         "uid": "COMP3214",
    #         "courseName": "Introduction to React",
    #         "teacher": "John Doe",
    #         "startTime": "09:30",
    #         "endTime": "10:20",
    #         "day": "Mon",
    #         "classroom": "Room 101",
    #     },
    # ]
    time.sleep(0.1)
    uid = request.args.get('uid')
    cursor.execute('select * from course where courseID not in (select courseID from study where UID = %s)', [uid])
    query = cursor.fetchall()
    keys = ['uid', 'courseName', 'classroom', 'startTime',
            'endTime', 'day', 'zoomLink', 'teacher']
    available_courses = [{key: value for key,
                          value in zip(keys, tpl)} for tpl in query]
    for i in range(len(available_courses)):
        available_courses[i]['id'] = i
    return jsonify({"availableCourses": available_courses})


@app.route('/Time', methods=['GET'])
def Time():
    uid = request.args.get('uid')
    print(uid)

    # time_data = [100, 200, 300, 400, 150, 200,
    #              10, 100, 200, 300, 400, 150, 200, 10]
    # date_data = [
    #     '11/11', '12/11', '13/11', '14/11', '15/11', '16/11',
    #     '17/11', '11/10', '12/10', '13/10', '14/10', '15/10',
    #     '16/10', '17/10'
    # ]
    cursor.execute("select TIME_TO_SEC(TIMEDIFF(logout_time, login_time))/60, login_date from time WHERE UID = %s and logout_time is not null order by login_date DESC LIMIT 10", [uid])
    query = cursor.fetchall()
    print(query)
    time_data, date_data = zip(*query)
    return jsonify(time=time_data[::-1], date=date_data[::-1])


@app.route('/last-login', methods=['GET'])
def LastLogin():
    uid = request.args.get('uid')
    cursor.execute('select logout_time, logout_date from time where UID = %s order by logout_date DESC, logout_time DESC LIMIT 1', [uid])
    query = cursor.fetchall()
    if query == []:
        return jsonify({'lastLogin': None})
    print(query)

    last_login = f'{query[0][1]} {query[0][0]}'
    return jsonify({'lastLogin': last_login})


@app.route('/Logout', methods=['POST'])
def Logout():
    print("logout")
    logout_data = request.json
    DB_UID = logout_data.get('uid')
    print(DB_UID)
    current_time = datetime.datetime.now()
    date = current_time.strftime('%d/%m')
    now = current_time.strftime('%H:%M')
    cursor.execute("select login_time from time where UID = %s order by login_time desc limit 1", [DB_UID])
    login = cursor.fetchone()[0]
    cursor.execute("update time set logout_time = %s, logout_date = %s where UID = %s and login_time = %s", [now, date, DB_UID, login])
    conn.commit()
    return jsonify([])


@app.route('/backend/create_course', methods=['GET', 'POST'])
def manage_courses():
    if request.method == 'POST':
        # Handle form submission to create a new course
        courseID = request.form['courseID']
        courseName = request.form['courseName']
        classroom = request.form['classroom']
        day = request.form['day']
        zoomLink = request.form['zoomLink']
        teacherName = request.form['teacherName']
        startTime = request.form['startTime']
        endTime = request.form['endTime']

        # Insert data into the 'course' table
        cursor.execute('INSERT INTO course (courseID, course_name, classroom, day, zoomLink, teacher_name, startTime, endTime) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                       (courseID, courseName, classroom, day, zoomLink, teacherName, startTime, endTime))
        conn.commit()
        # Redirect to the home page after creating the course
        return redirect('/backend/create_course')

    else:
        # Fetch existing courses from the database
        cursor.execute('SELECT * FROM course')
        existing_courses = cursor.fetchall()

        return render_template('create_course.html', existing_courses=existing_courses)

@app.route('/backend/create_message', methods=['GET', 'POST'])
def create_message():
    if request.method == 'POST':
        # Handle form submission to create a new message
        courseID = request.form['courseID']
        message = request.form['message']

        # Insert data into the 'course_message' table
        cursor.execute('INSERT INTO course_message (courseID, message) VALUES (%s, %s)', (courseID, message))
        conn.commit()

        # Redirect to the home page or another appropriate page
        return redirect('/backend/create_message')

    else:
        cursor.execute('SELECT courseID FROM course')
        existing_courses = cursor.fetchall()
        existing_courses = [course[0] for course in existing_courses]

        cursor.execute('SELECT * FROM course_message')
        existing_messages = cursor.fetchall()

        # Render the create_message.html template for GET requests
        return render_template('create_message.html', existing_courses=existing_courses, existing_messages=existing_messages)

@app.route('/backend/create_note', methods=['GET', 'POST'])
def create_note():
    if request.method == 'POST':
        # Handle form submission to create a new note
        courseID = request.form['courseID']
        note = request.form['note']

        # Insert data into the 'course_note' table
        cursor.execute('INSERT INTO course_note (courseID, note) VALUES (%s, %s)', (courseID, note))
        conn.commit()

        # Redirect to the home page or another appropriate page
        return redirect('/backend/create_note')

    else:
        cursor.execute('SELECT courseID FROM course')
        existing_courses = cursor.fetchall()
        existing_courses = [course[0] for course in existing_courses]

        cursor.execute('SELECT * FROM course_note')
        existing_notes = cursor.fetchall()
        

        # Render the create_note.html template for GET requests
        return render_template('create_note.html', existing_courses=existing_courses, existing_notes=existing_notes)

if __name__ == '__main__':
    app.run(debug=True)
