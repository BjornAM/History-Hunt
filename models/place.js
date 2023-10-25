export default class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = new Date().toUTCString + Math.random().toString;
  }
}

// Exempel

const liseberg = new Place("Liseberg", "image-URL", "Lisebergsvägen", {
  lat: 0.98,
  lng: 1.8,
});

liseberg.title; // Liseberg
liseberg.location;
