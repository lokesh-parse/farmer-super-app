const { getChatReply } = require("../services/ai/chatService");

async function handleChat(req, res) {
  const { message } = req.body;

  const result = await getChatReply(message || "");

  res.json(result);
}

module.exports = { handleChat };