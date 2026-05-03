import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";
import { GridLinesDiagram } from "@/components/ui/Diagrams";

const cell = (label: string, color = "#6366f1") => ({
  background: color,
  color: "white",
  padding: "12px 8px",
  borderRadius: 6,
  fontSize: 12,
  fontWeight: 600,
  textAlign: "center" as const,
});

export default function Grid() {
  return (
    <PageContainer
      title="CSS Grid"
      subtitle="Se Flexbox é uma fila, Grid é uma tábua de xadrez. Você define linhas E colunas ao mesmo tempo, e os elementos vão se encaixando — perfeito para páginas inteiras, dashboards e galerias."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <h2>A analogia: planejar o layout de um jornal</h2>
      <p>
        Imagine que você é editor de um jornal. Você desenha um quadro
        com colunas e linhas, depois encaixa as matérias nesse quadro:
        manchete em cima ocupando 3 colunas, foto ao lado, anúncio no
        rodapé. CSS Grid faz exatamente isso, só que no navegador.
      </p>

      <GridLinesDiagram />

      <h2>O básico: definindo colunas</h2>
      <VisualDemo
        title="Três colunas iguais com gap"
        code={`.galeria {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* 3 partes iguais */
  gap: 12px;
}`}
        preview={
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div style={cell("1")}>1</div>
            <div style={cell("2", "#8b5cf6")}>2</div>
            <div style={cell("3", "#10b981")}>3</div>
            <div style={cell("4", "#f59e0b")}>4</div>
            <div style={cell("5", "#ef4444")}>5</div>
            <div style={cell("6", "#06b6d4")}>6</div>
          </div>
        }
      />

      <p>
        <strong>fr</strong> significa <em>"fração do que sobrar"</em>.
        Com <code>1fr 1fr 1fr</code>, você divide o espaço em 3 pedaços
        iguais. Com <code>1fr 2fr 1fr</code>, o do meio é o dobro
        dos outros.
      </p>

      <h2>O atalho que dispensa media query</h2>
      <VisualDemo
        title="auto-fit + minmax — galeria que se adapta sozinha"
        description="Cresce e diminui de número de colunas conforme a largura. Sem precisar de @media."
        code={`.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}`}
        preview={
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 12,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  padding: 16,
                  borderRadius: 8,
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1e293b",
                }}
              >
                Card {n}
              </div>
            ))}
          </div>
        }
      />

      <p>
        <strong>O segredo:</strong> "<em>repetir colunas, encaixando o
        máximo possível, com no mínimo 160px e no máximo 1fr cada
        uma</em>". Mude o tamanho da janela e veja o número de colunas
        mudar magicamente.
      </p>

      <h2>Posicionando itens em células específicas</h2>
      <VisualDemo
        title="Um card que ocupa 2 colunas"
        code={`.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.cards .destaque { grid-column: span 2; background: gold; }`}
        preview={
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            <div style={cell("1")}>1</div>
            <div style={{ ...cell("2", "#fbbf24"), gridColumn: "span 2", color: "#78350f" }}>
              destaque (span 2)
            </div>
            <div style={cell("3")}>3</div>
            <div style={cell("4")}>4</div>
            <div style={cell("5")}>5</div>
          </div>
        }
      />

      <h2>O super-poder: áreas nomeadas</h2>
      <p>
        Em vez de números, você pode dar <strong>nomes</strong> às
        regiões do layout. É a forma mais legível e fica parecendo um
        mapa ASCII da página:
      </p>

      <VisualDemo
        title="Layout de aplicação clássico (header / sidebar / main / footer)"
        code={`.app {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  gap: 8px;
  height: 240px;
}
.app header  { grid-area: header; }
.app aside   { grid-area: sidebar; }
.app main    { grid-area: main; }
.app footer  { grid-area: footer; }`}
        preview={
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gridTemplateRows: "auto 1fr auto",
              gridTemplateAreas: '"header header" "sidebar main" "footer footer"',
              gap: 6,
              height: 240,
            }}
          >
            <div style={{ ...cell("h", "#1e293b"), gridArea: "header" }}>HEADER</div>
            <div style={{ ...cell("s", "#475569"), gridArea: "sidebar" }}>SIDEBAR</div>
            <div style={{ ...cell("m", "#94a3b8"), gridArea: "main", color: "#0f172a" }}>
              MAIN
            </div>
            <div style={{ ...cell("f", "#1e293b"), gridArea: "footer" }}>FOOTER</div>
          </div>
        }
      />

      <h2>Exemplo do mundo real: dashboard</h2>
      <VisualDemo
        title="Cards de KPI + gráfico grande + lista lateral"
        code={`.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 60px 200px;
  grid-template-areas:
    "kpi1 kpi2 kpi3"
    "chart chart side";
  gap: 12px;
}`}
        preview={
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "50px 140px",
              gridTemplateAreas: '"kpi1 kpi2 kpi3" "chart chart side"',
              gap: 8,
            }}
          >
            <div style={{ ...cell("", "#3b82f6"), gridArea: "kpi1" }}>
              R$ 12k<br />
              <small style={{ opacity: 0.7 }}>vendas</small>
            </div>
            <div style={{ ...cell("", "#10b981"), gridArea: "kpi2" }}>
              348<br />
              <small style={{ opacity: 0.7 }}>pedidos</small>
            </div>
            <div style={{ ...cell("", "#f59e0b"), gridArea: "kpi3" }}>
              92%<br />
              <small style={{ opacity: 0.7 }}>aprovação</small>
            </div>
            <div
              style={{
                ...cell("", "#1e293b"),
                gridArea: "chart",
                display: "flex",
                alignItems: "flex-end",
                gap: 4,
                padding: 12,
              }}
            >
              {[40, 70, 50, 90, 60, 80, 100].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    background: "linear-gradient(to top,#3b82f6,#a855f7)",
                    borderRadius: "4px 4px 0 0",
                  }}
                />
              ))}
            </div>
            <div style={{ ...cell("", "#475569"), gridArea: "side", padding: 8, fontSize: 11 }}>
              📋 Lista<br />
              <small style={{ opacity: 0.7 }}>top produtos</small>
            </div>
          </div>
        }
      />

      <h2>Exemplo do mundo real: galeria de fotos responsiva</h2>
      <VisualDemo
        title="Grid + auto-fit + aspect-ratio (sem JS, sem media query)"
        code={`.fotos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
}
.fotos img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 8px; }`}
        preview={
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
              gap: 8,
            }}
          >
            {[
              "linear-gradient(135deg,#fbbf24,#ef4444)",
              "linear-gradient(135deg,#34d399,#3b82f6)",
              "linear-gradient(135deg,#a78bfa,#ec4899)",
              "linear-gradient(135deg,#22d3ee,#6366f1)",
              "linear-gradient(135deg,#f87171,#fb923c)",
              "linear-gradient(135deg,#4ade80,#0ea5e9)",
              "linear-gradient(135deg,#facc15,#84cc16)",
              "linear-gradient(135deg,#c084fc,#f472b6)",
            ].map((g, i) => (
              <div key={i} style={{ aspectRatio: 1, background: g, borderRadius: 8 }} />
            ))}
          </div>
        }
      />

      <h2>Grid vs Flexbox — quando usar cada um?</h2>
      <div className="not-prose grid md:grid-cols-2 gap-3 my-6">
        <div className="rounded-xl border border-border p-4 bg-card">
          <h3 className="font-bold text-primary">Use Grid quando…</h3>
          <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
            <li>• Layout da página inteira (header/main/sidebar/footer)</li>
            <li>• Galeria, dashboard, mosaico</li>
            <li>• Você sabe onde cada coisa vai (linhas E colunas)</li>
            <li>• Form em duas colunas alinhadas</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border p-4 bg-card">
          <h3 className="font-bold text-primary">Use Flex quando…</h3>
          <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
            <li>• Conteúdo de tamanho variável numa linha</li>
            <li>• Toolbar, navbar, lista de tags</li>
            <li>• Centralizar uma coisa só</li>
            <li>• Dentro das células do Grid (componentes)</li>
          </ul>
        </div>
      </div>

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="auto-fit com 1 item só estica tudo">
        Se houver apenas um card, ele vai ocupar 100% da largura. Use
        <code> auto-fill </code> em vez de <code>auto-fit</code> se
        quer manter o tamanho mínimo.
      </AlertBox>

      <AlertBox type="danger" title="grid-template-areas: aspas precisam alinhar células">
        Cada string entre aspas precisa ter o <em>mesmo número de
        palavras</em>. Indente em monoespaçada (como no exemplo) para
        visualizar e evitar bugs silenciosos.
      </AlertBox>

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`/* O básico */
display: grid;
grid-template-columns: 1fr 1fr 1fr;          /* 3 colunas iguais */
grid-template-columns: 200px 1fr;            /* fixa + flex */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* responsivo */
gap: 1rem;

/* Posicionar itens */
grid-column: span 2;       /* ocupa 2 colunas */
grid-column: 1 / -1;       /* da primeira até a última (linha inteira) */
grid-area: header;         /* colocar numa área nomeada */

/* Áreas nomeadas (mais legível) */
grid-template-areas:
  "header header"
  "side   main"
  "footer footer";

/* Combo: Grid pra layout, Flex pra dentro das células */`}
      />
    </PageContainer>
  );
}
