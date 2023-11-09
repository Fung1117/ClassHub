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
        login_data.get('image')
        # Implement your face login verification here

        if True:
            return jsonify({'success': True, 'UID': 1})
        else:
            return jsonify({'success': False})
    else:
        password = login_data.get('password')

        if email == "example@example.com" and password == "123456":
            return jsonify({'success': True, 'UID': 1})
        else:
            return jsonify({'success': False})

@app.route('/Time', methods=['GET'])
def Time():
    time_data = [100, 200, 300, 400, 150, 200, 10, 100, 200, 300, 400, 150, 200, 10]
    date_data = [
        '11/11', '12/11', '13/11', '14/11', '15/11', '16/11',
        '17/11', '11/10', '12/10', '13/10', '14/10', '15/10',
        '16/10', '17/10'
    ]
    return jsonify(time=time_data, date=date_data)


if __name__ == '__main__':
    app.run(debug=True)
