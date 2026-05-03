import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Responsive() {
  return (
    <PageContainer
      title="Design Responsivo"
      subtitle="Mobile-first, media queries, container queries, intrinsic design e tipografia fluida — o conjunto completo para sites que funcionam de 320px a 4K."
      difficulty="intermediario"
      timeToRead="11 min"
    >
      <h2>Mobile-first como mentalidade</h2>
      <p>
        Escreva os estilos base pensando no menor viewport. Use media
        queries com <code>min-width</code> para adicionar
        complexidade conforme o espaço cresce. O resultado é menos
        CSS, mais performance no celular e cascata limpa.
      </p>

      <CodeBlock
        language="css"
        code={`/* Base — mobile (320px+) */
.layout { display: flex; flex-direction: column; gap: 1rem; }

/* Tablet (768px+) */
@media (min-width: 48rem) {
  .layout { flex-direction: row; }
}

/* Desktop (1024px+) */
@media (min-width: 64rem) {
  .layout { gap: 2rem; }
}

/* Use rem nas media queries — respeita o zoom do usuário.
   16px * 48 = 768px, mas se o usuário aumenta a fonte,
   tudo escala junto. */`}
      />

      <h2>Media queries modernas</h2>
      <CodeBlock
        language="css"
        code={`/* Range syntax (mais legível que and/min/max) */
@media (480px <= width <= 1024px) { /* tablet */ }
@media (width >= 1024px) { /* desktop */ }

/* Combinando features */
@media (min-width: 768px) and (orientation: landscape) { }

/* Preferências do usuário (ESSENCIAL) */
@media (prefers-color-scheme: dark) {
  :root { --bg: #1a1a1a; --fg: #fafafa; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: more) {
  :root { --border: black; }
}

/* Capacidades do dispositivo */
@media (hover: hover) and (pointer: fine) {
  .btn:hover { transform: translateY(-2px); }   /* só desktop */
}

@media (hover: none) {
  /* mobile/tablet — sem hover, projete states alternativos */
}

/* Tela alta densidade */
@media (min-resolution: 2dppx) {
  .logo { background-image: url(logo@2x.png); }
}`}
      />

      <h2>Container Queries (a revolução de 2023)</h2>
      <p>
        Media queries respondem ao <strong>viewport</strong>. Container
        queries respondem ao <strong>tamanho do componente</strong> —
        permitindo que o mesmo card se adapte se for colocado num grid
        de 4 colunas ou numa sidebar estreita.
      </p>

      <CodeBlock
        language="css"
        code={`/* 1. Marcar um elemento como container */
.card {
  container-type: inline-size;        /* responde à largura */
  container-name: card;               /* opcional */
}

/* 2. Estilizar baseado no tamanho do CONTAINER, não do viewport */
@container card (min-width: 400px) {
  .card { display: grid; grid-template-columns: auto 1fr; gap: 1rem; }
  .card img { width: 120px; }
}

@container (min-width: 600px) {       /* anônimo - usa container mais próximo */
  .card h2 { font-size: 1.5rem; }
}`}
      />

      <h2>Intrinsic design (design "sem breakpoints")</h2>
      <CodeBlock
        language="css"
        code={`/* Cards responsivos sem media query */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* Container fluido com limite */
.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
}

/* Padding fluido */
.section {
  padding-block: clamp(2rem, 8vh, 6rem);
  padding-inline: clamp(1rem, 5%, 3rem);
}

/* Stack/Switch — coluna em mobile, linha em desktop, sem media query */
.switcher {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.switcher > * {
  flex-grow: 1;
  flex-basis: calc((40rem - 100%) * 999);   /* truque do "Every Layout" */
}`}
      />

      <h2>Tipografia fluida com clamp()</h2>
      <CodeBlock
        language="css"
        code={`/* clamp(MIN, IDEAL, MAX) */
h1 { font-size: clamp(2rem, 5vw + 1rem, 4rem); }
h2 { font-size: clamp(1.5rem, 3vw + 1rem, 2.5rem); }

/* Escala harmônica (Utopia.fyi-style) */
:root {
  --fluid-min-width: 320;
  --fluid-max-width: 1200;
  --fluid-min-size: 16;
  --fluid-max-size: 20;

  --fluid-base:
    clamp(
      calc(var(--fluid-min-size) * 1px),
      calc(var(--fluid-min-size) * 1px + (var(--fluid-max-size) - var(--fluid-min-size)) *
        (100vw - var(--fluid-min-width) * 1px) /
        (var(--fluid-max-width) - var(--fluid-min-width))
      ),
      calc(var(--fluid-max-size) * 1px)
    );
}

body { font-size: var(--fluid-base); }`}
      />

      <h2>Imagens responsivas</h2>
      <CodeBlock
        language="html"
        code={`<!-- Diferentes tamanhos para diferentes viewports -->
<img
  src="hero-1280.jpg"
  srcset="hero-640.jpg 640w, hero-1280.jpg 1280w, hero-2560.jpg 2560w"
  sizes="(min-width: 1200px) 1200px, 100vw"
  alt="..."
  loading="lazy"
  decoding="async"
/>

<!-- Diferentes formatos com fallback -->
<picture>
  <source type="image/avif" srcset="hero.avif" />
  <source type="image/webp" srcset="hero.webp" />
  <img src="hero.jpg" alt="..." />
</picture>`}
      />

      <CodeBlock
        language="css"
        code={`img, video, svg {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Manter proporção sem padding-bottom hack */
.video { aspect-ratio: 16 / 9; }`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* 1. Layout 100% responsivo, ZERO media queries */
.app {
  display: grid;
  gap: clamp(1rem, 3vw, 2rem);
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}

/* 2. Hide em mobile usando container query */
.sidebar { container-type: inline-size; }
@container (max-width: 600px) {
  .sidebar .extra { display: none; }
}

/* 3. Dark mode com toggle (overrides system pref) */
:root {
  color-scheme: light dark;
  --bg: light-dark(white, #1a1a1a);
  --fg: light-dark(black, white);
}
[data-theme="dark"] { color-scheme: dark; }
[data-theme="light"] { color-scheme: light; }`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Não esqueça da meta viewport">
        Sem ela, o iPhone "renderiza desktop e dá zoom out". Resultado:
        media queries não disparam.
      </AlertBox>
      <CodeBlock
        language="html"
        code={`<meta name="viewport" content="width=device-width, initial-scale=1" />`}
      />

      <AlertBox type="danger" title="overflow-x: hidden no html é gambiarra">
        Sintoma: scroll horizontal indesejado em mobile. Causa real:
        algum elemento (geralmente <code>img</code> ou
        <code> table</code>) está estourando. Encontre e conserte
        com <code>max-width: 100%</code> em vez de mascarar.
      </AlertBox>

      <AlertBox type="warning" title="container-type cria contenção layout">
        <code>container-type: inline-size</code> aplica
        <code> contain: layout style </code> implicitamente. Em
        alguns layouts isso quebra <code>position: sticky</code>
        de descendentes. Use <code>container-type: normal</code>
        em containers que não precisam de query.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`/* Abordagem moderna em 2026 */
@media (width >= 48rem) { ... }              /* range syntax */
@container (width >= 400px) { ... }           /* component-level */
@media (prefers-color-scheme: dark) { ... }   /* user prefs */
@media (prefers-reduced-motion) { ... }       /* a11y */

clamp(MIN, IDEAL, MAX)                        /* fluido */
min(100% - 2rem, 1200px)                      /* container */
repeat(auto-fit, minmax(250px, 1fr))          /* grid responsivo */
aspect-ratio: 16 / 9                          /* proporção */
container-type: inline-size                   /* opt-in container queries */`}
      />
    </PageContainer>
  );
}
