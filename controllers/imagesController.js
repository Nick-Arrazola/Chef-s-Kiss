const mongoose = require("mongoose");

mongoose.connection.once('open', () => {
  // Init stream
  gridBucket = new mongoose.mongo.GridFSBucket(mongoose.connections[0].db, {
    bucketName: 'files'
  });
});

// Defining methods for the imagesController
module.exports = {
  upload: (req, res) => {
    res.status(200).json({
      message: 'successful upload',
      files: req.files,
    });
  },
  remove: (req, res) => {
    gridBucket.remove({ _id: req.params.id, root: 'files' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      };
      res.json("success");
    });
  },
  findAll: (req, res) => {
    try {
      let file = gridBucket.find().toArray((err, files) => { 
        if (err) {
          console.log(err)
        } else {
          if (!files || files.length === 0) {
            return res.status(404).json({
              err: 'No files exist'
            });
          } else {
            gridBucket.openDownloadStream().pipe(res)
          };
        };
      });
    } catch (error) {
      console.log(error);
    }
  },
  findById: (req, res) => {
    gridBucket.openDownloadStreamByName(req.params.filename).pipe(res);
  },
};
