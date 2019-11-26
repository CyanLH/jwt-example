var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var auth = require('../routes/auth');
const secretKey = auth.secretKey;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

console.log(auth + secretKey);

router.post('/', function (req, res, next) {
  const token = jwt.sign(
                            {
                                id: req.body.id,
                                username: req.body.username,
                            },
                            secretKey,
                            {
                                expirationTime: '7d',
                                // expiresIn: '7d',
                                issuer: 'test',
                                subject: 'user'
                            }
                        );
  console.log(req.body.id + ", " + req.body.username);
  res.send(token);
});

router.get('/auth',function (req, res, next) {
    const token = req.get('access-token');

    if (typeof token !== 'undefined') {
        const decoded = jwt.verify(token, secretKey);
        const resData = {
            id : decoded.id,
            username : decoded.username,
        };
        res.send(resData);
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;
