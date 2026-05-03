import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Grid() {
  return (
    <PageContainer
      title="CSS Grid"
      subtitle="O primeiro sistema de layout 2D real da web. Define linhas E colunas simultaneamente, com áreas nomeadas, fr units e auto-placement."
      difficulty="avancado"
      timeToRead="14 min"
    >
      <h2>Conceitos básicos</h2>
      <ul>
        <li><strong>Grid container</strong> — pai com <code>display: grid</code>.</li>
        <li><strong>Grid items</strong> — filhos diretos.</li>
        <li><strong>Grid lines</strong> — linhas numeradas (1, 2, 3...) que delimitam tracks.</li>
        <li><strong>Tracks</strong> — colunas e linhas (entre duas grid lines).</li>
        <li><strong>Cells</strong> — interseção de uma coluna e uma linha.</li>
        <li><strong>Areas</strong> — agrupamento nomeado de cells.</li>
      </ul>

      <h2>Definindo a grid</h2>
      <CodeBlock
        language="css"
        code={`.grid {
  display: grid;

  /* Colunas */
  grid-template-columns: 200px 1fr 1fr;
  /* OU */
  grid-template-columns: repeat(3, 1fr);          /* 3 iguais */
  grid-template-columns: repeat(12, 1fr);         /* sistema 12 cols */
  grid-template-columns: 1fr 2fr 1fr;             /* proporção */
  grid-template-columns: minmax(200px, 1fr) 3fr;  /* mínimo + flex */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));   /* responsivo */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));    /* responsivo, colapsa vazios */

  /* Linhas */
  grid-template-rows: auto 1fr auto;     /* header / main / footer */
  grid-auto-rows: minmax(100px, auto);   /* linhas implícitas */

  /* Espaçamento */
  gap: 1rem;
  column-gap: 1rem;
  row-gap: 2rem;
}`}
      />

      <h2>Posicionando items</h2>
      <CodeBlock
        language="css"
        code={`/* Por número de grid line */
.item {
  grid-column: 1 / 3;       /* da linha 1 à 3 (cobre 2 colunas) */
  grid-column: 1 / span 2;  /* idem, mais legível */
  grid-row: 2 / 4;
}

/* Shorthand */
.item { grid-area: 2 / 1 / 4 / 3; }   /* row-start / col-start / row-end / col-end */

/* Fim "negativo" (a partir da última linha) */
.full { grid-column: 1 / -1; }        /* ocupa todas as colunas */`}
      />

      <h2>Áreas nomeadas (a forma mais legível)</h2>
      <CodeBlock
        language="css"
        code={`.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100dvh;
  gap: 1rem;
}

.layout header  { grid-area: header; }
.layout aside   { grid-area: sidebar; }
.layout main    { grid-area: main; }
.layout footer  { grid-area: footer; }

/* Em mobile, redefina apenas as áreas — itens seguem automaticamente */
@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
  }
}`}
      />

      <h2>Auto-placement responsivo (sem media query!)</h2>
      <CodeBlock
        language="css"
        code={`/* Padrão "RAM" — Repeat Auto Minmax */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
/* Comporta-se como:
   - desktop: 4 colunas de ~280px
   - tablet:  3 colunas
   - mobile:  1-2 colunas
   - sem precisar de @media!  */

/* auto-fit vs auto-fill:
   - fit  → colapsa colunas vazias (cards crescem)
   - fill → mantém colunas vazias (cards mantêm width mínimo) */`}
      />

      <h2>Alinhamento (mais poderoso que flex)</h2>
      <CodeBlock
        language="css"
        code={`.grid {
  /* Colunas/linhas no container */
  justify-content: start | end | center | space-between | space-around | space-evenly;
  align-content:   start | end | center | space-between | stretch;

  /* Items DENTRO da própria cell */
  justify-items: start | end | center | stretch;   /* horizontal */
  align-items:   start | end | center | stretch;   /* vertical */

  /* Shorthand */
  place-items: center;          /* align-items + justify-items */
  place-content: center;        /* align-content + justify-content */
}

/* Item individual */
.item {
  justify-self: end;
  align-self: center;
  place-self: end center;
}`}
      />

      <h2>Subgrid (CSS Grid Level 2)</h2>
      <CodeBlock
        language="css"
        code={`/* Faz um item HERDAR as tracks do grid pai */
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card {
  display: grid;
  grid-template-rows: subgrid;       /* alinha rows com o grid pai */
  grid-row: span 3;
}

/* Resultado: títulos, imagens e botões dos cards alinham
   PERFEITAMENTE entre cards diferentes. Antes era impossível
   sem JavaScript. Suportado em todos browsers desde 2024. */`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* Holy Grail moderno em ~10 linhas */
.app {
  display: grid;
  grid-template:
    "h h h" auto
    "a m s" 1fr
    "f f f" auto
    / 200px 1fr 250px;
  min-height: 100dvh;
  gap: 1rem;
}

/* Hero com imagem que sangra para os lados */
.hero {
  display: grid;
  grid-template-columns:
    [full-start] minmax(1rem, 1fr)
    [content-start] minmax(0, 70ch) [content-end]
    minmax(1rem, 1fr) [full-end];
}
.hero > * { grid-column: content; }
.hero > .bleed { grid-column: full; }

/* Galeria masonry (CSS Grid Level 3 — atrás de flag em browsers) */
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: masonry;
}

/* Form em duas colunas com labels alinhados */
.form {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: .5rem 1rem;
  align-items: center;
}`}
      />

      <h2>Grid vs Flex — quando usar qual?</h2>
      <ul>
        <li><strong>Grid</strong> — layout 2D conhecido (página inteira, dashboards, formulários, galerias).</li>
        <li><strong>Flex</strong> — componente 1D ou conteúdo de tamanho variável (toolbars, listas de tags, navbar).</li>
        <li><strong>Combinados</strong> — Grid para a página, Flex para componentes dentro das células.</li>
      </ul>

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="repeat(auto-fit) com 1 item explode">
        Com 1 item só, <code>auto-fit</code> faz ele esticar para
        100% da largura — pode parecer quebrado. Use
        <code> auto-fill </code> se quiser preservar o tamanho
        mínimo do card.
      </AlertBox>

      <AlertBox type="danger" title="grid-template-areas com aspas mal alinhadas">
        Cada string precisa do mesmo número de "células" (palavras
        separadas por espaço). Mismatch = erro silencioso. Indente
        as áreas em monospace para visualizar:
      </AlertBox>

      <CodeBlock
        language="css"
        code={`/* RUIM (silenciosamente quebra) */
grid-template-areas:
  "header"
  "main side"        /* 2 cells, mas a row 1 tinha só 1 */
  "footer";

/* BOM */
grid-template-areas:
  "header header"
  "main   side"
  "footer footer";`}
      />

      <AlertBox type="warning" title="overflow em grid items">
        Igual ao flex: items têm <code>min-width: auto</code> por
        padrão e podem estourar com texto longo. Defina
        <code> min-width: 0 </code> ou
        <code> overflow: hidden </code> se necessário.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`display: grid
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))   /* responsivo */
grid-template-rows: auto 1fr auto                              /* header/main/footer */
grid-template-areas: "h h" "s m" "f f"
gap: 1rem

/* Item */
grid-column: 1 / -1        /* full row */
grid-column: span 2        /* ocupa 2 cols */
grid-area: header
place-self: center

/* Subgrid */
grid-template-rows: subgrid

/* Combo perfeito: Grid (layout) + Flex (componentes) */`}
      />
    </PageContainer>
  );
}
