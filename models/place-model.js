'use strict';

var mongoose = require('mongoose');

var placeSchema = new mongoose.Schema({
  name: String,
  shortDescription: String,
  location: [Number],
  beaconDevice: mongoose.Schema.Types.Mixed
});

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

module.exports.Place = Place;
module.exports.placeSchema = placeSchema;
