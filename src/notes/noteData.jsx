var fs = window.requireNode('fs');

module.exports = (function () {
  'use strict';

  function getNotes(callback) {

    //read markdown files from notes directory
    fs.readdir('notes', function(err, files) {
      if (err) throw err;
      var results = [];
      for (var i in files) {
        results.push({ id: i, name: files[i].substring(0, (files[i].length-3)) });
      }
      callback(results);
    });
  }

  return {
    getNotes: getNotes
  };

}());