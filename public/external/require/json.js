define({
  load: function (id, require, onload, config) {
    if (config.isBuild) {
      return onload();
    }

    // Synchronous XHRs are bad, evil, and necessary here :(
    var xhr = new XMLHttpRequest();
    xhr.open('GET', id + '?bust=' + Date.now(), false);
    xhr.send(null);
    if (xhr.status !== 200) {
      err = new Error(id + ' HTTP status: ' + status);
      err.xhr = xhr;
      onload.error(err);
      return;
    }

    onload(JSON.parse(xhr.responseText));
  }
});
