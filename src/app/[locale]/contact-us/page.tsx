import React from "react";
import Button from "../../components/ui/Button";
import Image from "next/image";

function page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900  relative">
      <div
        className="absolute inset-0 bg-transparent"
        style={{
          backgroundImage: `radial-gradient(rgba(255 255 255 / 0.1) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="relative z-10 w-full h-full  rounded-lg  text-slate-300 shadow-lg p-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[calc(100%-80px)] bg-slate-900 p-4 rounded-2xl bg-opacity-10">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Contactanos
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                Complete el siguiente formulario y nos pondremos en contacto con
                usted a la brevedad.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium mb-2 text-slate-300"
                    >
                      Nombre*
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Su nombre"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-slate-800 text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="apellido"
                      className="block text-sm font-medium mb-2 text-slate-300"
                    >
                      Apellido*
                    </label>
                    <input
                      id="apellido"
                      type="text"
                      placeholder="Su apellido"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-slate-800 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-slate-300"
                  >
                    Correo Electrónico*
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="usted@empresa.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-slate-800 text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="comentarios"
                    className="block text-sm font-medium mb-2 text-slate-300"
                  >
                    Comentarios*
                  </label>
                  <textarea
                    id="comentarios"
                    rows={5}
                    placeholder="Cuéntenos cómo podemos ayudarle"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-slate-800 text-white"
                  ></textarea>
                </div>
              </form>
            </div>

            <Button>Enviar</Button>
          </div>

          <div className=" rounded-xl p-8 flex flex-col">
            <div className="mb-2">
              <Image
                src="/logo.png"
                alt="Logo"
                className="h-12 w-auto mr-4 mb-4"
              />
              <h3 className="text-2xl font-bold text-white mb-4">
                Nos encantaría saber de usted
              </h3>
              <p className="text-slate-400 text-lg">
                Estamos aquí para responder cualquier pregunta que pueda tener
                sobre nuestros servicios.
              </p>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <Image
                src="https://images.unsplash.com/photo-1571223641822-b82408a0e705?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>

            <div className="mt-auto pt-8 border-t border-slate-700">
              <p className="text-sm text-slate-500 text-center">
                © {new Date().getFullYear()} Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
