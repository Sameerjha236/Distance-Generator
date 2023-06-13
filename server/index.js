import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const getLocation = (location) => {
  return new Promise((resolve, reject) => {
    var api_key = "53bf67f35db144e582a3cdbd036d6d7e";
    var api_url = "https://api.opencagedata.com/geocode/v1/json";
    var request_url =
      api_url +
      "?" +
      "key=" +
      api_key +
      "&q=" +
      encodeURIComponent(location) +
      "&pretty=1" +
      "&no_annotations=1";

    axios
      .get(request_url)
      .then(function (response) {
        var data = response.data;
        var coordinates = data.results[0].geometry;
        resolve(coordinates);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateDistance(location1, location2) {
  const R = 6371; // Radius of the Earth in kilometers
  const lat1 = location1.lat;
  const lon1 = location1.lng;
  const lat2 = location2.lat;
  const lon2 = location2.lng;

  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

app.post("/api/location", async (req, res) => {
  const sor = req.body.sor;
  const destinations = [
    "Darbhanga",
    "New Delhi",
    "New York",
    "Kanpur",
    "Lucknow",
  ];
  const distances = [];
  try {
    const sorCord = await getLocation(sor);
    for (const dest of destinations) {
      const destCord = await getLocation(dest);
      const distance = calculateDistance(sorCord, destCord).toFixed(2);
      distances.push({ location: dest, distance: distance });
    }

    distances.sort((a, b) => a.distance - b.distance);
    console.log(distances);
    res.send(distances);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).send("Error occurred");
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
