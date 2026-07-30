import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { ChevronRight, ListTree } from "lucide-react"

export const Route = createFileRoute('/blog')({
  component: BlogLayout,
})

function BlogLayout() {
  const tocItems = [
    { name: "Concepto", href: "#concepto" },
    { name: "Proceso", href: "#proceso" },
    { name: "Materiales", href: "#materiales" },
    { name: "Reflexión", href: "#reflexion" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 border-r border-white/5 bg-black/20 backdrop-blur-xl z-30">
        <div className="p-6 h-full flex flex-col pt-24">
          <div className="mb-8 px-2">
            <div className="flex items-center gap-2 mb-6">
              <ListTree className="w-4 h-4 text-emerald-500" />
              <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">Contenido</h2>
            </div>
            
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group border-l-2 border-transparent hover:border-emerald-500/30"
                >
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
          
          <div className="mt-8 px-2 pt-8 border-t border-white/5">
            <Link 
              to="/proyectos"
              className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors flex items-center gap-2"
            >
              <ChevronRight className="w-3 h-3 -rotate-180" />
              Explorar otros proyectos
            </Link>
          </div>

          <div className="mt-auto px-2 pb-8">
            <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
              <p className="text-xs text-emerald-400 font-medium mb-1">Dato curioso</p>
              <p className="text-[10px] text-zinc-500">Cada proyecto nace de una necesidad real del instituto.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-72">
        <div className="max-w-4xl mx-auto px-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
