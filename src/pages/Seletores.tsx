import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Seletores() {
  return (
    <PageContainer
      title="Seletores"
      subtitle="A linguagem de busca do CSS: como mirar um, vários ou exatamente um elemento numa página inteira sem tocar no HTML."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <h2>Tipos básicos</h2>
      <CodeBlock
        language="css"
        code={`/* Universal — todos os elementos */
* { box-sizing: border-box; }

/* Tipo (tag) */
h1 { font-size: 2rem; }

/* Classe */
.btn { padding: .5rem 1rem; }

/* ID — específico, evite usar para estilo */
#header { position: sticky; top: 0; }

/* Atributo */
[type="email"] { background: #fffbe6; }
[href^="https"] { color: green; }       /* começa com */
[href$=".pdf"]  { color: red; }         /* termina com */
[class*="card"] { border-radius: .5rem; }/* contém */
[lang|="pt"]    { font-style: italic; } /* pt ou pt-BR */
[data-status~="ativo"] { /* palavra na lista */ }`}
      />

      <h2>Combinadores</h2>
      <CodeBlock
        language="css"
        code={`/* Descendente — qualquer nível abaixo */
nav a { color: blue; }

/* Filho direto > */
nav > a { font-weight: bold; }

/* Irmão adjacente + (próximo irmão) */
h2 + p { margin-top: 0; }

/* Irmão geral ~ (todos os irmãos depois) */
h2 ~ p { color: #555; }

/* Lista (vírgula) — vários alvos */
h1, h2, h3 { font-family: serif; }`}
      />

      <h2>Pseudo-classes essenciais</h2>
      <CodeBlock
        language="css"
        code={`/* Estado de interação */
a:hover { text-decoration: underline; }
button:active { transform: scale(.97); }
input:focus { outline: 2px solid blue; }
input:focus-visible { /* só com teclado */ }
button:disabled { opacity: .5; }

/* Posição estrutural */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f9f9f9; }
li:nth-child(3n+1) { color: red; }
p:only-child { /* único filho do pai */ }
:empty { display: none; }

/* Validação de formulário */
input:required { border-color: orange; }
input:valid { border-color: green; }
input:invalid:not(:placeholder-shown) { border-color: red; }
input:placeholder-shown { color: #999; }

/* Modernos (2023+) */
form:has(input:invalid) button { opacity: .5; }
:is(h1, h2, h3) { line-height: 1.2; }
:where(article, section) p { margin: 1em 0; }
:not(.btn-primary) { opacity: .8; }`}
      />

      <h2>Pseudo-elementos</h2>
      <CodeBlock
        language="css"
        code={`/* Notação :: distingue de pseudo-classes */
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; float: left; }

/* Conteúdo gerado */
.note::before { content: "📌 "; }
.note::after  { content: " ←"; }

/* Marcadores de lista */
li::marker { color: purple; font-weight: bold; }

/* Texto selecionado */
::selection { background: yellow; color: black; }

/* Placeholder de input */
input::placeholder { color: #aaa; }

/* Detalhe de <details> aberto/fechado */
summary::marker { color: red; }`}
      />

      <h2>:is(), :where() e :has()</h2>
      <CodeBlock
        language="css"
        code={`/* :is() — agrupa, mas usa a maior especificidade interna */
:is(article, section, aside) h2 { font-size: 1.5rem; }
/* Equivale a article h2, section h2, aside h2 */

/* :where() — IDÊNTICO, mas com especificidade ZERO */
:where(article, section, aside) h2 { font-size: 1.5rem; }
/* Útil em "reset" libraries: você pode sobrescrever facilmente */

/* :has() — o "parent selector" que existiu por 25 anos só em sonho */
article:has(img) { padding: 1rem; }
form:has(input:invalid) { border-color: red; }
.card:has(> h2 + p) { /* card com h2 seguido de p */ }
li:has(+ li) { border-bottom: 1px solid #eee; }   /* todos menos o último */`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* Linhas zebradas em tabela */
tbody tr:nth-child(even) { background: #f5f5f5; }

/* Primeiro parágrafo de um artigo destacado */
article > p:first-of-type { font-size: 1.2em; }

/* Skeleton enquanto carrega (sem JS) */
.card[data-loading="true"] { opacity: .4; pointer-events: none; }

/* Sublinhar links externos */
a[href^="http"]:not([href*="meusite.com"])::after {
  content: " ↗";
}

/* Form com erro (parent selector via :has) */
.field:has(input:invalid:not(:placeholder-shown)) label {
  color: red;
}`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="ID em CSS é quase sempre um erro">
        IDs têm especificidade altíssima (100). Uma classe sobrescrever
        um ID exige <code>!important</code>. Use IDs apenas para
        âncoras (<code>href="#sec"</code>) ou JS, nunca para estilo.
      </AlertBox>

      <AlertBox type="warning" title=":nth-child vs :nth-of-type">
        <code>p:nth-child(2)</code> = "o segundo filho, se for p".
        <code>p:nth-of-type(2)</code> = "o segundo p entre os irmãos".
        Confundir os dois é a causa #1 de "minha regra não pega".
      </AlertBox>

      <AlertBox type="danger" title=":has() pode ser pesado">
        Em árvores grandes, <code>:has()</code> recalcula em mudanças
        de subárvore. Evite em seletores universais como
        <code> *:has(.x)</code> ou em listas com milhares de itens.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`/* Especificidade rápida */
*           /* 0,0,0 */
h1          /* 0,0,1 */
.btn        /* 0,1,0 */
a:hover     /* 0,1,1 */
[type=text] /* 0,1,0 */
#main       /* 1,0,0 */
inline=""   /* 1,0,0,0 */
!important  /* vence tudo (use com parcimônia) */`}
      />
    </PageContainer>
  );
}
