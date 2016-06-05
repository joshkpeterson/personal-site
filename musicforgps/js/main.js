(function($, window, undefined) {
  var latLongs = [
    [ 44.958954, -93.275488],
    [ 44.958913, -93.275776],
    [ 44.958931, -93.275783],
    [ 44.959029, -93.27572
],    [ 44.959074, -93.275528],
    [ 44.959116, -93.275356],
    [ 44.959142, -93.275104],
    [ 44.959143, -93.274848],
    [ 44.959137, -93.274648],
    [ 44.959142, -93.274442],
    [ 44.959142, -93.274219],
    [ 44.959143, -93.273991],
    [ 44.959148, -93.273779],
    [ 44.959156, -93.273564],
    [ 44.959161, -93.273318],
    [ 44.959148, -93.27311
],    [ 44.959148, -93.272915],
    [ 44.959057, -93.272877],
    [ 44.958917, -93.272875],
    [ 44.958777, -93.272877],
    [ 44.958626, -93.272874],
    [ 44.958518, -93.272873],
    [ 44.958345, -93.27287
],    [ 44.958189, -93.272885],
    [ 44.958026, -93.272911],
    [ 44.957906, -93.272942],
    [ 44.957758, -93.272968],
    [ 44.957548, -93.272889],
    [ 44.957346, -93.272877],
    [ 44.957357, -93.273104],
    [ 44.957365, -93.27335
],    [ 44.957379, -93.273548],
    [ 44.957361, -93.273775],
    [ 44.957331, -93.274293],
    [ 44.957327, -93.27453
],    [ 44.957369, -93.274732],
    [ 44.957382, -93.27496
],    [ 44.957399, -93.275157],
    [ 44.957413, -93.27522
],    [ 44.957441, -93.275237],
    [ 44.957442, -93.275252],
    [ 44.957503, -93.275243],
    [ 44.957449, -93.275257],
    [ 44.957466, -93.275275],
    [ 44.957462, -93.275293],
    [ 44.957431, -93.275235],
    [ 44.957464, -93.27529
],    [ 44.957316, -93.275419],
    [ 44.957462, -93.275291],
    [ 44.95721, -93.275288
],    [ 44.957653, -93.275417],
    [ 44.957818, -93.275408],
    [ 44.957963, -93.275391],
    [ 44.958116, -93.275351],
    [ 44.958269, -93.275331],
    [ 44.958456, -93.275321],
    [ 44.958625, -93.275322],
    [ 44.959138, -93.275382],
    [ 44.959189, -93.275607],
    [ 44.959172, -93.275821],
    [ 44.958958, -93.275331],
    [ 44.958954, -93.275488],
    [ 44.958983, -93.275769],
  ];

  console.log(latLongs);

	//var myPolygon;
  // Map Center
  var myLatLng = new google.maps.LatLng(44.959142, -93.275104);
  // General Options
  var mapOptions = {
    zoom: 12,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.RoadMap
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);


  var polygonCoords = [];

  $.each(latLongs, function(index) {
    polygonCoords.push(new google.maps.LatLng(latLongs[index][0], latLongs[index][1]))
  });
  // Styling & Controls
  myPolygon = new google.maps.Polygon({
    paths: polygonCoords,
    draggable: true, // turn off if it gets annoying
    editable: true,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });

  myPolygon.setMap(map);
  //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
  google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
  //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
  google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);

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


  if ("geolocation" in navigator) {
    /* geolocation is available */
    // console.log('yep');

    // navigator.geolocation.getCurrentPosition(function(position) {
    //   console.log(position);
    //   console.log(position.coords.latitude, position.coords.longitude);
    // });

    function geo_success(position) {
      $('.print-coords--now').html(position.coords.latitude + ', ' + position.coords.longitude);
      $('.print-coords').val($('.print-coords').val() + position.coords.latitude + ', ' + position.coords.longitude + '\n');
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


}(jQuery, window));