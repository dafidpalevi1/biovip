const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const resp = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name", {
      headers: {
        Authorization: `Bearer ${process.env.TIKTOK_TOKEN}`
      }
    });
    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
