const fs = require("fs").promises;
const express = require("express");

const app = express();
const port = 5000;
const notesFilePath = 'notes.json';

app.use(express.json());

app.get('/notes/:id', async (req, res) => {
  let noteId = parseInt(req.params.id)
  console.log(noteId)
  try {
    const content = await fs.readFile(notesFilePath, 'utf-8');
    const notes = JSON.parse(content);

    for(let i = 0; i < notes.length; i++){
      const element = notes[i];
      if(element.id === noteId){
        res.json(element);
      }
  }
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});



app.post('/notes', async (req, res) => {
  // let newNote = req.body;
  
  try {
    const content = await fs.readFile(notesFilePath, 'utf-8');
    const notes = JSON.parse(content);
    const newNote = req.body;
    // newNote.id = notes.length + 1;
    notes.push(newNote); 
    let noteString = JSON.stringify(notes)
    await fs.writeFile(notesFilePath, noteString, (err)=>{
      if(err){
        console.log(err);
      }
    });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
