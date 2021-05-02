var express = require('express');
var cors = require('cors');
require('dotenv').config()
var bodyParser = require("body-parser");
var app = express();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res)=>{
  var file = req.file;
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
