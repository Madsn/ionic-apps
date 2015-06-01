'use strict';

var log = require('debug')('boot:01-load-testdata');

module.exports = function(app) {

  if (app.dataSources.db.name !== 'Memory' && !process.env.INITDB) {
    return;
  }

  log('Seeding DB');

  var Playlist = app.models.Playlist;
  var Song = app.models.Song;

  Playlist.create({name:'Playlist 1'});
  Song.create({title:'Song 1 title', artist:'Song 1 artist'});
};
