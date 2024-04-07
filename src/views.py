from flask import Blueprint, render_template, request, flash, jsonify, session, redirect, url_for
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, Message
from . import db

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
@login_required
def index():    
    if request.method == "POST":
        pass  # Handle POST request if necessary

    return render_template("index.html", user=current_user, userName=current_user.first_name)

@views.route('/counseling', methods=['GET', 'POST'])
@login_required
def counseling():
    print("hi")
    if request.method == 'POST':
        # Process any POST request data here
        pass

    return render_template('counseling.html', user=current_user)
