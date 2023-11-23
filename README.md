# database-project

## Error:
```shell
  pip.exe install opencv-contrib-python --user
```

## Prerequisites
- Node.js: Install Node.js on your machine. You can download it from the official website: [Node.js Downloads](https://nodejs.org)

## Instructions

### Clone the repository

1. Run the following command to clone the repository:
```shell
   git clone https://github.com/Fung1117/database-project.git
```
2. Navigate to the project directory
```shell
  cd ./frontend
```
3. Run the following command to install the project dependencies:

   - For Windows:
     ```shell
     npm install
     ```

   - For Mac:
     ```shell
     yarn install
     ```

   Note: Use `npm install` on Windows and `yarn install` on Mac.

### Run the development server
1. After the dependencies are installed, run the following command to start the development server:
   
   - For Windows:
     ```shell
     npm run dev
     ```

   - For Mac:
     ```shell
     yarn run dev
     ```
2. The development server will start, and you will see the URL where your app is running, http://localhost:5173.

### Initialize the database
1. Navigate to backend directory:
```shell
  cd ../backend
```
2. We use local MySQL as database. Set "DB_PASSWORD" in the .env file to your password.
3. Run the database.py file:
```shell
  python database.py
```

### Start the backend server
1. Install the required packages:
```shell
  pip install -r requirements.txt
```
2. Start the Flask server:
```shell
  python server.py
```
