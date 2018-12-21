const polyfiller = require("./lib/polyfiller");

module.exports.handle = async (event, context) => {
  try {
    const polyfill = await polyfiller.fill({
      uaString: event.requestContext.identity.userAgent,
      cache: true
    });

    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/javascript; charset=utf-8",
        "Content-Length": polyfill.length
      },
      statusCode: 200,
      isBase64Encoded: false,
      body: polyfill
    };
  } catch (err) {
    console.error(err);
    return {
      headers: {
        "Content-Type": "text/plain"
      },
      statusCode: 500,
      isBase64Encoded: false,
      body: "An error occurred"
    };
  }
};
