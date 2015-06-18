A Video Editor Powered by the Web
=================================

Cornpop is a forked version of the https://popcorn.webmaker.org website with the
server backend ripped out made to be embedded in pretty much any website needed.

Why
===

Video editors are normally large and normally very expensive client side
applications with steep learning curves. Cornpop seeks to take the video editor
to the web by creating popcorn.js powered web videos.

Creating a new cornpop instance is as easy as 

1.
--
```html
<body>
    <div id="editor"></div>
</body>
```

2.
--
```html
    <script src="cornpop.js"></script>
```


3.
--
```javascript
    // Initialize the editor with the div id and path to cornpop.
    CornPop.init('editor', '/path/to/cornpop/editor.html');

    // Create event handlers for when specific events happen in cornpop.
    CornPop.setSaveHandler(function (message) {
      console.log('New save data: ', message);
    });
```
