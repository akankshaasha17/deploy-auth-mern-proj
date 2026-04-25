const router = require("express").Router();
const ensureAuthenticated = require("../Middlewares/Auth");

router.get("/", ensureAuthenticated, (req, res) => {
  res.json({
    success: true,
    products: [
      { name: "Mobile", price: 10000 },
      { name: "TV", price: 20000 }
    ]
  });
});

module.exports = router;