var PopcornEditor = (function () {
  var PopcornEditor = {},
      _savehandler = function () { return; },
      listeners = {},
      iframe;

  PopcornEditor.init = function (el, url) {
    var editor = document.getElementById(el),
        url = url || 'PopcornEditor/editor.html';

    this.iframe = document.createElement('iframe'),

    this.iframe.setAttribute('src', url);
    this.iframe.setAttribute('frameborder', '0');
    this.iframe.style.width = '100%';
    this.iframe.style.height = '100%';

    editor.appendChild(this.iframe);
  };

  // List of events that PopcornEditor supports
  PopcornEditor.events = {save: 'save', loaded: 'loaded'};

  /**
   * Sets the given handler as the handler for the event
   *
   * @param eventName : [string] name of the event (must be in events)
   * @param handler : [function] takes event
   */
  PopcornEditor.listen = function (eventName, handler) {
    listeners[eventName] = handler;
  }

  /**
   * Loads the popcorn json blob into the editor
   *
   * @param data : [object] json object
   */
  PopcornEditor.loadInfo = function (data) {
      this.iframe.contentWindow.postMessage({
         data: data,
         type: 'load'
      }, window.location.origin);
  };

  /**
   * Given a javascript object which fits the schema defined below, popcorn
   * editor will load that video into the editor.
   *
   * @param video : javascript object of video
   */
  PopcornEditor.createTemplate = function (video) {
    var videoUrl = video.url;
    data = {
        "template": "basic",
        "background": "#FFFFFF",
        "data": {
            "targets": [{
                "id": "Target0",
                "name": "video-container",
                "element": "video-container",
            }],
            "media": [{
                "id": "Media0",
                "name": "Media0",
                "url": "#t=,30",
                "target": "video",
                "duration": video.duration,
                "popcornOptions": {
                    "frameAnimation": true,
                },
                "controls": true,
                "tracks": [{
                    "name": "",
                    "id": "0",
                    "order": 0,
                    "trackEvents": [{
                        "id": "TrackEvent0",
                        "type": "sequencer",
                        "popcornOptions": {
                            "start": 0,
                            "source": [video.url],
                            "fallback": "",
                            "denied": false,
                            "end": video.duration,
                            "from": 0,
                            "title": video.title,
                            "type": "AirMozilla",
                            "thumbnailSrc": video.thumbnail,
                            "duration": video.duration,
                            "linkback": "",
                            "contentType": "",
                            "hidden": false,
                            "target": "video-container",
                            "left": 0,
                            "top": 0,
                            "width": 100,
                            "height": 100,
                            "volume": 100,
                            "mute": false,
                            "zindex": 1000,
                            "id": "TrackEvent0"
                        },
                        "track": "0",
                        "name": "TrackEvent0"
                    }]
                }],
                "clipData": {
                },
                "currentTime": 0,
            }]
        },
        "tags": ["popcorn"],
    }
    // Need to dynamically set the clipdata key
    data.data.media.clipData[videoUrl] = {
        "type": video.type,
        "title": video.title,
        "source": video.url,
        "thumbnail": video.thumbnail,
        "duration": video.duration
    }
    return data;
  };

  window.addEventListener('message', function (e) {
    if (e.origin !== window.location.origin)
      return;

    for (key in listeners) {
      if (e.data.type === key) {
        listeners[key](e.data.data);
      }
    }
  });

  return PopcornEditor;
})();
