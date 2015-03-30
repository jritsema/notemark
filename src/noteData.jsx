var fs = window.requireNode('fs');
var os = window.requireNode('os');
var path = window.requireNode('path');

module.exports = (function () {
  'use strict';

  var directory = './notes';
  var notes = [];

  function getNotesDirectory() {
    return directory;
  }

  function setNotesDirectory(notesDirectory) {
    directory = notesDirectory;
  }

  function getNotes(callback) {
    notes = [];

    //read markdown files from notes directory
    fs.readdir(directory, function(err, files) {
      if (err) throw err;
      for (var i in files) {
        notes.push({ 
          id: i, 
          name: path.basename(files[i], '.md'),
          path: directory + '/' + files[i],
          isNew: false
        });
      }
      callback(notes);
    });
  }

  function getNoteContents(note, callback) {
    //newly created notes don't exist yet on the hardrive
    if (!note.isNew) {
      fs.readFile(note.path, { encoding: 'utf-8' }, function (err, data) {
        if (err) throw err;
        callback(data);
      });
    }
    else {
      callback('New Note' + os.EOL + '==========');
    }
  }

  function saveNoteContents(note, contents, callback) {

    //for new notes:
    //  parse the note contents and use the first line as the file name and title
    //  if the file name already exists, don't overwrite it, instead append a (1)
    if (note.isNew) {
      var lines = contents.split(os.EOL);
      if (lines) {
        note.name = lines[0];
        note.path = directory + '/' + note.name + '.md';
      }
  
      var files = fs.readdirSync(directory);
      var exists = false;
      for (var i in files) {
        if (path.basename(files[i], '.md') == note.name) {
          exists = true;
          break;
        }
      }
      if (exists) {
        note.name = note.name + ' (1)';
        note.path = directory + '/' + note.name + '.md';
      }
    }

    fs.writeFile(note.path, contents, function (err) {
      if (err) throw err;
      note.isNew = false;
      if (callback) callback();
    });
  }

  function addNote(callback) {
    //add a new note to the beginning of the list and reorder
    notes.unshift({
      id: 0,
      name: 'New Note',
      path: directory + '/' + 'New Note.md',
      isNew: true
    });
    
    //update index
    for (var i in notes)
      notes[i].id = i;

    callback(notes);
  }

  function deleteNote(note, callback) {

    //try to delete the file
    fs.unlinkSync(note.path);

    //after delete, remove the note from the notes list
    var index = notes.indexOf(note);
    if (index > -1)
      notes.splice(index, 1);

    //update note id index
    for (var i in notes)
      notes[i].id = i;

    //callback with update notes list
    callback(notes);    
  }  

  return {
    getNotesDirectory: getNotesDirectory,
    setNotesDirectory: setNotesDirectory,
    getNotes: getNotes,
    getNoteContents: getNoteContents,
    saveNoteContents: saveNoteContents,
    addNote: addNote,
    deleteNote: deleteNote
  };

}());