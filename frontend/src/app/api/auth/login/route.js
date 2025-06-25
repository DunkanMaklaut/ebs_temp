import API_BASE_URL from "@/config";

export async function POST(req) {
  try {
    const { login, password } = await req.json();
    const backendRes = await fetch(API_BASE_URL + "/api/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    if (!backendRes.ok) {
      const errorData = await backendRes.json();
      return new Response(
        JSON.stringify({
          message: errorData.message || "Ошибка авторизации",
        }),
        {
          status: backendRes.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const token = await backendRes.text();

    const cookie = `token=${token}; Path=/; HttpOnly; Max-Age=86400; SameSite=Lax${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`;

    return new Response(JSON.stringify({ message: "Успешно" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookie,
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: "Ошибка сервера: " + e.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
