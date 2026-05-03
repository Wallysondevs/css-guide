import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { BeforeAfter } from "@/components/ui/BeforeAfter";

export default function Nesting() {
  return (
    <PageContainer
      title="CSS Moderno — Nesting, :has(), @scope, @layer"
      subtitle="O que CSS aprendeu desde 2023 que tornou pré-processadores opcionais. Aninhamento nativo, parent selector, escopo de estilo, organização da cascata. Tudo sem ferramentas extras."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Nesting — adeus repetição</h2>
      <p>
        Antes você precisava de Sass pra escrever CSS aninhado. Hoje
        funciona no navegador direto. A regra: use <code>&amp;</code>
        pra se referir ao seletor pai.
      </p>

      <BeforeAfter
        beforeLabel="❌ Antes — repetir o seletor pai"
        afterLabel="✅ Hoje — nesting nativo"
        before={
          <pre className="text-xs text-slate-700 leading-relaxed">
            {`.card { padding: 1rem; }
.card h2 { margin-top: 0; }
.card:hover { background: #f5f5f5; }
.card.featured { border: 2px solid gold; }
@media (min-width: 768px) {
  .card { padding: 2rem; }
}`}
          </pre>
        }
        after={
          <pre className="text-xs text-slate-700 leading-relaxed">
            {`.card {
  padding: 1rem;

  & h2 { margin-top: 0; }
  &:hover { background: #f5f5f5; }
  &.featured { border: 2px solid gold; }

  @media (min-width: 768px) {
    padding: 2rem;
  }
}`}
          </pre>
        }
      />

      <h2>:is() e :where() — agrupar sem repetir</h2>
      <CodeBlock
        language="css"
        code={`/* Antes */
header h1, header h2, header h3,
main   h1, main   h2, main   h3 {
  font-family: serif;
}

/* Com :is() */
:is(header, main) :is(h1, h2, h3) {
  font-family: serif;
}

/* :where() — IDÊNTICO mas com especificidade ZERO
   (perfeito pra resets — fácil de sobrescrever depois) */
:where(button, .btn) {
  cursor: pointer;
}`}
      />

      <h2>:has() — o "parent selector" que esperamos por 25 anos</h2>
      <p>
        Antes de 2023, CSS só mirava de cima pra baixo. Agora você pode
        estilizar um elemento <strong>baseado no que ele contém</strong>:
      </p>

      <CodeBlock
        language="css"
        code={`/* Card com imagem ganha layout horizontal */
.card:has(img) {
  display: grid;
  grid-template-columns: auto 1fr;
}

/* Form com input inválido — desabilita o submit (sem JS!) */
form:has(input:invalid) button[type="submit"] {
  opacity: .5;
  pointer-events: none;
}

/* Body trava scroll quando modal está aberto */
body:has(dialog[open]) { overflow: hidden; }

/* Label do field cujo input está focado */
.field:has(input:focus) label { color: var(--brand); }

/* Seletor "todos menos o último item" */
li:has(+ li) { border-bottom: 1px solid #eee; }`}
      />

      <h2>@scope — estilos com escopo nativo</h2>
      <p>
        Limita regras a uma subárvore do DOM, sem precisar de classes
        prefixadas (BEM) ou CSS Modules. É o "shadow DOM lite" do CSS.
      </p>

      <CodeBlock
        language="css"
        code={`/* Estilos só dentro do .article */
@scope (.article) {
  h2 { font-size: 2rem; color: navy; }
  a  { text-decoration: underline wavy; }
}
/* Fora de .article, h2 e a permanecem com estilos default */

/* Com limite — não desce além de .comments */
@scope (.article) to (.comments) {
  p { font-size: 1.1rem; }
}

/* :scope refere-se ao próprio root do escopo */
@scope (.card) {
  :scope { border-radius: .5rem; }
  :scope > h2 { color: var(--brand); }
}`}
      />

      <h2>@layer — organizar prioridade da cascata</h2>
      <p>
        Já vimos isso no capítulo de Cascata, mas vale repetir: é a
        forma <strong>certa</strong> de organizar projetos com vários
        níveis de estilo.
      </p>

      <CodeBlock
        language="css"
        code={`/* Defina a ordem (do menos importante ao mais) */
@layer reset, base, components, utilities;

@layer reset    { * { box-sizing: border-box; margin: 0; } }
@layer base     { body { font-family: system-ui; } }
@layer components { .btn { padding: .5rem 1rem; background: blue; } }
@layer utilities { .text-center { text-align: center; } }

/* Importar lib em camada baixa = facilita sobrescrever */
@import url("bootstrap.css") layer(framework);

/* Regras FORA de qualquer layer SEMPRE vencem regras DENTRO */`}
      />

      <h2>:focus-visible — foco SÓ pra teclado</h2>
      <BeforeAfter
        beforeLabel="❌ :focus — feio com mouse"
        afterLabel="✅ :focus-visible — só com Tab"
        before={
          <button
            style={{
              padding: "8px 14px",
              border: "0",
              background: "#3b82f6",
              color: "white",
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 13,
              outline: "3px solid #fbbf24",
              outlineOffset: 2,
            }}
          >
            sempre com anel
          </button>
        }
        after={
          <button
            style={{
              padding: "8px 14px",
              border: "0",
              background: "#3b82f6",
              color: "white",
              borderRadius: 6,
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            sem anel ao clicar
          </button>
        }
        caption="Pressione Tab num botão real pra ver :focus-visible aparecer só com teclado"
      />

      <CodeBlock
        language="css"
        code={`/* Padrão moderno: zerar :focus, definir só :focus-visible */
button:focus { outline: none; }
button:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
}`}
      />

      <h2>aspect-ratio — fim do padding-bottom hack</h2>
      <CodeBlock
        language="css"
        code={`/* Antes — gambiarra clássica de vídeo responsivo */
.video-wrap { position: relative; padding-bottom: 56.25%; }
.video-wrap iframe { position: absolute; inset: 0; width: 100%; height: 100%; }

/* Hoje — uma linha */
.video iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* Outras proporções comuns */
.square   { aspect-ratio: 1; }
.portrait { aspect-ratio: 3 / 4; }`}
      />

      <h2>color-scheme + light-dark() — tema sem JS</h2>
      <CodeBlock
        language="css"
        code={`/* Diz ao navegador que sua página suporta os dois temas */
:root { color-scheme: light dark; }

/* Use light-dark() pra alternar valores baseado no tema atual */
body {
  background: light-dark(white, #1a1a1a);
  color:      light-dark(black, white);
}

/* Override por classe */
[data-theme="dark"]  { color-scheme: dark; }
[data-theme="light"] { color-scheme: light; }`}
      />

      <h2>Exemplo do mundo real — card moderno usando 7 features novas</h2>
      <CodeBlock
        language="css"
        code={`@scope (.card) {
  :scope {
    --pad: clamp(1rem, 3vw, 2rem);
    container-type: inline-size;
    isolation: isolate;
    padding: var(--pad);
    border-radius: .75rem;
    background: light-dark(white, #1a1a1a);
    border: 1px solid color-mix(in srgb, currentColor 12%, transparent);

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
      <AlertBox type="warning" title="Sempre use & em nesting">
        Em algumas versões antigas, <code>p &#123; ... &#125;</code> dentro de
        <code> .card </code> sem <code>&amp;</code> não funcionava. Hoje
        funciona, mas usar <code>&amp;</code> deixa mais claro e
        compatível com qualquer browser.
      </AlertBox>

      <AlertBox type="danger" title=":has() pode ser pesado em árvores grandes">
        O navegador re-avalia quando descendentes mudam. Evite
        <code> *:has(.x) </code> e seletores muito genéricos com
        :has em listas com milhares de filhos.
      </AlertBox>

      <h2>Resumão</h2>
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

/* Outros */
:focus-visible { ... }
aspect-ratio: 16 / 9
color-scheme: light dark
light-dark(L, D)`}
      />
    </PageContainer>
  );
}
