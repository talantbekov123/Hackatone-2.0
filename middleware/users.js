module.exports = function(app, db) {
  app.use(function(req, res, next) {
    res.locals.authorized = req.cookies.user;
    next();
  });
};