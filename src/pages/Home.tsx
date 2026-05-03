import { Link } from "wouter";
import { Palette, Code2, Layers, Box, Move, Grid3x3, Type, Sparkles, Variable, Zap, Smartphone, Layout, BookOpen } from "lucide-react";

const SECTIONS = [
  { path: "/historia", icon: BookOpen, title: "História do CSS", desc: "Como saímos de páginas sem cor para o sistema de design mais poderoso da web." },
  { path: "/seletores", icon: Code2, title: "Seletores", desc: "Aprenda a 'mirar' qualquer elemento da página — classes, atributos, estados, parentes." },
  { path: "/cascade", icon: Layers, title: "Cascata & Especificidade", desc: "Por que aquela cor não muda? Entenda como o navegador escolhe o vencedor." },
  { path: "/box-model", icon: Box, title: "Box Model", desc: "Tudo na página é uma caixa. Veja, com diagramas, as 4 camadas que a formam." },
  { path: "/units", icon: Variable, title: "Unidades", desc: "px, rem, %, vw — quando usar cada uma, com exemplos do dia a dia." },
  { path: "/flexbox", icon: Move, title: "Flexbox", desc: "Alinhar e distribuir elementos numa linha ou coluna. O feijão com arroz dos componentes." },
  { path: "/grid", icon: Grid3x3, title: "Grid", desc: "Layout 2D real: páginas inteiras, dashboards e galerias responsivas em poucas linhas." },
  { path: "/positioning", icon: Layout, title: "Position & Z-index", desc: "Modal, tooltip, header pegajoso, badges de canto — onde tudo isso vive." },
  { path: "/responsive", icon: Smartphone, title: "Responsivo", desc: "Sites que funcionam de 320px a 4K, sem dezenas de breakpoints." },
  { path: "/colors", icon: Palette, title: "Cores Modernas", desc: "Do hex de sempre ao oklch que designers profissionais usam, com paletas que escalam." },
  { path: "/typography", icon: Type, title: "Tipografia", desc: "Web fonts, line-height, hierarquia — o detalhe que diferencia bom de ótimo." },
  { path: "/animations", icon: Sparkles, title: "Animações", desc: "Hover, fade-in, spinner — animação com performance e respeitando acessibilidade." },
  { path: "/custom-properties", icon: Variable, title: "Custom Properties", desc: "Variáveis CSS de verdade: tema dark, design tokens, customização por componente." },
  { path: "/nesting", icon: Zap, title: "CSS Moderno", desc: "Nesting, :has(), @scope, @layer — o que CSS aprendeu desde 2023." },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6">
          <Palette className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">CSS Guide</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Livro completo de CSS em <strong>pt-BR</strong>, do <em>"o que é
          isso?"</em> ao CSS mais moderno de 2025. Cada capítulo tem
          <strong> exemplos do mundo real</strong>, comparações
          <strong> antes/depois</strong> e <strong>diagramas visuais</strong> —
          sem assumir que você já sabe nada.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {SECTIONS.length} capítulos
          </span>
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">Linguagem simples</span>
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">Exemplos rodáveis</span>
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">Diagramas visuais</span>
        </div>
      </header>

      <section className="mb-10 p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-transparent">
        <h2 className="text-lg font-bold mb-2">Como esse livro foi pensado</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Cada capítulo segue o mesmo ritmo: começa com uma <strong>analogia simples</strong>,
          mostra o conceito com <strong>imagens/diagramas</strong>, traz exemplos
          de <strong>componentes que você usa todo dia</strong> (header de e-commerce,
          card de produto, formulário de login), compara <strong>antes vs depois</strong>
          quando faz sentido, e termina com <strong>armadilhas comuns</strong> e um
          <strong> resumão</strong> para consultar depois.
        </p>
      </section>

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
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
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
