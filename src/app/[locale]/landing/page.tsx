"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  HiOutlineDatabase,
  HiOutlineGlobeAlt,
  HiOutlineChartBar,
  HiOutlineLockClosed,
  HiOutlineArrowRight,
} from "react-icons/hi";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-slate-300">
      {/* Hero */}
      <section className="h-[calc(100vh_-_64px)]  flex flex-col justify-center items-center px-6 py-20 text-center">
        <div className="max-w-3xl z-10">
          <Image
            src="/logo.png"
            alt="AR Data Mine"
            width={160}
            height={160}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Soluciones de Datos para Minería e Hidrogeología
          </h1>
          <p className="text-slate-400 text-lg mb-6">
            Centralizá, visualizá y gestioná tus datos geológicos e hídricos desde un solo lugar.
          </p>
          <button
            onClick={() => router.push("/register")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-md inline-flex items-center transition"
          >
            Solicitar acceso <HiOutlineArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">¿Quiénes somos?</h2>
        <p className="text-slate-400 max-w-3xl mx-auto">
          Somos un equipo especializado en ciencia de datos, minería y geología que desarrolla soluciones digitales para transformar la forma en que se almacenan, analizan y comparten los datos en proyectos extractivos y estudios hidrogeológicos.
        </p>
      </section>

      {/* Servicios */}
      <section className="bg-slate-800 bg-opacity-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Servicios</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            <ServiceCard
              icon={<HiOutlineDatabase className="w-8 h-8 text-emerald-500 mb-4" />}
              title="Gestión de Datos"
              description="Administración estructurada de datos de campo, laboratorio y pozos en tiempo real."
            />
            <ServiceCard
              icon={<HiOutlineChartBar className="w-8 h-8 text-emerald-500 mb-4" />}
              title="Visualización Inteligente"
              description="Dashboards interactivos para analizar tendencias geológicas e hidrogeológicas."
            />
            <ServiceCard
              icon={<HiOutlineGlobeAlt className="w-8 h-8 text-emerald-500 mb-4" />}
              title="Mapeo Geoespacial"
              description="Integración con mapas y modelos 3D para un análisis espacial profundo."
            />
            <ServiceCard
              icon={<HiOutlineLockClosed className="w-8 h-8 text-emerald-500 mb-4" />}
              title="Seguridad & Accesos"
              description="Control de usuarios, backups automáticos y cifrado de información."
            />
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-20 px-6 bg-slate-900 bg-opacity-60">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <Image
              src="/mineria-landing.png"
              alt="Visualización de Datos"
              width={600}
              height={400}
              className="rounded-md shadow"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-4">
              Comenzá a transformar tus datos en decisiones.
            </h3>
            <p className="text-slate-400 mb-6">
              Nuestro sistema se adapta a tus necesidades, ya sea en minería, geología ambiental o hidrogeología.
            </p>
            <button
              onClick={() => router.push("/register")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-md inline-flex items-center transition"
            >
              Acceder al sistema <HiOutlineArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 select-none">
        © 2025 ARDATAMINE. Todos los derechos reservados.
      </footer>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 shadow-md hover:shadow-lg transition text-center">
      {icon}
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}
