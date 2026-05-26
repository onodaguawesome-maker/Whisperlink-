const { getStore } = require("@netlify/blobs");
exports.handler = async (event) => {
  const linkId = event.queryStringParameters.id;
  const store = getStore("anon-links");
  const data = await store.get(linkId, { type: "json" });
  if (!data) return { statusCode: 404 };
  return { statusCode: 200, body: JSON.stringify({ name: data.name, topic: data.topic }) };
};
