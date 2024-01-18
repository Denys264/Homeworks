const { useState } = React;

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');

  const handleNoteChange = (e) => {
    setCurrentNote(e.target.value);
  };

  const handleSaveNote = () => {
    if (currentNote.trim() !== '') {
      setNotes([...notes, currentNote]);
      setCurrentNote('');
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };


const handleEditNote = (index) => {
  const updatedNote = prompt('Edit note:', notes[index]);
  if (updatedNote !== null) {
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);

    
    fetch(`/api/notes/${index + 1}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: updatedNote }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
};

<ul>
  {notes.map((note, index) => (
    <li key={index}>
      <p>{note}</p>
      <button onClick={() => handleEditNote(index)}>Edit</button>
      <button onClick={() => handleDeleteNote(index)}>Delete</button>
    </li>
  ))}
</ul>


  return (
    <div>
      <h1>Note Manager</h1>
      <textarea
        placeholder="Type your note here..."
        value={currentNote}
        onChange={handleNoteChange}
      ></textarea>
      <button onClick={handleSaveNote}>Save Note</button>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <p>{note}</p>
            <button onClick={() => handleDeleteNote(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
