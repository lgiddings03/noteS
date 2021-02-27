
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));


app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));


app.use(express.static(__dirname + '/public'));


app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    newNote.id = uuidv4();
    console.log(newNote);

    db.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {

        if (err) throw err;
        console.log("New note has been added!");

    });

    res.send(newNote);
});

 
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));