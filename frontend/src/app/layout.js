import "./globals.css";
import { lightTheme } from "@resources/colors/colors.js";
import { Inter } from "next/font/google";
import Header from "@components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ТехТОМ",
  description: "Электронно-библиотечная система ТехТОМ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="h-full">
      <body
        className="main-layout h-full ${inter.className} "
        style={{ backgroundColor: lightTheme.primaryBackground }}
      >
        {children}
      </body>
    </html>
  );
}
