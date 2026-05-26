const { getStore } = require("@netlify/blobs");
exports.handler = async (event) => {
  const { linkId, token, chatId, name, topic } = JSON.parse(event.body);
  const store = getStore("anon-links");
  await store.setJSON(linkId, { token, chatId, name, topic });
  return { statusCode: 200, body: "OK" };
};
