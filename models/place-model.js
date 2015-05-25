'use strict';

var mongoose = require('mongoose');

var placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: String,
  location: [Number],
  beaconDevice: {
    majorId: { type: String, validate: validateBeaconDeviceMajorId },
    minorId: String
  }
});

function validateBeaconDeviceMajorId (majorId) {
  return /[a-z]{2}[0-9]{3}/.test(majorId);
}

placeSchema.index({ location: '2d' });

placeSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    ret.latitude = ret.location[0];
    ret.longitude = ret.location[1];

    delete ret._id;
    delete ret._class;
    delete ret.location;
  }
});

var Place = mongoose.model('Place', placeSchema, 'place');

exports.Place = Place;
exports.placeSchema = placeSchema;
exports.validateBeaconDeviceMajorId = validateBeaconDeviceMajorId;
