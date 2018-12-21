const handle = require("../handler");
const USER_AGENTS = require("./user-agents.json");
const CONTENT_TYPE = 'Content-Type';
const MIME_APP_JS = 'application/javascript; charset=utf-8';
const buildEvent = (ua) => {
  return {
    requestContext: { identity: { userAgent: ua } }
  };
};


Object.keys(USER_AGENTS).forEach(browser => {
  test(`returns a reasonable response for ${browser}`, async (done) => {
    const event = buildEvent(USER_AGENTS[browser]);
    const response = await handle.handle(event, null);
    expect(response.statusCode).toEqual(200);
    expect(response.headers[CONTENT_TYPE]).toEqual(MIME_APP_JS);
    expect(response.body).toMatchSnapshot();
    done();
  });
});

test("does not require a ua query param", async (done) => {
  const event = buildEvent(USER_AGENTS["Chrome 63"]);
  const response = await handle.handle(event, null);
  expect(response.statusCode).toEqual(200);
  expect(response.headers[CONTENT_TYPE]).toEqual(MIME_APP_JS);
  expect(response.body).toMatchSnapshot();
  done();
});
