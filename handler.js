const polyfiller = require("./lib/polyfiller");

async function handle(event, context, mininify) {
  try {
    const polyfill = await polyfiller.fill({
      uaString: event.requestContext.identity.userAgent,
      cache: mininify
    });

    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
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
}

module.exports = {
  mininify: (event, context) => handle(event, context, true),
  normal: (event, context) => handle(event, context, false)
};
