const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('./auth');
const secretKey = auth.secretKey;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

console.log(secretKey);

router.post('/', function (req, res, next) {
  const token = jwt.sign(
                            {
                                id: req.body.id,
                                username: req.body.username,
                            },
                            secretKey,
                            {
                                // expirationTime: '7d',
                                expiresIn: '7d',
                                issuer: 'test',
                                subject: 'user'
                            }
                        );
  console.log(req.body.id + ", " + req.body.username);
  res.send(token);
});

router.get('/auth',function (req, res, next) {
    const token = req.get('access-token');
    let result_code = null;

    if (typeof token !== 'undefined') {
        try{
            const decoded = jwt.verify(token, secretKey);
            result_code = 0;
            res.send(result_code);
        } catch (e) {
            result_code = 1;
            res.send(result_code)
        }
    } else {
        result_code = 1;
        res.send(result_code);
    }
});

module.exports = router;
