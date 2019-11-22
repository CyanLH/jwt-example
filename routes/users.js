var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  const secretKey = 'jwt-secret';
  const token = jwt.sign(
                            {
                              id: req.body.id,
                              username: req.body.username,
                            },
                            secretKey,
                            {
                              expiresIn: '7d',
                              issuer: 'test',
                              subject: 'user'
                            }
                        );
  console.log(req.body.id + ", " + req.body.username);
  res.send(token);
});

module.exports = router;
