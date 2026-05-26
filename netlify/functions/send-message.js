const { getStore } = require("@netlify/blobs");
exports.handler = async (event) => {
  const { linkId, message } = JSON.parse(event.body);
  const store = getStore("anon-links");
  const config = await store.get(linkId, { type: "json" });
  if (!config) return { statusCode: 404, body: "Link not found" };

  const text = `📨 New anonymous message\n\nTopic: ${config.topic}\n\n${message}`;
  const tgRes = await fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: config.chatId, text })
  });
  return { statusCode: tgRes.ok? 200 : 500, body: "Done" };
};
