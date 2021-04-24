const fs = require('fs');
const util = require('util');
const path = require("path");
const readFile = util.promisify(fs.readFile);
const uuid = require('uuid-random');

module.exports = (app) => {

    app.get("/api/notes", function(req, res) {
        readFile(path.join(__dirname + '/../db/db.json'), 'utf-8').then((notes) => {
            let currentNotes = [];
            try {
                currentNotes = JSON.parse(notes);
                console.log(notes);
                res.json(currentNotes);
            } catch(err) {
                res.json([]);
            }
        })
    });

    app.post("/api/notes", function(req, res) {
        readFile(path.join(__dirname + '/../db/db.json'), 'utf-8').then((notes) => {
            const currentNotes = JSON.parse(notes) ;

            currentNotes.push({title:req.body.title, text:req.body.text, id: uuid()})
            fs.writeFile(path.join(__dirname + '/../db/db.json'), JSON.stringify(currentNotes), (err)=> {
                 res.json(200)
            })
        })
    });

    app.delete("/api/notes/:id", function(req, res) {
        readFile(path.join(__dirname + '/../db/db.json'), 'utf-8').then((notes) => {
            let currentNotes = JSON.parse(notes) ;

           currentNotes = currentNotes.filter(note => note.id != req.params.id)
            fs.writeFile(path.join(__dirname + '/../db/db.json'), JSON.stringify(currentNotes), (err)=> {
                 res.json(200)
            })
        })
    });


}