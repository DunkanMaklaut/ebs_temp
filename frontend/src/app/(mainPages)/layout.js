import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import { AuthProvider } from "@/app/context/AuthContext";

export default function MainLayout({ children }) {
  return (
    <section className="main-pages  min-h-screen flex flex-col">
      <AuthProvider>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </AuthProvider>
    </section>
  );
}
