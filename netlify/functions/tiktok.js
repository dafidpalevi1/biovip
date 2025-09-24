export async function handler(event, context) {
    const token = process.env.TIKTOK_ACCESS_TOKEN; // masukkan token di Netlify Environment Variables
  
    try {
      const res = await fetch(
        "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      const data = await res.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Gagal ambil data dari TikTok", details: err.message }),
      };
    }
  }
  