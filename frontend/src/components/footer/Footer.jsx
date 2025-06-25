import { lightTheme } from "@resources/colors/colors.js";

export default function Footer() {
  return (
    <footer className="text-center py-4 mt-auto"
      style={{ backgroundColor: lightTheme.primaryBackground }}>
      <a
        href="/privacy-policy"
        className="text-blue-600 hover:underline"
      >
        Политика конфиденциальности
      </a>
    </footer>
  );
}