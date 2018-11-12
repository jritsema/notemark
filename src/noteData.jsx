var fs = window.requireNode('fs');
var os = window.requireNode('os');
var path = window.requireNode('path');
var CryptoJS = require("crypto-js");
var ENCRYPTION_HEADER = '-----ENCRYPTED-----';

module.exports = (function() {
  'use strict';

  //read the notes directory from config.json
  //var configContents = fs.readFileSync('./config.json', 'utf8');
  //var config = JSON.parse(configContents);
  //var directory = config.notesDirectory;

  var directory = '';

  var notes = [];

  function getNotesDirectory() {
    return directory;
  }

  function setNotesDirectory(notesDirectory) {
    directory = notesDirectory;
  }

  var password = "";

  function getPassword() {
    return password;
  }

  function setPassword(value) {
    password = value;
  }

  function getNotes(callback) {
    notes = [];
    walk(directory, function (err, files) {
      if (err) throw err;
      if (files) {
        for (var i in files) {
          var item = files[i];

          //only bring in .md files
          var extension = '.md';
          if (path.extname(item.file) === extension) {
            notes.push({
              id: i,
              name: path.basename(item.file, extension),
              path: item.file,
              isNew: false,
              created: item.stat.birthtime,
              modified: item.stat.mtime,
              encrypted: false
            });
          }
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
    if (note && !note.isNew) {
      fs.readFile(note.path, { encoding: 'utf-8' }, function (err, data) {
        if (err) throw err;

        //is this note encrypted?
        var newData = data;
        if (data.startsWith(ENCRYPTION_HEADER)) {          
          note.encrypted = true;
          if (password === "") {
            callback("Please set password on Options tab.");
            return;
          }
          //take line 2
          var encryptedBits = data.split("\n")[1];
          var bytes  = CryptoJS.AES.decrypt(encryptedBits, password);
          try {
            newData = bytes.toString(CryptoJS.enc.Utf8);
          }
          catch (err) {
            console.error(err);
            var msg = err;
            if (err.message === "Malformed UTF-8 data")  {
              msg = "Invalid password";
            }
            callback(msg);
            return;
          }
        }

        callback(null, newData);
      });
    }
    else {
      callback(null, 'New Note' + os.EOL + '==========');
    }
  }

  function saveNoteContents(note, contents, encrypt, callback) {

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

    note.encrypted = encrypt;

    //do we need to encrypt?
    var newContents = contents;
    if (encrypt) {
      newContents = ENCRYPTION_HEADER;
      newContents += os.EOL;
      newContents += CryptoJS.AES.encrypt(contents, password);
    }

    fs.writeFile(note.path, newContents, function (err) {
      if (err) throw err;
      note.isNew = false;
      if (callback) callback();
    });
  }

  function addNote() {
    //add a new note to the beginning of the list and reorder
    notes.unshift({
      id: 0,
      name: 'New Note',
      path: directory + '/' + 'New Note.md',
      isNew: true,
    });

    //update index
    for (var i in notes)
      notes[i].id = i;

    return notes;
  }

  function deleteNote(note) {

    //try to delete the file
    fs.unlinkSync(note.path);

    //after delete, remove the note from the notes list
    for (var i = notes.length-1; i > -1; i--) {
      if (notes[i].path === note.path)
        notes.splice(i, 1);
    };

    //update note id index
    for (var i in notes)
      notes[i].id = i;

    //callback with update notes list
    return notes;
  }

  function search(searchText, callback) {
    //execute search after 3 characters have been typed
    if (searchText && searchText.length >= 3) {

      //search path for matching text which includes both directory and file name
      var results = [];
      notes.forEach(function(item) {
        if (item.path.toUpperCase().indexOf(searchText.toUpperCase()) > -1) {
          //make a copy of the object so that it can be updated safely
          var temp = JSON.stringify(item);
          results.push(JSON.parse(temp));
        }
      });

      //update note id index
      for (var i in results)
        results[i].id = i;

      callback(results);
    }
    else //no search text specified, so return all notes
      callback(notes);
  }

  return {
    getNotesDirectory: getNotesDirectory,
    setNotesDirectory: setNotesDirectory,
    getNotes: getNotes,
    getNoteContents: getNoteContents,
    saveNoteContents: saveNoteContents,
    addNote: addNote,
    deleteNote: deleteNote,
    search: search,
    getPassword: getPassword,
    setPassword: setPassword
  };

}());
