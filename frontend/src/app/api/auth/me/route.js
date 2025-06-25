import API_BASE_URL from "@/config";

export async function GET(req) {
  console.log("Пытаюсь узнать ответы");
  try {
    const cookie = req.headers.get("cookie") || "";
    // Извлечь token из cookie (простейший парсинг)
    const tokenMatch = cookie.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return new Response(JSON.stringify({ message: "Токен не найден" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Первый запрос к первому API
    const res1 = await fetch(API_BASE_URL + "/api/auth/aboutReader", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Второй запрос к другому API
    const res2 = await fetch(API_BASE_URL + "/api/auth/aboutStaff", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Проверяем, есть ли хотя бы один успешный ответ
    if (res1.ok) {
      const user1 = await res1.json();
      user1.role = "READER";
      return new Response(JSON.stringify({ user: user1, source: "auth" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (res2.ok) {
      const user2 = await res2.json();
      return new Response(JSON.stringify({ user: user2, source: "employee" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Если оба ответа не 200, возвращаем ошибку
    // Можно учитывать 404 и 500 как причины отсутствия пользователя
    if (res1.status === 404 && res2.status === 404) {
      return new Response(
        JSON.stringify({ message: "Пользователь не найден" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (res1.status === 500 || res2.status === 500) {
      return new Response(
        JSON.stringify({ message: "Ошибка сервера при поиске пользователя" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // На всякий случай — общий fallback
    return new Response(JSON.stringify({ message: "Неизвестная ошибка" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: "Ошибка сервера: " + e.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
