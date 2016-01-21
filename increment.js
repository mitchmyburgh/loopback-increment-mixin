'use strict';

module.exports = function Increment (Model, options) {
  Model.observe('before save', increment);

  function increment(ctx, next) {
    if (ctx.instance) {
      findAndReplace(ctx.instance, next);
    } else if (ctx.data) {
      //findAndReplace(ctx.data, next);
      next();
    } else {
      next();
    }
  }

  function findAndReplace(data, next) {
    Model.findById(data.id, function (original_object_err, original_object){
      if (original_object === null) {
        next();
      } else {
        for (var i = 0; i < options.properties.length; i++) {
          data[options.properties[i]] += original_object[options.properties[i]]
        }
        next();
      }
    })
  }
}
