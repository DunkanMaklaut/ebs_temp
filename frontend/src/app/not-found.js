import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-6">
          <div className=" rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/error404.jpg"
              alt="Ошибка 404"
              width={200}
              height={200}
              className="object-cover"
              priority
            />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Страница не найдена
        </h2>
        <p className="text-gray-600 mb-6">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
