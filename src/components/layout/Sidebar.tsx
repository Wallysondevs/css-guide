import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  BookOpen, Palette, Layout, Type, Sparkles, Smartphone,
  X, Layers, Box, Grid3x3, Move, Variable, Code2, Zap
} from "lucide-react";

const NAVIGATION = [
  {
    title: "Introdução",
    items: [
      { path: "/", label: "Início", icon: BookOpen },
      { path: "/historia", label: "História do CSS", icon: BookOpen },
    ]
  },
  {
    title: "Fundamentos",
    items: [
      { path: "/seletores", label: "Seletores", icon: Code2 },
      { path: "/cascade", label: "Cascata & Especificidade", icon: Layers },
      { path: "/box-model", label: "Box Model", icon: Box },
      { path: "/units", label: "Unidades (px, rem, %, vw)", icon: Variable },
    ]
  },
  {
    title: "Layout",
    items: [
      { path: "/flexbox", label: "Flexbox", icon: Move },
      { path: "/grid", label: "Grid", icon: Grid3x3 },
      { path: "/positioning", label: "Position & Z-index", icon: Layout },
      { path: "/responsive", label: "Responsivo & Media Queries", icon: Smartphone },
    ]
  },
  {
    title: "Visual",
    items: [
      { path: "/colors", label: "Cores (RGB, HSL, OKLCH)", icon: Palette },
      { path: "/typography", label: "Tipografia", icon: Type },
      { path: "/animations", label: "Transições & Animações", icon: Sparkles },
    ]
  },
  {
    title: "CSS Moderno",
    items: [
      { path: "/custom-properties", label: "Custom Properties", icon: Variable },
      { path: "/nesting", label: "Nesting & :has() & :is()", icon: Zap },
    ]
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed top-0 bottom-0 left-0 z-50 w-72 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="flex items-center justify-between lg:justify-center mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-sm">CSS Guide</h1>
                <p className="text-xs text-muted-foreground">Livro Completo</p>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="space-y-6">
            {NAVIGATION.map((section) => (
              <div key={section.title}>
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                  {section.title}
                </h2>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location === item.path;
                    return (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          className={cn(
                            "flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
