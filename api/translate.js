const { generate } = require('cjp')

module.exports = (req, res) => {
    try {
        let reqData
        if (req.body) {
            if (req.body.data64) {
                reqData = Buffer.from(req.body.data64, 'base64').toString('utf-8')
            } else if (req.body.data) {
                reqData = req.body.data
            }
        } else if (req.query.data64) {
            reqData = Buffer.from(req.query.data64, 'base64').toString('utf-8')
        } else if (req.query.data) {
            reqData = req.query.data
        } else {
            throw 'No text found'
        }
        try {
            const resData = generate(reqData)
            res.status(200).json({
                stats: 200,
                msg: 'OK',
                data: resData,
                data64: Buffer.from(resData).toString('base64')
            })
        } catch {
            res.status(500).json({
                status: 500,
                msg: 'Internal Server Error'
            })
        }
    } catch {
        res.status(400).json({
            status: 400,
            msg: 'Bad Request',
            help: 'https://correctjp.work/about/#api'
        })
    }
}
