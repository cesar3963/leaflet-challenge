var myMap = L.map("map", {
  center: [45.7749, -100.4194],
  zoom: 4
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url, function(response) {

  // console.log(response.features[9].geometry.coordinates);
  
  var heatArray = [];

  for (var i = 0; i < response.features.length; i++) {
    var location = response.features[i].geometry;
    // console.log(location);
    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
    
  }
  setInterval(heatArray, 1000);

  var heat = L.heatLayer(heatArray, {
    radius: 25,
    blur: 1
  }).addTo(myMap);
  // console.log(heatArray)
});

