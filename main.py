import json

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
DEBUG = True
if DEBUG:
    CORS(app)

GLOBAL_TODO = [
    {
        'id': 0,
        'name': 'do the barrel roll',
        'checked': True
    },
    {
        'id': 1,
        'name': 'fap fap',
        'checked': False
    },
    {
        'id': 2,
        'name': 'watch memes',
        'checked': True
    }
]
MAX_ID = 2


@app.route('/')
def hello_world():
    return "<p>Hello, World!</p>"


@app.route('/todo', methods=['GET', 'POST'])
def get_todo():
    if request.method == 'POST':
        global MAX_ID
        MAX_ID += 1
        GLOBAL_TODO.append({
            'id': MAX_ID,
            'name': request.json.get('newItem'),
            'checked': False
        })
    return json.dumps(GLOBAL_TODO)


@app.route('/todo_check', methods=['POST'])
def check_todo():
    search_todo = list(filter(lambda x: x['id'] == request.json.get('checked'), GLOBAL_TODO))
    search_todo[-1]['checked'] = not search_todo[-1]['checked']
    return json.dumps(GLOBAL_TODO)


app.run(port=8000, debug=DEBUG)
