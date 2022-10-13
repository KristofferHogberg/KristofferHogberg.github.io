const verifyAPIKEY = (req, res, next) => {
    const apiHeader = req.header('x-api-key');
    // console.log(apiHeader);
    if (!apiHeader || apiHeader !== process.env.API_KEY) return res.sendStatus(401);
    else next();
}

module.exports = verifyAPIKEY;