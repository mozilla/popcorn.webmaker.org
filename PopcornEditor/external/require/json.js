define(['text'], function (text) {

  return {
    load: function (id, require, onload, config) {
      if (config.isBuild) {
        return onload();
      }

      text.load(id, require, onload, config);
    }
  }
});
