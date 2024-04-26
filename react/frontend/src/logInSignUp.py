from flask import Flask, render_template, request, redirect, url_for, jsonify
import pymongo
from pymongo import MongoClient
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets
import re
import datetime
import logging
from logging.handlers import RotatingFileHandler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # Allow all origins (for development)
client = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = client["UsersDatabase"]
mycol = mydb["UserInfo"]
mycol2 = mydb["LoginInfo"]

# Setup logging
formatter = logging.Formatter('%(asctime)s - %(message)s')
handler = RotatingFileHandler('login_attempts.log', maxBytes=10000, backupCount=1)
handler.setFormatter(formatter)
app.logger.addHandler(handler)
app.logger.setLevel(logging.INFO)

if mycol.count_documents({}) == 0:
    userInitialize = [{"Username": "aflorCSUN", "Password": "123456", "email": "aaron.flores.79@mycsun.edu"}]
    mycol.insert_many(userInitialize)
    
# Check for uniqueness of username and email address
def check_uniqueness(username, email):
    existing_user = mycol.find_one({'$or': [{'Username': username}, {'email': email}]})
    if existing_user:
        return False  # User or email already exists
    return True  # Username and email are unique

# Validate email format
def validate_email(email):
    # Regular expression pattern for email validation
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

# Function to send verification email
def send_verification_email(email, verification_code):
    sender_email = 'aicuratestore@gmail.com'  # Replace with your email
    sender_password = '!pleasepass!90%'       # Replace with your password

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = email
    message['Subject'] = 'Email Verification'

    body = f'Your verification code is: {verification_code}'
    message.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(message)
        server.quit()
        return True
    except Exception as e:
        print("Error sending verification email:", e)
        return False


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    app.config['JSON_SORT_KEYS'] = False
    username = request.json.get('username')
    password = request.json.get('password')
    print(f"Received username: {username}, password: {password}")  # Add this line
    if username is None or password is None:
        print("Username or password is missing in the request")
        error_message = 'Invalid credentials. Please try again.'
        return jsonify({'success': False, 'error': error_message})

    user = mycol.find_one({'Username': re.compile(f'^{username}$', re.IGNORECASE), 'Password': password})
    if user:
        app.logger.info(f"Successful login attempt for user '{username}' from IP address {request.remote_addr} at {datetime.datetime.now()}")
        mycol2.insert_one({'UserName': username, 'IPAddress': request.remote_addr, 'Date': datetime.datetime.now(), 'Status': 'successful'})
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        app.logger.info(f"Unsuccessful login attempt for user '{username}' from IP address {request.remote_addr} at {datetime.datetime.now()}")
        mycol2.insert_one({'UserName': username, 'IPAddress': request.remote_addr, 'Date': datetime.datetime.now(), 'Status': 'unsuccessful'})
        error_message = 'Invalid credentials. Please try again.'
        return jsonify({'success': False, 'error': error_message})

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        
        # Check if username and email are unique
        if not check_uniqueness(username, email):
            error_message = 'Username or email already exists. Please choose another.'
            return render_template('index.html', signup_error=error_message)
        
        # Validate email format
        if not validate_email(email):
            error_message = 'Invalid email format. Please enter a valid email address.'
            return render_template('index.html', signup_error=error_message)

        verification_code = secrets.token_hex(4)  # Generate a random verification code
        if send_verification_email(email, verification_code):
            return render_template('index.html', message='Email verification code sent!')
        else:
            error_message = 'Failed to send verification email. Please try again later.'
            return render_template('index.html', signup_error=error_message)
    else:
        return render_template('index.html')

@app.route('/verify', methods=['POST'])
def verify():
    entered_code = request.form['verification_code']
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']
    if entered_code == request.form['verification_code']:
        mycol.insert_one({'Username': username, 'Password': password, 'email': email})
        return redirect(url_for('index'))
    else:
        error_message = 'Invalid verification code. Please try again.'
        return render_template('index.html', signup_error=error_message)

if __name__ == '__main__':
    app.run(debug=True)