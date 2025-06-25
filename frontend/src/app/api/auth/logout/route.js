export async function POST(req) {
  // Удаляем cookie с токеном, выставляя max-age=0
  const cookie = `token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`;

  return new Response(JSON.stringify({ message: "Выход выполнен" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie,
    },
  });
}
