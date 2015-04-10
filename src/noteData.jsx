var fs = window.requireNode('fs');
var os = window.requireNode('os');
var path = window.requireNode('path');

module.exports = (function() {
  'use strict';

  var directory = '/Users/john/Dropbox/notes';
  var notes = [];

  function getNotesDirectory() {
    return directory;
  }

  function setNotesDirectory(notesDirectory) {
    directory = notesDirectory;
  }

  function getNotes(callback) {
    notes = [];
    walk(directory, function (err, files) {
      if (err) throw err;
      if (files) {
        for (var i in files) {
          var item = files[i];
          notes.push({
            id: i, 
            name: path.basename(item.file, '.md'),
            path: item.file,
            isNew: false,
            created: item.stat.birthtime,
            modified: item.stat.mtime
          });
        }
      }
      callback(notes);
    });
  }

  function walk(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
        file = dir + '/' + file;
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function(err, res) {
              results = results.concat(res);
              next();
            });
          } 
          else {
            var temp = {
              file: file,
              stat: stat
            };
            results.push(temp);
            next();
          }
        });
      })();
    });
  };

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