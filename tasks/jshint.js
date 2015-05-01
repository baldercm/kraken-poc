'use strict';


module.exports = function jshint(grunt) {
  // Load task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Options
  return {
    files: [
      'controllers/**/*.js',
      'lib/**/*.js',
      'models/**/*.js',
      'test/**/*.js'
    ],
    options: {
      jshintrc: '.jshintrc'
    }
  };
};
