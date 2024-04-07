from flask import Blueprint, render_template, request, flash, jsonify, session, redirect, url_for
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, Message, Conversation
from . import db

import os
import openai

views = Blueprint('views', __name__)

##Main page render

@views.route('/', methods=['GET', 'POST'])
@login_required
def index():    
    return render_template("index.html", user=current_user, userName=current_user.first_name)


##Counseling page routing

#Counseling page render
@views.route('/counseling')
def counseling():
    return render_template('counseling.html')

#Message handling - user message and api response
@views.route('/counseling/chat', methods=['POST'])
def chat():
    client = openai.OpenAI(api_key=os.getenv('OPENAI-GPT-KEY'))
    user_message = request.json['message']
    conversation = session.get('conversation', [])

    if not conversation:
        initial_system_message = "You are a mental health therapist who spreads mental health awareness. You will start a conversation with somebody who wants your help to fix their problems, and keep your responses relatively short."
        conversation.append({'role': 'system', 'content': initial_system_message})

    conversation.append({'role': 'user', 'content': user_message})
    
    response = client.chat.completions.create(
        model='gpt-4-turbo-preview',
        messages=conversation,
        temperature=0,
        max_tokens=100
    )

    ai_message = response.choices[0].message.content
    conversation.append({'role': 'system', 'content': ai_message})
    session['conversation'] = conversation

    return jsonify({'ai_response': ai_message})

#Saving a conversation
@views.route('/counseling/save', methods=['POST'])
def save_conversation():
    conversation = Conversation(user_id=current_user.id)
    db.session.add(conversation)
    db.session.commit() 

    for msg in session.get('conversation', []):
        new_message = Message(data=msg['content'], conversation_id=conversation.id)
        db.session.add(new_message)

    db.session.commit()
    session['conversation'] = [] 
    flash('Saved conversation', category='success')
    return jsonify({'status': 'Conversation saved'})

#Getting user counseling history
@views.route('/counseling/history')
def get_conversation_history():
    conversations = Conversation.query.filter_by(user_id=current_user.id).all()
    formatted_conversations = [
        {
            "id": convo.id,
            "date": convo.date.strftime('%Y-%m-%d %H:%M:%S'),
            "snippet": convo.messages[1].data[:50] if convo.messages else "No messages"
        } 
        for convo in conversations
    ]
    return jsonify(formatted_conversations)

#Specific past conversation
@views.route('/counseling/conversation/<int:convo_id>')
def get_conversation_messages(convo_id):
    conversation = Conversation.query.get_or_404(convo_id)
    messages = [
        {'role': 'user' if i % 2 == 0 else 'system', 'content': msg.data} 
        for i, msg in enumerate(conversation.messages)
    ]

    session['conversation'] = messages[1:] if len(messages) > 1 else messages

    return jsonify([msg['content'] for msg in messages[1:]])

#Create new conversation
@views.route('/counseling/start_new', methods=['POST'])
def start_new_conversation():
    session['conversation'] = []  
    return jsonify({'status': 'New conversation started'})


##Mood tracking routing

#Main mood tracking page
@views.route('/mood_tracking')
def mood_tracking():
    return render_template('mood_tracking.html')