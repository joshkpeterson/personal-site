(function($, window, undefined) {
  // var latLongs = [
  //   [ 44.958954, -93.275488],
  //   [ 44.958913, -93.275776],
  //   [ 44.958931, -93.275783],
  //   [ 44.959029, -93.27572]
  // ];

  var latLongs = 
    [ 
      [44.95907,-93.27547],
      [44.95886,-93.27546],
      [44.95888,-93.27582],
      [44.95894,-93.27582],
      [44.95911,-93.27583]
    ];

  console.log(latLongs);

  var testPoint = new google.maps.LatLng(44.959003 , -93.275644);
  // var testPoint = new google.maps.LatLng(44.967895, -93.275104);


	//var myPolygon;
  // Map Center
  var myLatLng = new google.maps.LatLng(44.959142, -93.275104);
  // General Options
  var mapOptions = {
    zoom: 17,
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

  google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
      console.log(check_is_in_or_out(testPoint));
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


  // if ("geolocation" in navigator) {
  //   /* geolocation is available */
  //   // console.log('yep');

  //   // navigator.geolocation.getCurrentPosition(function(position) {
  //   //   console.log(position);
  //   //   console.log(position.coords.latitude, position.coords.longitude);
  //   // });

  //   function geo_success(position) {
  //     $('.print-coords--now').html(position.coords.latitude + ', ' + position.coords.longitude);
  //     $('.print-coords').val($('.print-coords').val() + position.coords.latitude + ', ' + position.coords.longitude + '\n');
  //   }

  //   function geo_error() {
  //     alert("Sorry, no position available.");
  //   }

  //   var geo_options = {
  //     enableHighAccuracy: true, 
  //     maximumAge        : 30000, 
  //     timeout           : 27000
  //   };

  //   var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
  // } else {
  //   console.log('nope geolocation available on this device');
  //   /* geolocation IS NOT available */
  // }

  function check_is_in_or_out(marker){
    return google.maps.geometry.poly.containsLocation(marker, myPolygon);
  }





}(jQuery, window));