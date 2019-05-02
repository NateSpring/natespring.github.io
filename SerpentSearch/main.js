function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 38.1916, lng: -120.8291 },
    zoom: 11,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];


  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: '/SerpentSearch/media/RS-Icon.png',
        scaledSize: new google.maps.Size(75, 75), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(50, 50) // anchor
      };


      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  //Populate map with previous sightings & Manual add marker
  //Setting Icon image
  var icon = {
    url: '/SerpentSearch/media/RS-Icon.png',
    scaledSize: new google.maps.Size(75, 75), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(45, 75) // anchor
  };

  //Manually adding spottings with click.
  google.maps.event.addListener(map, 'click', function (event) {
    addMarker(event.latLng, map);
  });
  //Function to add a marker.
  function addMarker(location, map) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: icon,
      title: 'Rattlesnake Sighting'
    });
  }

  //Previous spottings.
  var locations = [
    { lat: 38.159396, lng: -120.814528 },
    { lat: 38.262547, lng: -120.918577 },
    { lat: 38.164643, lng: -120.865040 },
    { lat: 38.136126, lng: -120.842466 },
    { lat: 38.151179, lng: -120.835772 },
  ]
  //Looping through previous spottings.
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i]),
      map: map,
      icon: icon
    })
  };

}
