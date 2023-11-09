const Image = require("../models/progress-pic.js");

exports.postImage = (req, res, next) => {
  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  Image.create(obj).then((err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.redirect("/");
    }
  });
};
