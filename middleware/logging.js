function logging(req, res, next) {
    //Logs the request
    const currentTime = new Date().toISOString();
    //Retrieves http method
    const httpMethod = req.method;
    //Retrieves the original URL path of the request
    const path = req.originalUrl;
    console.log(`[${currentTime}] ${httpMethod} ${path}`);
    next();
}

module.exports = logging; 