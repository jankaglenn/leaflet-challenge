
// Creating the map object
let myMap = L.map("map", {
    center: [27.96044, -82.30695],
    zoom: 3
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Load the GeoJSON data.
  let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

  let earthquakes = new L.LayerGroup();

  let overlays = {
    Earthquakes: earthquakes
  };
  
  // Get the data with d3.
  d3.json(geoData).then(function(data) {
  
 
function getValue(x) {
	return x > 90 ? "#F06A6A" :
	       x > 70 ? "#F0A76A" :
	       x > 50 ? "#F3B94C" :
	       x > 30 ? "#F3DB4C" :
	       x > 10 ? "#E1F34C" :
	     
		       "#B6F34C";
}

 
function style(feature) {
	return {
		"stroke": true,
        radius: feature.properties.mag * 3,
    fillColor: getValue(feature.geometry.coordinates[2]),
    color: "black",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0.8
	};
}


L.geoJson(data, {
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, style(feature));
	},
  
      // Binding a popup to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<strong>" + feature.properties.place + "</strong><br /><br />Magnitude: " +
          feature.properties.mag + "<br /><br />depth: " + feature.geometry.coordinates[2]);
      }
    }).addTo(earthquakes);

    earthquakes.addTo(myMap);

    
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function() {

        let div = L.DomUtil.create("div", "info legend");
        //labels = ["<10", "10-30", "30-50", "50-70", "70-90", "90+"];
        let grades = [-10, 10, 30, 50, 70, 90];
        let colors = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' 
            + colors[1]
            + "></i> " 
            + grades[i] 
            + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
    };

    legend.addTo(myMap);

    return legend;

    });
  
    // // Set up the legend.
    // let legend = L.control({ position: "bottomright" });
    // legend.onAdd = function() {
    //   let div = L.DomUtil.create("div", "info legend");
    //   let limits = geojson.options.limits;
    //   let colors = geojson.options.colors;
    //   let labels = [];
  
    //   // Add the minimum and maximum.
    //   let legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
    //     "<div class=\"labels\">" +
    //       "<div class=\"min\">" + limits[0] + "</div>" +
    //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    //     "</div>";
  
    //   div.innerHTML = legendInfo;
  
    //   limits.forEach(function(limit, index) {
    //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    //   });
  
    //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    //   return div;
    // };
  
    // // Adding the legend to the map
    // legend.addTo(myMap);
  

  
  
  

