from flask import Flask, request, jsonify
# ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
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


if __name__ == '__main__':
    app.run(debug=True)
