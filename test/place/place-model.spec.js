'use strict';

var
  expect = require('chai').expect,
  validateBeaconDeviceMajorId = require('../../models/place-model').validateBeaconDeviceMajorId;

describe('Place Model', function () {
  var places = [];
  var mock;

  describe('validateBeaconDeviceMajorId(value)', function () {
    var valid = 'xx123';
    it('should accept valid values eg: ' + valid, function () {
      expect(validateBeaconDeviceMajorId(valid)).to.be.true;
    });

    var invalid = 'x12xyz';
    it('should reject invalid values eg: ' + invalid, function () {
      expect(validateBeaconDeviceMajorId(invalid)).to.be.false;
    });
  });

});

