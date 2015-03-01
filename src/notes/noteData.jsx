module.exports = (function () {

  'use strict';

  var notes = [];

  function getNotes() {
    return [
      { id: 1, name: 'ZXC' },
      { id: 2, name: 'asdf' }
    ];
  }

  return {
    getNotes: getNotes
  };

}());