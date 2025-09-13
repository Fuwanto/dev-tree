import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import Footer from "../components/Footer";

export default function HomeView() {
  const token = localStorage.getItem("AUTH_TOKEN");

  return (
    <>
      <main className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
          {/* Contenedor */}
          <div className="max-w-3xl mx-auto bg-gray-800/30 rounded-3xl border border-cyan-400/20 p-8 md:p-12 shadow-2xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Todas tus{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Redes Sociales
              </span>{" "}
              en un enlace
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 px-4">
              Únete a más de 200 mil developers compartiendo sus redes sociales,
              <span className="block md:inline">
                {" "}
                comparte tu perfil de{" "}
                <span className="text-cyan-400">TikTok</span>,{" "}
                <span className="text-indigo-400">GitHub</span>,{" "}
                <span className="text-rose-400">YouTube</span> y más
              </span>
            </p>

            {/* Formulario */}
            {!token && (
              <div className="flex justify-center">
                <SearchForm />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
