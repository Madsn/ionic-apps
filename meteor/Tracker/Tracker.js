Messages = new Meteor.Collection('messages');
Markers = new Meteor.Collection('markers');

if (Meteor.isClient) {
  /// create marker collection

  Meteor.subscribe('markers');

  Template.main.rendered = function() {
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

    var map = L.map('map', {
      doubleClickZoom: false
    }).setView([55.4833, 8.45], 13);

    L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

    map.on('dblclick', function(event) {
      Markers.insert({latlng: event.latlng});
    });

    var query = Markers.find();
    query.observe({
      added: function (document) {
        var marker = L.marker(document.latlng).addTo(map)
          .on('click', function(event) {
            map.removeLayer(marker);
            Markers.remove({_id: document._id});
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

  Template.messages.messages = function(){
    return Messages.find({}, { sort: { time: -1 }});
  };

  Template.input.events = {
    "keydown #message": function(event){
      if(event.which == 13){ // Enter key
        // Submit the form
        var name = document.getElementById('name');
        var message = document.getElementById('message');

        if(name.value != '' && message.value != ''){
          Messages.insert({
            name: name.value,
            message: message.value,
            time: Date.now()
          });

          message.value = '';
        }
      }
    }
  };

  $(function() {
    $(window).resize(function() {
      $('#map').css('height', window.innerHeight - 82 - 45);
    });
    $(window).resize(); // trigger resize event
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
