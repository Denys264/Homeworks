from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///notes.db'
db = SQLAlchemy(app)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/notes', methods=['GET', 'POST'])
def notes():
    if request.method == 'GET':
        all_notes = Note.query.all()
        notes_list = [{'id': note.id, 'content': note.content} for note in all_notes]
        return jsonify(notes_list)
    elif request.method == 'POST':
        data = request.json
        new_note = Note(content=data['content'])
        db.session.add(new_note)
        db.session.commit()
        return jsonify({'message': 'Note added successfully'})

@app.route('/api/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    note_to_delete = Note.query.get(note_id)
    if note_to_delete:
        db.session.delete(note_to_delete)
        db.session.commit()
        return jsonify({'message': 'Note deleted successfully'})
    else:
        return jsonify({'message': 'Note not found'}), 404

@app.route('/api/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    note_to_update = Note.query.get(note_id)
    if note_to_update:
        data = request.json
        note_to_update.content = data['content']
        db.session.commit()
        return jsonify({'message': 'Note updated successfully'})
    else:
        return jsonify({'message': 'Note not found'}), 404

if __name__ == '__main__':
    
    with app.app_context():
        db.create_all()
    app.run(debug=True)
