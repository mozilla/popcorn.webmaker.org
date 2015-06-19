A Video Editor Powered by the Web
=================================

Popcorn Editor is a forked version of the https://popcorn.webmaker.org website
with the server backend ripped out that's made to be embedded in pretty much
any website needed.

Why
===

Video editors are normally large and normally very expensive client side
applications with steep learning curves. Popcorn Editor seeks to take the video
editor to the web by creating popcorn.js powered web videos.

Installation
------------

Popcorn Editor can be installed through bower

`$ bower install popcorn-editor`

Creating a new Popcorn Editor instance is as easy as:

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
<script src="PopcornEditor.js"></script>
```


3.
--
```javascript
// Initialize the editor with the div id and path to Popcorn Editor.
PopcornEditor.init('editor', '/path/to/PopcornEditor/editor.html');

// Create event handlers for when specific events happen in Popcorn Editor.
PopcornEditor.setSaveHandler(function (message) {
  console.log('New save data: ', message);
});
```

API
===

PopcornEditor.init([editor id], [URI to Popcorn Editor root])
------------------------------------------------

**editor id [string]:** Popcorn Editor requires the name of an element to bind
to.

**URI to Popcorn Editor root [string]** (optional): Since Popcorn Editor loads
in many HTML and CSS files outside of `PopcornEditor.js`, you may want to
specify the URI to the Popcorn Editor root.

PopcornEditor.setSaveHandler(onSave)
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
