const fs = require("fs");
const { Router } = require("express");
const router = Router();

router.get("/qr", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "image/svg+xml",
  });
  
  fs.createReadStream(`${__dirname}/../mediaSend/qr-code.svg`).pipe(res);
});

module.exports = router
