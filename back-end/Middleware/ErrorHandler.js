module.exports = (err, req, res, next) => {
  // res.send(err);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};
