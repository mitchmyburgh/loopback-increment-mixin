'use strict';

module.exports = function Increment(Model, options) {
  /**
   * [findAndReplace - find data in loopback and update values specified in options.properties]
   * @param  {json}     data [The data inserted into loopback]
   * @param  {Function} next [function called when data is finished being modified]
   * @return {null}          [next is called]
   */
  function findAndReplace(data, next) {
    Model.findById(data.id, function(original_object_err, original_object) {
      if (original_object === null) {
        next();
      } else {
        for (let i = 0; i < options.properties.length; i++) {
          data[options.properties[i]] = data[options.properties[i]] + original_object[options.properties[i]];
        }
        next();
      }
    });
  }
  /**
   * [increment - increment counts]
   * @param  {Object}   ctx  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  function increment(ctx, next) {
    if (ctx.instance) {
      findAndReplace(ctx.instance, next);
    } else if (ctx.data) {
      // findAndReplace(ctx.data, next);
      next();
    } else {
      next();
    }
  }

  Model.observe('before save', increment);
};
