/* exports.psqlError = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'ivalid request'})
    }
    else {
        next(err)
    }
} */

exports.customErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
    }
    else {
        next(err)
    }
}