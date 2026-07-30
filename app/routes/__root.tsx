/// <reference types="vite/client" />
import { createRootRoute, Outlet, ScrollRestoration, HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '../globals.css?url'
import { RetroGrid } from '@/components/ui/retro-grid'
import { Navbar } from '@/components/navbar'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'ODIS - Asignatura TEAMS' },
      { name: 'description', content: 'Web oficial de la asignatura TEAMS y proyectos de alumnos.' }
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700&family=Geist+Mono:wght@400;500;700&display=swap' }
    ]
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className="dark h-full antialiased font-sans">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-full flex flex-col relative overflow-x-hidden bg-black text-white pt-[-32px]">
        <RetroGrid className="opacity-40" />
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
