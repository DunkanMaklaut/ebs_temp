import Header from "@components/header/Header";

export default function RootLayout({ children }) {
  console.log("hello main");
  return (
    <section className="main-pages h-full">
      <Header />
      {children}
    </section>
  );
}
