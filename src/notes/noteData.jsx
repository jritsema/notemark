var fs = window.requireNode('fs');
var os = window.requireNode('os');

module.exports = (function () {
  'use strict';

  var directory = 'notes';
  var notes = [];

  function getNotes(callback) {

    //read markdown files from notes directory
    fs.readdir(directory, function(err, files) {
      if (err) throw err;
      for (var i in files) {
        notes.push({ 
          id: i, 
          name: files[i].substring(0, (files[i].length-3)),
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
    fs.writeFile(note.path, contents, function (err) {
      if (err) throw err;
      note.isNew = false;
      if (callback) callback();
    });
  }

  function addNote(callback) {
    //add a new note to the beginning of the list and reorder
    notes.unshift({
      id: -1,
      name: 'New Note',
      path: directory + '/' + 'new.md',
      isNew: true
    });
    
    //update index
    for (var i in notes)
      notes[i].id++;

    callback(notes);
  }

  return {
    getNotes: getNotes,
    getNoteContents: getNoteContents,
    saveNoteContents: saveNoteContents,
    addNote: addNote
  };

}());