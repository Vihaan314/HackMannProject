# Mind Garden

A place to improve your mental health, with features from mood tracking, to mindfulness exercises, and even a one-on-one counselor to resolve your problems.

<b>To run Mind Garden locally:</b>

1. Clone the repository
2. Install dependencies through ```pip install -r requirements.txt```
3. Navigate to the main.py file and run it
4. The server will be running on your localhost:5000, which you should be able to acesss and use the website from

<b>How it works:</b>

<ul>
    <li>Uses HTML / CSS for the frontend</li>
    <li>Python's Flask for the backend</li>
    <li>JavaScript for communicating between the backend and frontend</li>
    <li>Flask SQLAlchemy for the database</li>
</ul>

<b>Other details:</b>

<ul>
    <li>For the mood tracking, to see the new entry saved you will need to click on that page in the sidebar again to refresh it, and do the same when saving a counseling chat</li>
    <li>Uses that OpenAI API for the counseling feature (chat completions).</li>
    <li>A default user with <strong>Username: </strong>Testing, <strong>Password: </strong>testing, for testing purposes. You can directly login with these details or create a new account.</li>
    <li>A temporary API key will be provided in the "Project Description" section of the Google form which you can use for the app. You should create a .env file in the main directory, and enter: <b>OPENAI-GPT-KEY={the OpenAI key in the project description}</b>. It will be deleted after Thursday.
</ul>
