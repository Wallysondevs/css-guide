import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";

export default function Seletores() {
  return (
    <PageContainer
      title="Seletores"
      subtitle="Antes de estilizar, você precisa apontar PARA O QUÊ. Seletores são o jeito de dizer 'todos os botões', 'os links que estão dentro de um menu', 'os campos preenchidos errado'. Vamos do básico ao avançado."
      difficulty="iniciante"
      timeToRead="13 min"
    >
      <h2>A analogia: organizar uma lista de presença</h2>
      <p>
        Imagine que você precisa marcar pessoas numa sala. Pode dizer:
        "todo mundo de azul" (classe), "a Ana especificamente" (ID),
        "qualquer pessoa de óculos" (atributo), "as crianças que estão
        sentadas" (estado). Seletores funcionam assim: cada um é uma
        forma diferente de filtrar elementos da página.
      </p>

      <h2>Os 4 jeitos básicos de mirar</h2>
      <VisualDemo
        title="Por tag, classe, ID e atributo"
        code={`/* Por TAG (todos os <button>) */
button { background: #3b82f6; color: white; }

/* Por CLASSE (qualquer elemento com class="primario") */
.primario { background: #ef4444; }

/* Por ID (UM elemento específico) */
#confirmar { background: #10b981; }

/* Por ATRIBUTO */
[disabled] { opacity: .5; cursor: not-allowed; }`}
        preview={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(
              [
                { label: "tag", bg: "#3b82f6" },
                { label: "classe", bg: "#ef4444" },
                { label: "id", bg: "#10b981" },
                { label: "atributo", bg: "#cbd5e1", style: { opacity: 0.5, cursor: "not-allowed", color: "#1e293b" } as any },
              ] as const
            ).map((b) => (
              <button
                key={b.label}
                style={{
                  background: b.bg,
                  color: "white",
                  padding: "8px 14px",
                  border: 0,
                  borderRadius: 6,
                  fontWeight: 600,
                  fontSize: 13,
                  ...((b as any).style || {}),
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        }
      />

      <AlertBox type="warning" title="Use classes — quase sempre">
        IDs têm prioridade altíssima e ficam difíceis de sobrescrever
        depois. <strong>Regra de ouro:</strong> ID só pra âncora
        (<code>href="#topo"</code>) ou JavaScript. Para estilo, use
        classe.
      </AlertBox>

      <h2>Combinadores: navegando entre elementos</h2>
      <CodeBlock
        language="css"
        code={`/* Descendente — qualquer nível abaixo */
nav a            { color: blue; }   /* qualquer <a> dentro de <nav> */

/* Filho direto > — só descendente imediato */
nav > a          { font-weight: bold; }

/* Próximo irmão + */
h2 + p           { margin-top: 0; }  /* o p logo após h2 */

/* Todos os irmãos depois ~ */
h2 ~ p           { color: gray; }    /* todos os p depois do h2 */

/* Vários alvos (vírgula) */
h1, h2, h3       { font-family: serif; }`}
      />

      <h2>Pseudo-classes: estados do elemento</h2>
      <p>
        Pseudo-classes começam com <code>:</code> e descrevem
        <strong> em que estado</strong> o elemento está agora.
      </p>

      <VisualDemo
        title="Hover e focus em ação — passe o mouse / clique no input"
        code={`.btn { background: #3b82f6; transition: background .2s; }
.btn:hover { background: #1d4ed8; }     /* mouse em cima */

.input { border: 2px solid #cbd5e1; }
.input:focus { outline: 0; border-color: #3b82f6; }`}
        preview={
          <div style={{ display: "flex", gap: 12 }}>
            <button
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "10px 16px",
                border: 0,
                borderRadius: 6,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background .2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1d4ed8")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#3b82f6")}
            >
              Passe o mouse
            </button>
            <input
              placeholder="Clique aqui"
              style={{
                padding: "10px 12px",
                border: "2px solid #cbd5e1",
                borderRadius: 6,
                fontSize: 13,
              }}
            />
          </div>
        }
      />

      <h2>Pseudo-classes mais úteis no dia a dia</h2>
      <CodeBlock
        language="css"
        code={`/* Estados de interação */
a:hover     { text-decoration: underline; }
button:active { transform: scale(.97); }
input:focus { outline: 2px solid blue; }
input:focus-visible { /* só se foi focado pelo TECLADO */ }
button:disabled { opacity: .5; }

/* Posição entre irmãos */
li:first-child  { font-weight: bold; }
li:last-child   { border-bottom: none; }
li:nth-child(odd)  { background: #f9f9f9; }   /* zebra */
li:nth-child(3n+1) { color: red; }            /* a cada 3, começando no 1 */

/* Validação de form */
input:required { border-color: orange; }
input:valid    { border-color: green; }
input:invalid  { border-color: red; }
input:placeholder-shown { color: #999; }      /* ainda vazio */`}
      />

      <h2>Exemplo do mundo real: tabela com listras</h2>
      <VisualDemo
        title="Linhas alternadas com nth-child(even)"
        code={`tbody tr:nth-child(even) {
  background: #f8fafc;
}`}
        preview={
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#1e293b", color: "white" }}>
                <th style={{ padding: 8, textAlign: "left" }}>Produto</th>
                <th style={{ padding: 8, textAlign: "right" }}>Preço</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Camiseta", "R$ 49"],
                ["Tênis", "R$ 299"],
                ["Boné", "R$ 39"],
                ["Mochila", "R$ 159"],
              ].map(([p, v], i) => (
                <tr key={p} style={{ background: i % 2 ? "#f8fafc" : "white" }}>
                  <td style={{ padding: 8 }}>{p}</td>
                  <td style={{ padding: 8, textAlign: "right" }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      />

      <h2>:has() — o "sou pai de…"</h2>
      <p>
        Por 25 anos, CSS não conseguia dizer "estilize o card que
        tem uma imagem dentro". Em 2023 chegou o <code>:has()</code> e
        mudou tudo:
      </p>

      <BeforeAfter
        beforeLabel="❌ Sem :has() — todos iguais"
        afterLabel="✅ Com :has(img) — destaca os com foto"
        before={
          <div style={{ display: "grid", gap: 8 }}>
            {["Card sem foto", "Card sem foto", "Card sem foto"].map((t, i) => (
              <div
                key={i}
                style={{
                  padding: 10,
                  border: "1px solid #cbd5e1",
                  borderRadius: 6,
                  fontSize: 12,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        }
        after={
          <div style={{ display: "grid", gap: 8 }}>
            <div
              style={{
                padding: 10,
                border: "2px solid #3b82f6",
                borderRadius: 6,
                fontSize: 12,
                background: "#dbeafe",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg,#fbbf24,#ef4444)",
                  borderRadius: 4,
                }}
              />
              Card COM foto
            </div>
            <div style={{ padding: 10, border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 12 }}>
              Card sem foto
            </div>
          </div>
        }
      />

      <CodeBlock
        language="css"
        code={`/* Estilizar o pai baseado no que ele CONTÉM */
.card:has(img) {
  border: 2px solid blue;
  background: #eff6ff;
}

/* Form com qualquer input inválido — desabilita o submit */
form:has(input:invalid) button[type="submit"] {
  opacity: .5;
  pointer-events: none;
}

/* Body trava scroll quando modal está aberto (substitui JS) */
body:has(dialog[open]) { overflow: hidden; }`}
      />

      <h2>Pseudo-elementos: criando "partes" do elemento</h2>
      <p>
        Começam com <code>::</code> (duplo) e estilizam pedaços virtuais
        — primeira letra, primeira linha, marker de lista, etc.
      </p>

      <VisualDemo
        code={`p::first-letter { font-size: 2.4em; font-weight: 800; color: #ea580c; float: left; padding-right: 6px; }
::selection { background: #fde047; color: #422006; }`}
        preview={
          <p style={{ fontSize: 14, lineHeight: 1.5, margin: 0 }}>
            <span style={{ fontSize: "2.4em", fontWeight: 800, color: "#ea580c", float: "left", paddingRight: 6, lineHeight: 1 }}>
              E
            </span>
            ra uma vez um parágrafo com letra capitular. Tente
            selecionar este texto e veja a cor do destaque.
          </p>
        }
      />

      <h2>Cuidado com a especificidade</h2>
      <p>
        Cada tipo de seletor "vale" um peso diferente. Quando duas
        regras conflitam, ganha quem tiver maior peso:
      </p>
      <CodeBlock
        language="css"
        code={`/* Peso (pense como contagem de pontos) */
*           /* 0 pontos — universal */
button      /* 1 ponto — tag */
.btn        /* 10 pontos — classe */
[type=text] /* 10 pontos — atributo */
:hover      /* 10 pontos — pseudo-classe */
#confirma   /* 100 pontos — id */
style="..." /* 1000 pontos — inline */
!important  /* trump card, vence tudo do mesmo nível */`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title=":nth-child vs :nth-of-type">
        <code>p:nth-child(2)</code> = "o segundo filho, SE for p". Se o
        segundo filho for um div, não pega ninguém.<br />
        <code>p:nth-of-type(2)</code> = "o segundo p entre os irmãos".
        Confundir os dois é o bug nº 1 de "minha regra não pega".
      </AlertBox>

      <AlertBox type="danger" title=":has() pode pesar">
        Em listas com milhares de itens ou seletores universais
        (<code>*:has(.x)</code>), o navegador precisa re-avaliar a cada
        mudança. Use com moderação em árvores grandes.
      </AlertBox>

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`/* Básicos */
button   /* tag */
.classe  /* classe — use SEMPRE que puder */
#id      /* só pra âncora ou JS */
[attr]   /* atributo */

/* Combinadores */
A B   /* descendente */
A > B /* filho direto */
A + B /* irmão imediato */
A, B  /* vários alvos */

/* Estados úteis */
:hover  :focus  :focus-visible  :disabled
:first-child  :nth-child(odd)
:required  :valid  :invalid

/* Modernos */
:is(h1, h2, h3)         /* agrupar */
:where(...)             /* agrupar com peso 0 */
parent:has(img)         /* selecionar pai pelo filho */

/* Pseudo-elementos (::) */
::before  ::after  ::first-letter  ::selection  ::placeholder`}
      />
    </PageContainer>
  );
}
