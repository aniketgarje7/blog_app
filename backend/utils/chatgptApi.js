const OpenAI = require("openai");
const OPENAI_KEY = process.env.OPENAI_KEY;
const openai = new OpenAI({ apiKey: OPENAI_KEY });

const getAIResponse = async (content) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: content },
      ],
      model: "gpt-3.5-turbo",
    });
    return { data: completion.choices[0], error: null };
  } catch (e) {
    return { data: null, error: e.message };
  }
};

module.exports = {getAIResponse};