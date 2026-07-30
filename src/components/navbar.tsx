"use client";

import React from "react";
import { Home, LayoutGrid, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/ui/dock";

const navItems = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Proyectos", href: "/proyectos", icon: LayoutGrid },
  { name: "Info", href: "/info", icon: Info },
];

export function Navbar() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <Dock direction="middle" className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = typeof window !== "undefined" && window.location.pathname === item.href;
          
          return (
            <DockIcon key={item.name}>
              <a
                href={item.href}
                className={cn(
                  "relative flex items-center justify-center size-10 rounded-full transition-all group",
                  isActive ? "bg-emerald-500 text-black" : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="size-5" />
                
                {/* Tooltip */}
                <span className="absolute -top-10 px-2 py-1 bg-black text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                  {item.name}
                </span>
              </a>
            </DockIcon>
          );
        })}
      </Dock>
    </div>
  );
}
