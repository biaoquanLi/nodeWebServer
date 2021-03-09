var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
  res.json({
      code:0,
      data:[1,2,3,4,5]
  })
});

router.get('/detail', (req,res,next) => {
    res.json({
        code:0,
        data:'我是详情'
    })
})
module.exports = router;