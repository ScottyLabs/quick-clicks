const Site = require('../server/Site');

module.exports = (app) => {
  //CREATE A NEW SITE
  //post function
  //uses req.body from Postman
  app.put("/create", function (req, res) {
    //automatically set the "active" field to true
    const site = new Site({ ...req.body, active: true });
    site
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //FETCH ALL THE SITES
  //quick note:
  //to test queries in Compass: use everything inside the brackets: from "{category" to "}"
  app.post("/sites", function (req, res) {
    let tags = null;

    if (req.body.tags != null) {
      tags = req.body.tags;
    }

    if (tags != null) {
      Site.find(
        {
          category: {
            $in: tags,
          },
          active: true,
        },
        function (err, site) {
          return res.json(site);
        }
      );
    } else {
      Site.find({ active: true }, function (err, site) {
        return res.json(site);
      });
    }
  });

  //DELETE/SET VISIBILITY OF SITES
  app.delete("/set-invisible", function (req, res) {
    let name = req.query.name;

    if (name != null) {
      Site.updateOne(
        {
          name: name,
        },
        {
          active: false,
        },
        function (err, site) {
          return res.json(site);
        }
      );
    } else {
      res
        .status(400)
        .json({ message: "set-invisible request is missing name" });
    }
  });

  app.delete("/delete", function (req, res) {
    let name = req.query.name;

    if (name != null) {
      Site.findOneAndDelete({ name: name }, function (err, site) {
        return res.json(site);
      });
    } else {
      res.status(400).json({ message: "delete request is missing name" });
    }
  });
};


