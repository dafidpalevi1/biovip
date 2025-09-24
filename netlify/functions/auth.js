export async function handler(event, context) {
    const clientKey = process.env.TIKTOK_CLIENT_KEY;
    const redirectUri = `${process.env.URL}/.netlify/functions/auth`;
  
    // Jika sudah ada code dari TikTok
    const urlParams = new URLSearchParams(event.queryStringParameters);
    const code = urlParams.get("code");
  
    if (!code) {
      // Step 1: Redirect ke halaman login TikTok
      return {
        statusCode: 302,
        headers: {
          Location: `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&scope=user.info.basic&response_type=code&redirect_uri=${redirectUri}`
        },
      };
    }
  
    // Step 2: Tukar code dengan access_token
    const res = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_key: clientKey,
        client_secret: process.env.TIKTOK_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });
  
    const data = await res.json();
  
    if (data.access_token) {
      return {
        statusCode: 302,
        headers: {
          "Set-Cookie": `tiktok_token=${data.access_token}; Path=/; HttpOnly`,
          Location: "/",
        },
      };
    } else {
      return { statusCode: 500, body: JSON.stringify(data) };
    }
  }
  