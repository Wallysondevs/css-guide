import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Nesting() {
  return (
    <PageContainer
      title="CSS Moderno — Nesting, :has(), :is(), @scope"
      subtitle="Tudo o que o CSS adquiriu desde 2023 que tornou pré-processadores opcionais. Aninhamento, parent selector, escopo de estilo nativo."
      difficulty="avancado"
      timeToRead="11 min"
    >
      <h2>Nesting nativo (sem Sass)</h2>
      <CodeBlock
        language="css"
        code={`/* Antes — Sass/Less */
.card {
  padding: 1rem;
  & h2 { margin-top: 0; }
  &:hover { background: #f5f5f5; }
}

/* Hoje — CSS nativo (suporte universal desde 2023) */
.card {
  padding: 1rem;

  & h2 {
    margin-top: 0;
    font-size: 1.5rem;

    & + p {
      margin-top: 0.5rem;
    }
  }

  &:hover {
    background: #f5f5f5;
  }

  &.featured {
    border: 2px solid gold;
  }

  /* Media queries aninhadas */
  @media (min-width: 768px) {
    padding: 2rem;
  }

  /* Container queries aninhadas */
  @container (min-width: 600px) {
    display: grid;
  }
}`}
      />

      <AlertBox type="info" title="O & é (geralmente) opcional, mas sempre recomendado">
        Em 2024 o CSS Working Group tornou o <code>&amp;</code>
        opcional para tipos simples. Mas USE sempre — fica mais
        explícito e evita ambiguidade.
      </AlertBox>

      <h2>:is() e :where() — agrupar sem repetir</h2>
      <CodeBlock
        language="css"
        code={`/* Antes (verboso) */
header h1, header h2, header h3,
main h1, main h2, main h3 {
  font-family: serif;
}

/* Com :is() */
:is(header, main) :is(h1, h2, h3) {
  font-family: serif;
}

/* Com :where() — IDÊNTICO mas com especificidade ZERO */
:where(button, .btn) {
  /* sobrescrever isso é trivial */
}

/* Especificidade:
   :is(a, .b, #c)  → conta como o seletor de MAIOR especificidade dentro (= #c)
   :where(a, .b, #c) → SEMPRE 0,0,0  */`}
      />

      <h2>:has() — o "parent selector"</h2>
      <CodeBlock
        language="css"
        code={`/* Card que CONTÉM uma imagem */
.card:has(img) {
  display: grid;
  grid-template-columns: auto 1fr;
}

/* Form com QUALQUER input inválido */
form:has(input:invalid) button[type="submit"] {
  opacity: .5;
  pointer-events: none;
}

/* Lista cujo último item NÃO é um divisor */
li:has(+ li) {
  border-bottom: 1px solid #eee;
}

/* Body quando o modal está aberto (alternativa a JS adicionando classe) */
body:has(dialog[open]) {
  overflow: hidden;
}

/* Label cujo input está focado (sem JS!) */
.field:has(input:focus) label {
  color: var(--brand);
}

/* Article sem imagem — fallback de layout */
article:not(:has(img)) {
  max-width: 65ch;
  margin-inline: auto;
}`}
      />

      <h2>@scope — estilos com escopo nativo</h2>
      <p>
        O <code>@scope</code> limita regras a uma subárvore do DOM,
        sem precisar de classes prefixadas (BEM) ou CSS Modules.
        É o "shadow DOM lite" do CSS.
      </p>

      <CodeBlock
        language="css"
        code={`/* Estilos só dentro do .article */
@scope (.article) {
  h2 { font-size: 2rem; color: navy; }
  a  { text-decoration: underline wavy; }
}
/* Fora de .article, h2 e a permanecem com estilos default */

/* Com limite (não desce além de .comments) */
@scope (.article) to (.comments) {
  p { font-size: 1.1rem; }
}
/* Aplica em parágrafos do .article, MAS NÃO nos parágrafos
   dentro de .comments (que é descendente do .article) */

/* :scope refere-se ao próprio root do scope */
@scope (.card) {
  :scope { border-radius: .5rem; }
  :scope > h2 { color: var(--brand); }
}`}
      />

      <h2>@layer — organizar prioridade da cascata</h2>
      <CodeBlock
        language="css"
        code={`/* Definir ordem (do menos prioritário ao mais prioritário) */
@layer reset, base, components, utilities;

@layer reset {
  * { box-sizing: border-box; margin: 0; }
}

@layer base {
  body { font-family: system-ui; }
  h1, h2, h3 { line-height: 1.2; }
}

@layer components {
  .btn {
    padding: .5rem 1rem;
    background: var(--brand);
  }
}

@layer utilities {
  .text-center { text-align: center; }
  .hidden { display: none; }
}

/* Importar libs em layers */
@import url("normalize.css") layer(reset);
@import url("framework.css") layer(framework);

/* Regras FORA de @layer SEMPRE vencem regras DENTRO de qualquer layer */
.btn { background: hotpink; }   /* sobrescreve o @layer components */`}
      />

      <h2>@supports — feature detection</h2>
      <CodeBlock
        language="css"
        code={`/* Aplicar APENAS se a feature for suportada */
@supports (display: grid) {
  .layout { display: grid; }
}

/* Negação */
@supports not (color: oklch(50% 0.2 30)) {
  .brand { color: hsl(250 100% 50%); }
}

/* Combinação */
@supports (container-type: inline-size) and (selector(:has(*))) {
  /* navegador moderno */
}

/* Property + value */
@supports (background: color-mix(in oklch, red, blue)) {
  .badge { background: color-mix(in oklch, var(--brand), white 20%); }
}`}
      />

      <h2>:focus-visible (foco apenas para teclado)</h2>
      <CodeBlock
        language="css"
        code={`/* :focus aparece SEMPRE (mouse e teclado) — feio em mouse */
button:focus { outline: 2px solid blue; }

/* :focus-visible aparece SÓ quando o navegador detecta navegação por teclado */
button:focus-visible { outline: 2px solid blue; outline-offset: 2px; }

/* Padrão moderno: zerar :focus, definir só :focus-visible */
button:focus { outline: none; }
button:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }`}
      />

      <h2>aspect-ratio (sem mais padding-bottom hacks)</h2>
      <CodeBlock
        language="css"
        code={`/* Antes — gambiarra com padding-bottom: 56.25% */
.video-wrap { position: relative; padding-bottom: 56.25%; }
.video-wrap iframe { position: absolute; inset: 0; width: 100%; height: 100%; }

/* Hoje — uma linha */
.video iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* Outras proporções comuns */
.square { aspect-ratio: 1; }
.portrait { aspect-ratio: 3 / 4; }
.golden { aspect-ratio: 1.618; }`}
      />

      <h2>color-scheme (dark mode nativo)</h2>
      <CodeBlock
        language="css"
        code={`/* Diz ao browser que sua página suporta os dois temas */
:root { color-scheme: light dark; }

/* Browser estiliza scrollbars, inputs, form controls automaticamente */

/* Use light-dark() para alternar valores baseado no tema atual */
body {
  background: light-dark(white, #1a1a1a);
  color: light-dark(black, white);
}

/* Override por classe */
[data-theme="dark"]  { color-scheme: dark; }
[data-theme="light"] { color-scheme: light; }`}
      />

      <h2>Casos práticos combinados</h2>
      <CodeBlock
        language="css"
        code={`/* Card moderno usando 7 features novas */
@scope (.card) {
  :scope {
    --pad: clamp(1rem, 3vw, 2rem);
    container-type: inline-size;
    isolation: isolate;
    padding: var(--pad);
    border-radius: .75rem;
    background: light-dark(white, #1a1a1a);
    border: 1px solid color-mix(in srgb, currentColor 12%, transparent);
    aspect-ratio: 4 / 3;

    & h2 {
      font-size: clamp(1.25rem, 3vw, 1.75rem);
      text-wrap: balance;
      margin-block-end: var(--pad);
    }

    &:has(img) {
      display: grid;
      grid-template-columns: 1fr;

      @container (min-width: 400px) {
        grid-template-columns: auto 1fr;
        gap: var(--pad);
      }
    }

    &:focus-within {
      outline: 2px solid var(--brand);
      outline-offset: 4px;
    }
  }
}`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Nesting precisa de & em element selectors">
        <code>p &#123; ... &#125;</code> dentro de
        <code> .card </code> é INTERPRETADO COMO
        <code> .card p </code> só com <code>&amp;</code> ou
        <code> :is()</code> antigamente. Hoje funciona, mas SEMPRE
        use <code>&amp;</code> para evitar surpresas em browsers
        mais antigos:
      </AlertBox>

      <CodeBlock
        language="css"
        code={`/* Seguro em todo lugar */
.card { & p { color: gray; } }

/* Funciona em moderno, falhava antes de 2023 */
.card { p { color: gray; } }`}
      />

      <AlertBox type="danger" title=":has() é caro em árvores grandes">
        Browser precisa re-avaliar quando descendentes mudam. Evite
        <code> *:has(.x) </code> e seletores com :has em containers
        com milhares de filhos.
      </AlertBox>

      <AlertBox type="warning" title="@scope ainda não é universal">
        Suporte completo Chrome/Edge desde 118, Safari 17.4. Firefox
        chegou em 128 (2024). Para projetos com Firefox antigo, use
        com <code>@supports</code> fallback ou CSS Modules.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`/* Aninhamento */
.card { & h2 { ... } &:hover { ... } @media () {} }

/* Agrupamento */
:is(h1, h2, h3)         /* especificidade do maior */
:where(h1, h2, h3)      /* especificidade ZERO */

/* Parent selector */
.card:has(img) { ... }
form:has(input:invalid) button { ... }

/* Escopo */
@scope (.article) to (.comments) { ... }
@layer reset, base, components, utilities;

/* Detecção */
@supports (selector(:has(*))) { ... }

/* Outros */
:focus-visible
aspect-ratio: 16 / 9
color-scheme: light dark
light-dark(L, D)`}
      />
    </PageContainer>
  );
}
