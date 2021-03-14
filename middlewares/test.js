let test = (req, res, next) => {
  if (2 === 1) {
    return res.send("You are not allowed, get out.");
  }

  next();
};

module.exports = test;
