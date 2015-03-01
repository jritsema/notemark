notemark
=========

Mostly an experimental app to learn react.js.  Goal for this project is to be a cross-platform desktop app to manage notes.  Notes are just markdown files on your hard drive (Dropbox for syncing?).  

Here is an initial set of features:

- browse notes using clean, github flavored markdown
- edit notes
- search for notes based on various metadata including file name and tags
- delete notes
- tell the app where your note directory is

The app is built using:

- cloned from [react-bootstrap-starter](https://github.com/jritsema/react-bootstrap-starter)
- [react.js](http://facebook.github.io/react/) (UI library)
- [react-bootstrap](http://react-bootstrap.github.io) (bootstrap components)
- [browserify](http://browserify.org) + [reactify](https://github.com/andreypopp/reactify) + [nodemon](http://nodemon.io) (jsx build pipeline)
- [node-webkit](http://nwjs.io) (now nw.js)

To get started:

- optionally get [react tools for Sublime](https://github.com/reactjs/sublime-react)
- clone repo
- `$ npm install` to install tooling
- `$ npm run build` to build
- `$ npm run watch` to rebuild when jsx files change 
