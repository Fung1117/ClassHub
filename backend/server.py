from flask import Flask, request, jsonify
from flask_cors import CORS

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
        if email == "example@example.com" and password == "123456":
            return jsonify({'success': True, 'UID': 1, 'Name': 'Fung'})
        else:
            return jsonify({'success': False})

@app.route('/course', methods=['GET'])
def TimeTable():
    uid = request.args.get('uid')
    courses = [
        { 'day': 'Mon', 'startTime': '8:30', 'endTime': '9:20', 'name': 'Math', 'color': '#ffcccb' },
        { 'day': 'Tue', 'startTime': '9:30', 'endTime': '10:20', 'name': 'English', 'color': '#aaffcc' },
        { 'day': 'Wed', 'startTime': '10:30', 'endTime': '11:20', 'name': 'Physics', 'color': '#bbccff' },
        { 'day': 'Thu', 'startTime': '11:30', 'endTime': '12:20', 'name': 'Chemistry', 'color': '#ffeedd' },
        # Add more courses as needed
    ]
    return jsonify(courses)

@app.route('/messages', methods=['GET'])
def Messages():
    uid = request.args.get('uid')
    messages = [
        {
            "course": "COMP3330",
            "teacher": "Teacher 1",
            "message": "Hello students! Please submit your assignments by the end of this week.",
        },
        {
            "course": "COMP3330",
            "teacher": "Teacher 2",
            "message": "Reminder: There will be a quiz on Monday. Prepare well!",
        },
    ]
    return jsonify(messages)

@app.route('/Time', methods=['GET'])
def Time():
    uid = request.args.get('uid')
    time_data = [100, 200, 300, 400, 150, 200, 10, 100, 200, 300, 400, 150, 200, 10]
    date_data = [
        '11/11', '12/11', '13/11', '14/11', '15/11', '16/11',
        '17/11', '11/10', '12/10', '13/10', '14/10', '15/10',
        '16/10', '17/10'
    ]
    return jsonify(time=time_data, date=date_data)

@app.route('/last-login', methods=['GET'])
def LastLogin():
    uid = request.args.get('uid')
    last_login = '2023-11-01 15:33:00'
    return jsonify({'lastLogin': last_login})

@app.route('/Logout', methods=['POST'])
def Logout():

    pass
if __name__ == '__main__':
    app.run(debug=True)
