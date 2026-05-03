import { Link } from "wouter";
import { Palette, Code2, Layers, Box, Move, Grid3x3, Type, Sparkles, Variable, Zap, Smartphone, Layout } from "lucide-react";

const SECTIONS = [
  { path: "/seletores", icon: Code2, title: "Seletores", desc: "Tudo que você pode mirar: classes, atributos, pseudo-classes, combinadores." },
  { path: "/cascade", icon: Layers, title: "Cascata & Especificidade", desc: "Como o navegador decide qual regra vence — e como dominar o !important." },
  { path: "/box-model", icon: Box, title: "Box Model", desc: "content, padding, border, margin e o salvador box-sizing: border-box." },
  { path: "/units", icon: Variable, title: "Unidades", desc: "px, em, rem, %, vw, vh, ch, dvh, clamp() — quando usar cada uma." },
  { path: "/flexbox", icon: Move, title: "Flexbox", desc: "Layout 1D para componentes: alinhamento, distribuição, ordem." },
  { path: "/grid", icon: Grid3x3, title: "Grid", desc: "Layout 2D real: areas, auto-fill, subgrid, fluid columns." },
  { path: "/positioning", icon: Layout, title: "Position & Z-index", desc: "static, relative, absolute, fixed, sticky e o caos do stacking context." },
  { path: "/responsive", icon: Smartphone, title: "Responsivo", desc: "Media queries, container queries, mobile-first, intrinsic design." },
  { path: "/colors", icon: Palette, title: "Cores Modernas", desc: "rgb, hsl, oklch, gradients, color-mix(), wide gamut P3." },
  { path: "/typography", icon: Type, title: "Tipografia", desc: "Web fonts, font-display, line-height ótimo, font-feature-settings." },
  { path: "/animations", icon: Sparkles, title: "Animações", desc: "transition, @keyframes, easing, will-change, animação performática." },
  { path: "/custom-properties", icon: Variable, title: "Custom Properties", desc: "Variáveis CSS nativas, escopo, fallback, theming dinâmico." },
  { path: "/nesting", icon: Zap, title: "CSS Moderno", desc: ":has(), :is(), nesting nativo, @scope, @layer — sem pré-processador." },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
          <Palette className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
          CSS Guide
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Livro completo de CSS em <strong>pt-BR</strong>, cobrindo do
          básico (cascata, box model) ao mais moderno
          (<code>:has()</code>, container queries, <code>oklch()</code>,
          <code>@scope</code>, subgrid).
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {SECTIONS.length} capítulos
          </span>
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">
            Padrão pedagógico fixo
          </span>
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">
            Exemplos rodáveis
          </span>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map(({ path, icon: Icon, title, desc }) => (
          <Link
            key={path}
            href={path}
            className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>
          Mantido por <a href="https://github.com/Wallysondevs" className="text-primary hover:underline">Wallysondevs</a>
          {" · "}
          <a href="https://github.com/Wallysondevs/css-guide" className="text-primary hover:underline">Código no GitHub</a>
        </p>
      </footer>
    </div>
  );
}
