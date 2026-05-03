import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { BoxModelDiagram } from "@/components/ui/Diagrams";

export default function BoxModel() {
  return (
    <PageContainer
      title="Box Model"
      subtitle="Vamos começar pela base: TUDO no CSS é uma caixa retangular. Botão, parágrafo, imagem, ícone — tudo. Cada caixa tem 4 camadas, e entender essas camadas resolve 80% dos bugs de espaçamento."
      difficulty="iniciante"
      timeToRead="9 min"
    >
      <h2>A analogia: pense num quadro pendurado na parede</h2>
      <p>
        Imagine uma fotografia emoldurada na sua parede:
      </p>
      <ul>
        <li>A <strong>foto</strong> em si é o <strong>conteúdo</strong>.</li>
        <li>O <strong>passe-partout</strong> (aquela borda branca interna) é o <strong>padding</strong>.</li>
        <li>A <strong>moldura de madeira</strong> é o <strong>border</strong>.</li>
        <li>O <strong>espaço da parede</strong> entre esse quadro e o quadro do lado é o <strong>margin</strong>.</li>
      </ul>
      <p>É exatamente isso que o navegador desenha em cada elemento HTML:</p>

      <BoxModelDiagram />

      <h2>Vendo as camadas no código</h2>
      <VisualDemo
        title="Uma caixa de exemplo"
        description="Borda preta = limite do elemento. Verde claro = padding. Azul = margin (não dá pra ver, mas está ocupando espaço)."
        code={`.caixa {
  width: 200px;
  padding: 24px;        /* 'passe-partout' */
  border: 4px solid #000;
  margin: 16px;         /* espaço externo */
  background: #bae6fd;
}`}
        preview={
          <div className="bg-emerald-100 inline-block">
            <div
              style={{
                width: 200,
                padding: 24,
                border: "4px solid #000",
                background: "#bae6fd",
              }}
            >
              conteúdo
            </div>
          </div>
        }
      />

      <h2>O problema clássico (e a solução de uma linha)</h2>
      <p>
        Por padrão, quando você diz <code>width: 300px</code>, esse valor
        é só do <strong>conteúdo</strong>. Padding e border são
        <strong> somados por fora</strong>. Resultado: a caixa fica maior
        do que você pediu e quebra o layout.
      </p>

      <BeforeAfter
        beforeLabel="❌ Sem box-sizing — fica 348px na tela"
        afterLabel="✅ Com box-sizing: border-box — exatos 300px"
        before={
          <div
            style={{
              width: 300,
              padding: 20,
              border: "4px solid #ef4444",
              background: "#fee2e2",
            }}
          >
            width: 300px<br />
            <small>(real: 348px = 300 + 20·2 + 4·2)</small>
          </div>
        }
        after={
          <div
            style={{
              width: 300,
              padding: 20,
              border: "4px solid #10b981",
              background: "#d1fae5",
              boxSizing: "border-box",
            }}
          >
            width: 300px<br />
            <small>(real: 300px exatos)</small>
          </div>
        }
        caption="A diferença é uma única linha de CSS"
      />

      <CodeBlock
        language="css"
        code={`/* COLE ISTO no início de TODO projeto. Ponto. */
*,
*::before,
*::after {
  box-sizing: border-box;
}`}
      />

      <AlertBox type="success" title="border-box é o padrão de fato">
        Tailwind, Bootstrap, MUI, todo reset CSS sério aplica isso
        globalmente. Configure uma vez e nunca mais sofra com cálculo
        de largura.
      </AlertBox>

      <h2>Exemplo do mundo real: card de produto</h2>
      <VisualDemo
        title="Estrutura típica de um e-commerce"
        code={`.product-card {
  box-sizing: border-box;
  width: 220px;
  padding: 16px;          /* respiro interno */
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  margin: 8px;            /* separa de outros cards */
}
.product-card h3 { margin: 8px 0 4px; font-size: 16px; }
.product-card .price { color: #ea580c; font-weight: 700; }`}
        preview={
          <div
            style={{
              boxSizing: "border-box",
              width: 220,
              padding: 16,
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              background: "white",
            }}
          >
            <div
              style={{
                aspectRatio: "1",
                background: "linear-gradient(135deg,#fbbf24,#ef4444)",
                borderRadius: 8,
              }}
            />
            <h3 style={{ margin: "8px 0 4px", fontSize: 16, fontWeight: 700 }}>
              Tênis Esportivo
            </h3>
            <div style={{ color: "#ea580c", fontWeight: 700 }}>R$ 299,90</div>
          </div>
        }
      />

      <h2>Margin shorthand — 1, 2, 3 ou 4 valores</h2>
      <CodeBlock
        language="css"
        code={`/* 1 valor — todos os lados iguais */
padding: 1rem;

/* 2 valores — cima/baixo | esquerda/direita */
padding: 1rem 2rem;

/* 3 valores — cima | esquerda/direita | baixo */
padding: 1rem 2rem 0.5rem;

/* 4 valores — cima | direita | baixo | esquerda (sentido horário) */
padding: 1rem 2rem 0.5rem 0;

/* Modernos: lógicos (funcionam em qualquer direção de texto) */
padding-block: 1rem;     /* topo + base */
padding-inline: 2rem;    /* esquerda + direita */`}
      />

      <h2>O fenômeno "margem some" (margin collapse)</h2>
      <p>
        Quando dois blocos verticais têm margem entre eles, o
        navegador <strong>não soma</strong> — usa só a maior.
      </p>

      <VisualDemo
        bg="checker"
        code={`.a { margin-bottom: 30px; }
.b { margin-top: 50px; }
/* Espaço final entre A e B = 50px (não 80!) */`}
        preview={
          <div>
            <div style={{ background: "#fde68a", padding: 8, marginBottom: 30 }}>A</div>
            <div style={{ background: "#bfdbfe", padding: 8, marginTop: 50 }}>B</div>
          </div>
        }
      />

      <p>
        Na maioria das vezes isso é <em>bom</em> — evita espaços duplos
        entre títulos e parágrafos. Mas se você quer somar, basta:
      </p>
      <CodeBlock
        language="css"
        code={`/* Qualquer um destes "quebra" o colapso */
.parent { display: flex; flex-direction: column; }
.parent { display: grid; }
.parent { padding: .01px 0; }
.parent { overflow: hidden; }`}
      />

      <h2>display: o tipo da caixa</h2>
      <VisualDemo
        bg="light"
        code={`.block { display: block; }        /* ocupa linha inteira */
.inline { display: inline; }       /* fica no meio do texto */
.inline-block { display: inline-block; } /* misto */`}
        preview={
          <div style={{ fontSize: 14 }}>
            <div style={{ background: "#dbeafe", padding: 6, marginBottom: 6 }}>
              block — sou uma faixa inteira
            </div>
            <div>
              No meio de um texto eu posso ter{" "}
              <span style={{ background: "#fef3c7", padding: "2px 6px" }}>inline</span>{" "}
              ou{" "}
              <span
                style={{
                  background: "#dcfce7",
                  padding: "4px 8px",
                  display: "inline-block",
                  borderRadius: 4,
                }}
              >
                inline-block
              </span>{" "}
              que aceita padding/largura.
            </div>
          </div>
        }
      />

      <ul>
        <li><strong>block</strong> — divs, parágrafos, headings. Ocupam linha inteira.</li>
        <li><strong>inline</strong> — span, a, strong. Fluem dentro do texto. Ignoram width/height.</li>
        <li><strong>inline-block</strong> — flui inline, mas aceita box completo (botões, tags).</li>
        <li><strong>none</strong> — desaparece da tela <em>e</em> da árvore de acessibilidade.</li>
      </ul>

      <h2>border vs outline (a diferença que salva foco acessível)</h2>
      <BeforeAfter
        beforeLabel="border — empurra o texto"
        afterLabel="outline — não empurra nada"
        before={
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ padding: 8, background: "#fff" }}>normal</button>
            <button style={{ padding: 8, background: "#fff", border: "3px solid #2563eb" }}>
              focado
            </button>
            <small className="text-slate-500 self-center">↑ 6px maior</small>
          </div>
        }
        after={
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ padding: 8, background: "#fff" }}>normal</button>
            <button
              style={{
                padding: 8,
                background: "#fff",
                outline: "3px solid #2563eb",
                outlineOffset: 2,
              }}
            >
              focado
            </button>
            <small className="text-slate-500 self-center">↑ mesmo tamanho</small>
          </div>
        }
        caption="Sempre prefira outline para anel de foco — não desloca o layout."
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="display: none não é a mesma coisa que opacity: 0">
        <ul>
          <li><code>display:none</code> — some pra todo mundo (inclusive leitores de tela).</li>
          <li><code>visibility:hidden</code> — ocupa espaço, some pra leitores.</li>
          <li><code>opacity:0</code> — invisível mas <em>ainda clicável e lido</em> por leitores. Cuidado!</li>
        </ul>
      </AlertBox>

      <AlertBox type="danger" title="height: 100% precisa de pai com altura">
        Se nada na cadeia de pais tem altura definida, <code>height: 100%</code>
        vira <em>0</em>. Em layouts de página inteira, prefira
        <code> min-height: 100dvh</code> (que é a altura do viewport).
      </AlertBox>

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`/* Cole no início de TODO projeto */
*, *::before, *::after { box-sizing: border-box; }

/* Camadas (de dentro pra fora) */
content → padding → border → margin

/* Shorthand */
padding: 1rem 2rem 0 .5rem    /* T R B L (horário) */
margin-inline: auto           /* centraliza horizontal */
margin-block: 1rem            /* topo + base */

/* Tipos de caixa */
display: block | inline | inline-block | none

/* Foco acessível */
outline: 2px solid             /* não empurra layout */
border:  2px solid             /* empurra (cuidado) */`}
      />
    </PageContainer>
  );
}
