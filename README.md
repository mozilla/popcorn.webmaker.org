A Video Editor Powered by the Web
=================================

Cornpop is a forked version of the https://popcorn.webmaker.org website with the
server backend ripped out made to be embedded in pretty much any website needed.

Why
===

Video editors are normally large and normally very expensive client side
applications with steep learning curves. Cornpop seeks to take the video editor
to the web by creating popcorn.js powered web videos.

Creating a new cornpop instance is as easy as:

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

API
===

Cornpop.init([editor id], [URI to cornpop root])
------------------------------------------------

**editor id [string]:** Cornpop requires the name of an element to bind to.

**URI to cornpop root [string]** (optional): Since cornpop loads in many HTML and CSS
files outside of `cornpop.js`, you may want to specify the URI to the cornpop root.

Cornpop.setSaveHandler(onSave)
------------------------------

**onSave [function]**: This function is called when the save button is clicked
within the editor. It takes one parameter which is the save data. The Schema
for the save data looks like this:

```javascript
{
    author: '', // Author name
    background: '#FFFFFF', // Background color of project
    data: {}, // Popcorn data object
    description: '' // Metadata description
}
```
