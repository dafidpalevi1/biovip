export async function handler(event, context) {
  const cookie = event.headers.cookie || "";
  const match = cookie.match(/tiktok_token=([^;]+)/);
  const accessToken = match ? match[1] : null;

  if (!accessToken) {
    return { statusCode: 401, body: JSON.stringify({ error: "Belum login" }) };
  }

  const res = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name", {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify(data.data || data) };
}
