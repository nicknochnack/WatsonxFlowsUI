const wxflows = require("wxflows");

const endpoint = `https://${process.env.ENVIRONMENT}.${process.env.DOMAIN}/wxflows-genai/watsonxdocs/__graphql`;
const model = new wxflows({
  endpoint: endpoint,
  apikey: process.env.APIKEY,
});

exports.generate = async (prompt) => {
  const schema = await model.generate();

  const result = await model.flow({
    flowName: "myRagWithGuardrails",
    schema,
    variables: {
      aiEngine: "WATSONX",
      model: "ibm/granite-13b-chat-v2",
      question: prompt,
      collection: "watsonxdocs",
      searchEngine: "GETTINGSTARTED",
      n: 10,
      parameters: {
        min_new_tokens: 100,
        max_new_tokens: 1000,
        stop_sequences: [],
      },
    },
  });
  return result?.data?.myRagWithGuardrails?.out;
};
