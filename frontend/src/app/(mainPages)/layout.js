import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <section className="main-pages min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </section>
  );
}