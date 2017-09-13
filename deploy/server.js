const express = require('express');
const fileUpload = require('express-fileupload');
const UUID = require('uuid');
const deploy = require('./deploy');

const port = process.env.PORT || 8080;
const app = express();
app.use(fileUpload());

app.post('/deploy/:PRID', (req, res) => {
  if (!req.files || !req.files.app) {
    return res.status(400).send('Upload a file with the name "app"');
  }

  const { PRID } = req.params;

  const tarballName = UUID.v4();
  console.log(`Deploying PR: ${PRID}`);

  req.files.app.mv(`/tmp/${tarballName}.tar.gz`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    deploy(PRID, tarballName)
      .then(() => {
        res.send('SUCCESS');
      })
      .catch((error) => {
        console.log(error.stack);
        return res.status(500).send(error);
      });
  });
});

app.listen(port, () => {
  console.log(`Deploy server started in port: ${port}`);
});
