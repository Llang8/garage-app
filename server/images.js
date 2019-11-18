var Client = require('ftp');
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app){

    app.use(bodyParser.json());

    app.post('/uploadImages', upload.array('images', 10), (req, res) => {
        /* console.log(req); */
        /* console.log(req.files); */
        if (!req.files) {
            
            res.status(400).send('Error file not defined');
        } else {
            let imagePaths = [];
            let end = req.files.length;
            let i = 0;
            var c = new Client();
            c.on('ready', function() {
                let checkUploaded = setInterval(() => {
                    if(i >= end) {
                        res.json(imagePaths);
                        clearInterval(checkUploaded);
                        c.end();
                    }
                })

                req.files.forEach((file) => {
                    c.put(file.path, `${file.filename}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`, function(err) {
                        if (err) throw err;
                        c.end();
                        imagePaths.push(`https://bjo.txy.mybluehost.me/garage-app/${file.filename}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
                        /* console.log(imagePaths); */
                        i++;
                    });
                })
            });

            // connect to localhost:21 as anonymous
            c.connect({
                host: 'ftp.bjo.txy.mybluehost.me',
                port: '21',
                user: 'garage-app@bjo.txy.mybluehost.me',
                password: 'PGYRj]b3&>x~=k$]',
            });
        }
    });

    //other routes..
}