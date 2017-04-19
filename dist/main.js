"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var POI = function () {
  function POI(latitude, longitude, value) {
    _classCallCheck(this, POI);

    this.latitude = latitude;
    this.longitude = longitude;
    this.value = value;
    this.radius = 6371; // radius of the earth in km
  }

  _createClass(POI, [{
    key: "deg2rad",
    value: function deg2rad(degrees) {
      return degrees * (Math.PI / 180);
    }
  }, {
    key: "getDistanceFromInKm",
    value: function getDistanceFromInKm(poi) {
      var differenceLatitude = this.deg2rad(poi.latitude - this.latitude);
      var differenceLongitude = this.deg2rad(poi.longitude - this.longitude);
      var a = Math.sin(differenceLatitude / 2) * Math.sin(differenceLatitude / 2) + Math.cos(this.deg2rad(this.latitude)) * Math.cos(this.deg2rad(poi.latitude)) * Math.sin(differenceLongitude / 2) * Math.sin(differenceLongitude / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return this.radius * c;
    }
  }, {
    key: "getLongitudeDifferenceAtLatitude",
    value: function getLongitudeDifferenceAtLatitude(distance) {
      var hav_dr = (1 - Math.cos(distance / this.radius)) / 2;
      var newLat = (Math.acos(1 - 2 * hav_dr) + this.deg2rad(this.latitude)) * (180 / Math.PI);

      return newLat - this.latitude;
    }
  }, {
    key: "getLatDifferenceAtLon",
    value: function getLatDifferenceAtLon(distance) {
      var rLat = this.deg2rad(this.latitude);
      var hav_dr = (1 - Math.cos(distance / this.radius)) / 2;
      var newLon = (this.deg2rad(this.longitude) + Math.acos(1 - 2 * hav_dr / (Math.cos(rLat) * Math.cos(rLat)))) * (180 / Math.PI);

      return newLon - this.longitude;
    }
  }]);

  return POI;
}();

exports.default = POI;
;
//# sourceMappingURL=main.js.map