(function($, window, undefined) {
  var left = 
    [ 
      [40.73661, -74.00967],
      [40.73664, -74.00927],
      [40.73604, -74.00932],
      [40.73602, -74.00969]
    ];

  var right = 
    [ 
      [40.73663, -74.0093],
      [40.73662, -74.0089],
      [40.73609, -74.00891],
      [40.73603, -74.00934]
    ];

  // var leftPoint = [40.73604, -74.00932];
  // var rightPoint = [40.73663, -74.0093];




  Number.prototype.map = function ( in_min , in_max , out_min , out_max ) {
    var _this = this;
    if (this > in_max) { _this = in_max };
    var newNum = ( _this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
    return newNum;
  }

  // var environment = flock.init();
  var synth, 
      environment;
  var play = false;
  $('#startButton').on("click", function () {

    if (!play) {
      play = true;
      environment = flock.init();
      
      synth = flock.synth({
          synthDef: {
              ugen: "flock.ugen.filter.moog",
              cutoff: {
                  ugen: "flock.ugen.sinOsc",
                  id: "cutoff",
                  freq: 1/4,
                  mul: 5000,
                  add: 7000
              },
              resonance: {
                  ugen: "flock.ugen.sinOsc",
                  id: "resonance",
                  freq: 1/4,
                  mul: 1.5,
                  add: 1.5
              },
              source: {
                  ugen: "flock.ugen.lfSaw",
                  freq: {
                      ugen: "flock.ugen.sequence",
                      id: "source",
                      freq: 1/8,
                      loop: 1,
                      list: [220, 220 * 5/4, 220, 220 * 5/2, 220 * 4/3, 110],
                      options: {
                          interpolation: "linear"
                      }
                  }
              },
              mul: 0.7
          }
      });

      environment.start();
      $('#startButton').html('Click for sound OFF');

    } else {
      play = false;
      $('#startButton').html('Click for sound ON');
      environment.stop();
      // synth.set({"mul": 0.0001});
      // console.log(environment);

    }
  });


  
        

  // environment.start();


  // var testPoint = new google.maps.LatLng( , );
  // var testPoint2 = new google.maps.LatLng(, );


	//var myPolygon;
  // Map Center = near sfpc
  var myLatLng = new google.maps.LatLng(40.73631, -74.00933);

  var leftPoint = new google.maps.LatLng(40.73604, -74.00932);
  var rightPoint = new google.maps.LatLng(40.73663, -74.0093);


  // General Options
  var mapOptions = {
    zoom: 19,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.RoadMap
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);


  var leftPolygonCoords = [];
  var rightPolygonCoords = [];
  var latLongs = left;

  $.each(left, function(index) {
    leftPolygonCoords.push(new google.maps.LatLng(left[index][0], left[index][1]))
  });
  // Styling & Controls
  leftPolygon = new google.maps.Polygon({
    paths: leftPolygonCoords,
    draggable: true, // turn off if it gets annoying
    editable: true,
    strokeColor: '#2b6cff',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#2b6cff',
    fillOpacity: 0.35
  });

  $.each(right, function(index) {
    rightPolygonCoords.push(new google.maps.LatLng(right[index][0], right[index][1]))
  });
  // Styling & Controls
  rightPolygon = new google.maps.Polygon({
    paths: rightPolygonCoords,
    draggable: true, // turn off if it gets annoying
    editable: true,
    strokeColor: '#f928ff',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#f928ff',
    fillOpacity: 0.35
  });

  leftPolygon.setMap(map);
  //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
  google.maps.event.addListener(leftPolygon.getPath(), "insert_at", getPolygonCoords);
  //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
  google.maps.event.addListener(leftPolygon.getPath(), "set_at", getPolygonCoords);

  rightPolygon.setMap(map);
  //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
  google.maps.event.addListener(rightPolygon.getPath(), "insert_at", getPolygonCoords);
  //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
  google.maps.event.addListener(rightPolygon.getPath(), "set_at", getPolygonCoords);

  google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
      // console.log(check_is_in_or_out(myLatLng, leftPolygon));
      // console.log(Math.floor(google.maps.geometry.spherical.computeDistanceBetween(testPoint, testPoint2)));

      setupGPStests();
  });

  //Display Coordinates below map
  function getPolygonCoords() {
    var len = myPolygon.getPath().getLength();
    var htmlStr = "";
    for (var i = 0; i < len; i++) {
      htmlStr += "new google.maps.LatLng(" + myPolygon.getPath().getAt(i).toUrlValue(5) + "), ";
      //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
      //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
    }
    document.getElementById('info').innerHTML = htmlStr;
  }
  function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }

  // $('.print-coords').html('mic check');

  function setupGPStests() {

    if ("geolocation" in navigator) {
      /* geolocation is available */
      // console.log('yep');

      // navigator.geolocation.getCurrentPosition(function(position) {
      //   console.log(position);
      //   console.log(position.coords.latitude, position.coords.longitude);
      // });

      var currentLocation;
      var referenceLocation;
      var count = 1;
      var distance = -1;
      var isRight;

      function geo_success(position) {
        $('.print-coords--now').html(position.coords.latitude + ', ' + position.coords.longitude);
        $('.print-coords').val($('.print-coords').val() + position.coords.latitude + ', ' + position.coords.longitude + '\n');


        if (count === 6) {
          // startLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        } else if (count > 6) {
          // For test
          // currentLocation = new google.maps.LatLng(position.coords.latitude + (Math.random() * 0.1), position.coords.longitude);
          currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          if (check_is_in_or_out(currentLocation, rightPolygon)) {
            referenceLocation = rightPoint;
            isRight = true;
          } else if (check_is_in_or_out(currentLocation, leftPolygon)) {
            referenceLocation = leftPoint;
            isRight = false;
          } else {
            alert('out of the box');
          }

          oldDistance = distance;

          // For test
          // distance += 1;

          // For real
          distance = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(referenceLocation, currentLocation));
          // For test
          // isRight = false;
          // distance = 5;
          
          $('.print-distance').html('Distance from start: ' + distance);

          if (play) {
            if (isRight) {
              synth.set({
                  "cutoff.freq": distance.map(0, 50, 0.25, 0.03125),
                  "cutoff.mul": distance.map(0, 50, 5000, 100),
                  "cutoff.add": distance.map(0, 50, 7000, 2000),
                  "resonance.freq": distance.map(0, 50, 0.25, 0.03125),
                  "resonance.add": distance.map(0, 50, 1.5, 5.5),
                  "source.freq": distance.map(0, 50, 0.0000125, 100),
                  "source.list": [164, 164 * 6/4, 164, 164 * 5/2, 164 * 4/3, 440]

              });
            } else {
              synth.set({
                  "cutoff.freq": 6,
                  "cutoff.mul": distance.map(0, 50, 5000, 100),
                  "cutoff.add": distance.map(0, 50, 7000, 2000),
                  "resonance.freq": distance.map(0, 50, 6, 2),
                  "resonance.add": distance.map(0, 50, 1.5, 5.5),
                  "source.freq": distance.map(0, 50, 0.0000125, 2),
                  "source.ugen": 'flock.ugen.square'
              });
              
            }
            
          }

        }
        count +=1;



        // RAMPING - nice to have
        // $('.print-distance').prop('number', oldDistance).animateNumber(
        //   {
        //     number: distance,
        //     // color: 'green', // require jquery.color
        //     // 'font-size': '50px',

        //     // easing: 'easeInQuad', // require jquery.easing

        //     // optional custom step function
        //     // using here to keep '%' sign after number
        //     numberStep: function(now, tween) {
        //       var floored_number = Math.floor(now),
        //           target = $(tween.elem);

        //       console.log(floored_number);

        // synth.set({
        //     "cutoff.freq": distance.map(0, 50, 0.25, 0.03125),
        //     "cutoff.mul": distance.map(0, 50, 5000, 100),
        //     "cutoff.add": distance.map(0, 50, 7000, 2000),
        //     "resonance.freq": distance.map(0, 50, 0.25, 0.03125),
        //     "resonance.add": distance.map(0, 50, 1.5, 5.5),
        //     "source.freq": distance.map(0, 50, 0.0000125, 100)
        // });

        //       target.text(floored_number);
        //       // console.log(floored_number);

        //     }
        //   },
        //   500
        // );

      }

      function geo_error() {
        alert("Sorry, no position available.");
      }

      var geo_options = {
        enableHighAccuracy: true, 
        maximumAge        : 30000, 
        timeout           : 27000
      };

      var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
    } else {
      console.log('nope geolocation available on this device');
      /* geolocation IS NOT available */
    }
  }

  function check_is_in_or_out(marker, polygon){
    return google.maps.geometry.poly.containsLocation(marker, polygon);
  }





}(jQuery, window));