// Run it with S3_BUCKET=popcorn.webmadecontent.org node PublishEditRemixLinks.js

var async = require("async");

var s3 = require("knox").createClient({
  bucket: process.env.S3_BUCKET,
  key: process.env.AWS_ID,
  secret: process.env.AWS_SECRET
});

var maxId = 60000;
var server = "https://popcorn.webmaker.org/editor/"
var zeroBuffer = new Buffer(0);

var q = async.queue(function(task, qCallback) {
s3.put("/" + task.base36 + "/" + task.path, {
    "Content-Length": 0,
    "Content-Type": "text/html",
    "x-amz-acl": "public-read",
    "x-amz-website-redirect-location": server + task.id + "/" + task.path
  }).on("response", function(s3res) {
    if (s3res.statusCode != 200) {
      throw new Error("s3.put( /" + task.base36 + "/" + task.path + ") returned HTTP " + s3res.statusCode);
    }

    console.log("/" + task.base36 + "/" + task.path);
    qCallback();
  }).end(zeroBuffer);
}, 4);

q.drain = function() {
  console.log("done!");
  process.exit(0);
}

for (var i = 4180; i <= maxId; i++ ) {
  q.push({
    base36: i.toString(36),
    id: i,
    path: "edit"
  });
  q.push({
    base36: i.toString(36),
    id: i,
    path: "remix"
  });
  q.push({
    base36: i.toString(36) + "_",
    id: i,
    path: "edit"
  });
  q.push({
    base36: i.toString(36) + "_",
    id: i,
    path: "remix"
  });
}
