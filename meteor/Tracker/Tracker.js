Messages = new Meteor.Collection('messages');
Logs = new Meteor.Collection('logs');
Markers = new Meteor.Collection('markers');

if (Meteor.isClient) {
  /// create marker collection

  Meteor.subscribe('markers');
  Meteor.subscribe('logs');

  var scrollToBottom = function(_id){
    var scrollDiv = document.getElementById(_id);
    if (scrollDiv) {
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
      console.log('scrolling to bottom', _id);
    }
  };

  Template.main.rendered = function() {
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

    var map = L.map('map', {
      doubleClickZoom: false
    }).setView([55.4833, 8.45], 13);

    L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

    map.on('dblclick', function(event) {
      if (Session.get('username') != null) {
        Markers.insert({latlng: event.latlng});
        Logs.insert({latlng: event.latlng, time: Date.now(), user: Session.get('username'), new: true});
      }
    });

    var query = Markers.find();
    query.observe({
      added: function (document) {
        var marker = L.marker(document.latlng).addTo(map)
          .on('click', function(event) {
            map.removeLayer(marker);
            Markers.remove({_id: document._id});
            Logs.insert({latlng: event.latlng, time: Date.now(), user: Session.get('username'), new: false});
          });
      },
      removed: function (oldDocument) {
        layers = map._layers;
        var key, val;
        for (key in layers) {
          val = layers[key];
          if (val._latlng) {
            if (val._latlng.lat === oldDocument.latlng.lat && val._latlng.lng === oldDocument.latlng.lng) {
              map.removeLayer(val);
            }
          }
        }
      }
    });
  };

  Template.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).fromNow();
  });

  Template.messages.messages = function(){
    return Messages.find({}, { sort: { time: 1 }});
  };

  Template.log.logs = function(){
    return Logs.find({}, { sort: {time: 1}});
  };

  Template.input.events = {
    "keydown #message": function(event){
      if(event.which == 13){ // Enter key
        // Submit the form
        var message = document.getElementById('message');

        if(message.value != ''){
          Messages.insert({
            name: Session.get('username'),
            message: message.value,
            time: Date.now()
          });

          message.value = '';
        }
      }
    }
  };

  Template.chat.name = function(){
    return Session.get('username');
  };

  Template.login.events = {
    "keydown #name": function(event){
      if(event.which == 13){ // Enter key
        var name = document.getElementById('name');
        Session.set('username', name.value);
      }
    }
  };

  $(function() {
    $(window).resize(function() {
      var height = window.innerHeight - 175;
      $('#map').css('height', height);
      $('#messages').css('height', height/2 - 70);
      $('#log').css('height', height/2 - 130);
      scrollToBottom('messages');
      scrollToBottom('log');
    });
    $(window).resize(); // trigger resize event
    setTimeout(function() {
      scrollToBottom('messages');
      scrollToBottom('log');
    }, 1000);
  });

  Messages.after.insert(function(){
    scrollToBottom('messages');
  });

  Logs.after.insert(function(){
    scrollToBottom('log');
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish("markers", function () {
    return Markers.find();
  });
}
