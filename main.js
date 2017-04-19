export default class POI {
  constructor(latitude, longitude, value) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.value = value;
    this.radius = 6371; // radius of the earth in km
  }

  deg2rad(degrees) {
    return degrees * (Math.PI / 180);
  }

  getDistanceFromInKm(poi) {
    const differenceLatitude = this.deg2rad(poi.latitude - this.latitude);
    const differenceLongitude = this.deg2rad(poi.longitude - this.longitude);
    const a = Math.sin(differenceLatitude / 2) *
        Math.sin(differenceLatitude / 2) +
        Math.cos(this.deg2rad(this.latitude)) *
        Math.cos(this.deg2rad(poi.latitude)) *
        Math.sin(differenceLongitude / 2) *
        Math.sin(differenceLongitude / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return this.radius * c;
  }

  getLongitudeDifferenceAtLatitude(distance) {
    const hav_dr = (1 - Math.cos(distance / this.radius)) / 2;
    const newLat = (Math.acos(1 - 2 * hav_dr) + this.deg2rad(this.latitude)) *
        (180 / Math.PI);

    return newLat - this.latitude;
  }

  getLatDifferenceAtLon(distance) {
    const rLat = this.deg2rad(this.latitude);
    const hav_dr = (1 - Math.cos(distance / this.radius)) / 2;
    const newLon = (this.deg2rad(this.longitude) +
        Math.acos(1 - ((2 * hav_dr) / (Math.cos(rLat) * Math.cos(rLat))))) *
        (180 / Math.PI);

    return newLon - this.longitude;
  }
};