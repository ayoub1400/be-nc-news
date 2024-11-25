exports.endpointError = (req, res) => {
    res.status(404).send({ msg: 'Not Found' });
  }

exports.customErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    }
    else {
        next(err)
    }
}