module.exports = function mixin (app) {
  app.loopback.modelBuilder.mixins.define('Increment', require('./increment'));
};
