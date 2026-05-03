import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { FlexAxesDiagram } from "@/components/ui/Diagrams";

const item = (n: number, c = "#3b82f6") => ({
  background: c,
  color: "white",
  padding: "10px 14px",
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 600,
  textAlign: "center" as const,
});

export default function Flexbox() {
  return (
    <PageContainer
      title="Flexbox"
      subtitle="O jeito mais simples de alinhar coisas em CSS. Pense numa fila do banco: você decide a ordem, o espaço entre as pessoas, e quem fica no canto. É isso que Flexbox faz com seus elementos."
      difficulty="iniciante"
      timeToRead="13 min"
    >
      <h2>A analogia: organizando um aperitivo na bandeja</h2>
      <p>
        Imagine que você tem uma bandeja (o <strong>container</strong>) e
        vai colocar petiscos nela (os <strong>itens</strong>). Você decide:
      </p>
      <ul>
        <li>Vão ficar em linha ou em coluna? <em>(flex-direction)</em></li>
        <li>Quanto espaço entre eles? <em>(gap)</em></li>
        <li>Encostados na esquerda? Centralizados? Espalhados? <em>(justify-content)</em></li>
        <li>Alinhados em cima, no meio ou embaixo da bandeja? <em>(align-items)</em></li>
      </ul>

      <h2>Os dois eixos: main e cross</h2>
      <p>
        Flexbox trabalha com <strong>dois eixos</strong>. Um deles é o
        principal (o sentido em que os itens fluem), o outro é o
        perpendicular. Quem manda no main é o <code>justify-content</code>,
        quem manda no cross é o <code>align-items</code>.
      </p>

      <FlexAxesDiagram />

      <h2>Ligando o flex (container)</h2>
      <VisualDemo
        title="A linha mágica: display: flex"
        code={`.bandeja {
  display: flex;
  gap: 12px;       /* espaço entre os itens */
}`}
        preview={
          <div style={{ display: "flex", gap: 12 }}>
            <div style={item(1)}>1</div>
            <div style={item(2)}>2</div>
            <div style={item(3)}>3</div>
          </div>
        }
      />

      <h2>justify-content: distribuindo no eixo principal</h2>
      {[
        ["flex-start", "flex-start"],
        ["center", "center"],
        ["space-between", "space-between"],
        ["space-around", "space-around"],
        ["space-evenly", "space-evenly"],
      ].map(([label, val]) => (
        <VisualDemo
          key={label}
          code={`.container { display: flex; justify-content: ${val}; }`}
          preview={
            <div
              style={{
                display: "flex",
                justifyContent: val as any,
                background: "#f1f5f9",
                padding: 8,
                borderRadius: 8,
              }}
            >
              <div style={item(1)}>A</div>
              <div style={item(2, "#8b5cf6")}>B</div>
              <div style={item(3, "#10b981")}>C</div>
            </div>
          }
          stack
        />
      ))}

      <h2>align-items: alinhando no eixo perpendicular</h2>
      {[
        ["flex-start", "flex-start"],
        ["center", "center"],
        ["flex-end", "flex-end"],
        ["stretch", "stretch"],
      ].map(([label, val]) => (
        <VisualDemo
          key={label}
          code={`.container { display: flex; align-items: ${val}; height: 120px; }`}
          preview={
            <div
              style={{
                display: "flex",
                alignItems: val as any,
                height: 120,
                gap: 8,
                background: "#f1f5f9",
                padding: 8,
                borderRadius: 8,
              }}
            >
              <div style={{ ...item(1), height: val === "stretch" ? "auto" : 30 }}>A</div>
              <div
                style={{
                  ...item(2, "#8b5cf6"),
                  height: val === "stretch" ? "auto" : 50,
                }}
              >
                B
              </div>
              <div
                style={{
                  ...item(3, "#10b981"),
                  height: val === "stretch" ? "auto" : 70,
                }}
              >
                C
              </div>
            </div>
          }
          stack
        />
      ))}

      <h2>O atalho que centraliza tudo (sem mistério)</h2>
      <BeforeAfter
        beforeLabel="❌ Antes (várias técnicas, todas chatas)"
        afterLabel="✅ Com flex (3 linhas)"
        before={
          <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>
            • position absolute + transform translate
            <br />• line-height igual ao height
            <br />• margin auto que só funciona às vezes
            <br />• table-cell + vertical-align: middle
          </div>
        }
        after={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 100,
              background: "#0f172a",
              color: "white",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            🎯 centralizado
          </div>
        }
      />

      <CodeBlock
        language="css"
        code={`.center {
  display: flex;
  justify-content: center;   /* horizontal */
  align-items: center;       /* vertical */
}`}
      />

      <h2>flex-direction: trocando o sentido</h2>
      <VisualDemo
        code={`.col { display: flex; flex-direction: column; gap: 8px; }`}
        preview={
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 120 }}>
            <div style={item(1)}>1</div>
            <div style={item(2, "#8b5cf6")}>2</div>
            <div style={item(3, "#10b981")}>3</div>
          </div>
        }
        stack
      />

      <h2>Itens: a propriedade flex</h2>
      <p>
        Cada item pode ganhar uma "voz" sobre quanto espaço quer. A
        propriedade mais usada é <code>flex: 1</code> — significa
        <em>"divida o espaço sobrando igualmente entre os itens que têm
        flex:1"</em>.
      </p>

      <VisualDemo
        title="Sidebar fixa + conteúdo elástico (padrão clássico)"
        code={`.layout { display: flex; gap: 12px; }
.sidebar { flex: 0 0 120px; }   /* não cresce, não encolhe, fica em 120px */
.main    { flex: 1; }           /* preenche o resto */`}
        preview={
          <div style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                flex: "0 0 120px",
                background: "#1e293b",
                color: "white",
                padding: 16,
                borderRadius: 6,
                fontSize: 13,
              }}
            >
              menu
            </div>
            <div
              style={{
                flex: 1,
                background: "#f1f5f9",
                padding: 16,
                borderRadius: 6,
                fontSize: 13,
                color: "#1e293b",
              }}
            >
              área principal — esticou para preencher tudo que sobrou
            </div>
          </div>
        }
      />

      <h2>Exemplo do mundo real: header de e-commerce</h2>
      <VisualDemo
        title="Logo à esquerda, busca no meio, ícones à direita"
        code={`.header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 24px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}
.header .search { flex: 1; }   /* busca cresce e empurra ícones pra direita */`}
        preview={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              padding: "12px 16px",
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 18, color: "#ea580c" }}>SHOP</div>
            <input
              placeholder="🔍 buscar produtos..."
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: 6,
                fontSize: 13,
              }}
              readOnly
            />
            <div style={{ display: "flex", gap: 12, fontSize: 18 }}>
              <span>👤</span>
              <span>❤️</span>
              <span>🛒</span>
            </div>
          </div>
        }
      />

      <h2>Exemplo do mundo real: lista de tags que quebra linha</h2>
      <VisualDemo
        title="flex-wrap salva listas longas"
        code={`.tags {
  display: flex;
  flex-wrap: wrap;       /* deixa quebrar em várias linhas */
  gap: 8px;
}
.tag { padding: 4px 10px; background: #ede9fe; color: #6d28d9; border-radius: 999px; font-size: 12px; }`}
        preview={
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["react", "css", "frontend", "tailwind", "vite", "javascript", "design", "ux", "responsivo"].map(
              (t) => (
                <span
                  key={t}
                  style={{
                    padding: "4px 10px",
                    background: "#ede9fe",
                    color: "#6d28d9",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  #{t}
                </span>
              )
            )}
          </div>
        }
      />

      <h2>Exemplo do mundo real: card com botão "grudado embaixo"</h2>
      <VisualDemo
        title="margin-top: auto — o pequeno truque que vale ouro"
        code={`.card {
  display: flex;
  flex-direction: column;
  height: 200px;
}
.card button {
  margin-top: auto;   /* empurra o botão para o fim */
}`}
        preview={
          <div style={{ display: "flex", gap: 12 }}>
            {["Plano A", "Plano B"].map((p) => (
              <div
                key={p}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 140,
                  height: 200,
                  padding: 16,
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  background: "white",
                }}
              >
                <div style={{ fontWeight: 700 }}>{p}</div>
                <p style={{ fontSize: 12, color: "#64748b", margin: "8px 0" }}>
                  {p === "Plano A" ? "Tudo o que você precisa." : "Mais recursos avançados."}
                </p>
                <button
                  style={{
                    marginTop: "auto",
                    padding: "8px",
                    background: "#3b82f6",
                    color: "white",
                    border: 0,
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Assinar
                </button>
              </div>
            ))}
          </div>
        }
      />

      <h2>Tabela de propriedades — o resumo prático</h2>
      <CodeBlock
        language="css"
        code={`/* No CONTAINER */
display: flex;
flex-direction: row | column;     /* sentido */
flex-wrap: wrap;                  /* permite quebrar */
gap: 1rem;                        /* espaço entre itens */
justify-content: center | space-between | space-evenly;  /* main */
align-items:    center | stretch | flex-end;             /* cross */

/* Nos ITENS */
flex: 1;                          /* preenche o que sobrar */
flex: 0 0 200px;                  /* fixo em 200px */
align-self: flex-end;             /* só este item alinha diferente */
order: -1;                        /* puxa pro início */
margin-top: auto;                 /* empurra pra baixo (em coluna) */`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Texto longo estoura o flex">
        Itens flex têm <code>min-width: auto</code> por padrão — não
        encolhem abaixo do conteúdo. Se um título longo está estourando,
        adicione <code>min-width: 0</code> no item.
      </AlertBox>

      <AlertBox type="danger" title="Centralizar com margin: 0 auto não funciona em flex item">
        Em flex container, use <code>justify-content: center</code> no
        pai. Ou então o truque da margem que existe sim mas funciona
        diferente em flex.
      </AlertBox>

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`/* Centralizar tudo */
display: flex; justify-content: center; align-items: center;

/* Sidebar fixa + conteúdo flex */
.sidebar { flex: 0 0 240px; }
.main    { flex: 1; }

/* Empurrar último à direita */
.right   { margin-left: auto; }

/* Lista que quebra linha */
display: flex; flex-wrap: wrap; gap: 1rem;

/* Botão grudado embaixo do card */
.card { display: flex; flex-direction: column; }
.card .btn { margin-top: auto; }`}
      />
    </PageContainer>
  );
}
