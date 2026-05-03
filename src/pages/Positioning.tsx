import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";
import { PositionDiagram } from "@/components/ui/Diagrams";

export default function Positioning() {
  return (
    <PageContainer
      title="Position e Z-index"
      subtitle="Tooltip, modal, badge no canto, header pegajoso, menu suspenso — tudo isso depende de uma propriedade só: position. Ela é a fonte da metade dos bugs visuais que você vai encontrar."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Os 5 valores e o que cada um significa</h2>
      <PositionDiagram />

      <h2>relative — fica no fluxo, mas pode ser empurrado</h2>
      <VisualDemo
        title="Empurra o elemento sem tirar do lugar 'real'"
        code={`.box { position: relative; top: 12px; left: 20px; }
/* Visualmente desloca, mas o ESPAÇO original continua reservado */`}
        preview={
          <div style={{ background: "#f1f5f9", padding: 12, borderRadius: 6 }}>
            <div
              style={{
                position: "relative",
                top: 12,
                left: 20,
                background: "#3b82f6",
                color: "white",
                padding: 8,
                borderRadius: 4,
                display: "inline-block",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              empurrado 12px↓ 20px→
            </div>
          </div>
        }
      />

      <h2>absolute — sai do fluxo, ancora no pai posicionado</h2>
      <p>
        Esta é a base de quase todo elemento "flutuante" (badge,
        dropdown, tooltip). A regra de ouro:
        <strong> o pai precisa ter position: relative</strong> (ou
        absolute, fixed, sticky). Senão o filho vai parar lá longe.
      </p>

      <VisualDemo
        title="Badge no canto de um card"
        code={`.card { position: relative; }   /* sem isso o badge vai pra qualquer lugar */
.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 999px;
  padding: 2px 8px;
}`}
        preview={
          <div
            style={{
              position: "relative",
              padding: 16,
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              width: 180,
              fontSize: 13,
              color: "#0f172a",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                background: "#ef4444",
                color: "white",
                borderRadius: 999,
                padding: "2px 8px",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              NOVO
            </span>
            Card de produto
          </div>
        }
      />

      <h2>fixed — preso ao viewport, não rola com a página</h2>
      <CodeBlock
        language="css"
        code={`/* Banner de cookies que fica sempre visível */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: #1e293b;
  color: white;
}

/* Botão flutuante "voltar ao topo" */
.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
}`}
      />

      <h2>sticky — relative que vira fixed na hora certa</h2>
      <p>
        O navegador trata como <code>relative</code> normalmente. Quando
        a página rola e o elemento tenta sair de vista, ele <em>gruda</em>
        no limite (top, bottom, etc.) e fica fixo até o pai sair junto.
      </p>

      <VisualDemo
        title="Header de seção que gruda enquanto você lê o conteúdo"
        description="(Imagine este preview rolando — o título cinza ficaria fixado no topo da seção)"
        code={`.section-title {
  position: sticky;
  top: 0;
  background: white;
  padding: 8px;
  z-index: 10;
}`}
        preview={
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              maxHeight: 120,
              overflow: "auto",
            }}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                background: "#1e293b",
                color: "white",
                padding: 8,
                fontWeight: 600,
                fontSize: 13,
                zIndex: 10,
              }}
            >
              📌 Categoria: Eletrônicos
            </div>
            <div style={{ padding: 12, fontSize: 12, color: "#475569" }}>
              <p>Item 1 — role para baixo no preview e veja o título grudar</p>
              <p>Item 2</p>
              <p>Item 3</p>
              <p>Item 4</p>
              <p>Item 5</p>
              <p>Item 6</p>
            </div>
          </div>
        }
      />

      <h2>inset — atalho moderno para top/right/bottom/left</h2>
      <CodeBlock
        language="css"
        code={`/* Antes */
.modal { position: fixed; top: 0; right: 0; bottom: 0; left: 0; }

/* Hoje */
.modal { position: fixed; inset: 0; }   /* preenche o viewport */
.modal { position: fixed; inset: 16px; } /* recua 16px de cada lado */
.modal { position: fixed; inset: auto 0 0 0; } /* só os 3 últimos */`}
      />

      <h2>z-index — quem fica na frente</h2>
      <p>
        Funciona como camadas de papel empilhadas: maior número fica
        em cima. <strong>Mas atenção:</strong> z-index só funciona em
        elementos com <code>position</code> diferente de
        <code> static</code>.
      </p>

      <VisualDemo
        code={`.atras  { position: relative; z-index: 1; }
.frente { position: relative; z-index: 2; }`}
        preview={
          <div style={{ position: "relative", height: 80 }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 100,
                height: 60,
                background: "#3b82f6",
                color: "white",
                padding: 8,
                fontSize: 12,
                zIndex: 1,
              }}
            >
              z:1 (atrás)
            </div>
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 60,
                width: 100,
                height: 60,
                background: "#ef4444",
                color: "white",
                padding: 8,
                fontSize: 12,
                zIndex: 2,
              }}
            >
              z:2 (frente)
            </div>
          </div>
        }
      />

      <h2>Stacking context — a fonte de TODOS os bugs de z-index</h2>
      <AlertBox type="warning" title="O bug clássico do modal 'atrás' do header">
        Você coloca <code>z-index: 9999</code> num modal e ele continua
        atrás do header. Por quê? Porque o header tem
        <code> transform </code> ou <code>opacity &lt; 1</code>, o que
        cria um <strong>contexto isolado</strong> de empilhamento. O
        z-index do modal só compete dentro do contexto dele.
      </AlertBox>

      <p>
        Coisas que <strong>criam um novo contexto</strong> (memorize):
        <code> position + z-index</code>, <code>transform</code>,
        <code> filter</code>, <code>opacity &lt; 1</code>,
        <code> backdrop-filter</code>, <code>isolation: isolate</code>,
        <code> will-change</code>.
      </p>

      <CodeBlock
        language="css"
        code={`/* A forma LIMPA de criar um contexto isolado */
.card { isolation: isolate; }
/* Filhos podem ter z-index sem brigar com o resto da página */`}
      />

      <h2>Exemplo do mundo real: tooltip ancorado</h2>
      <VisualDemo
        title="Tooltip aparece acima do botão sem deslocar nada"
        code={`.tip-wrap { position: relative; display: inline-block; }
.tip-wrap .tip {
  position: absolute;
  bottom: calc(100% + 8px);    /* 8px acima do botão */
  left: 50%;
  transform: translateX(-50%); /* centraliza */
  background: #0f172a;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}`}
        preview={
          <div style={{ paddingTop: 36 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#0f172a",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 4,
                  fontSize: 11,
                  whiteSpace: "nowrap",
                }}
              >
                Salvar como rascunho
              </div>
              <button
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "8px 14px",
                  border: 0,
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                💾
              </button>
            </div>
          </div>
        }
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="danger" title="z-index 999 sem position não faz NADA">
        Por padrão, <code>position</code> é <code>static</code> — e
        nesse modo o z-index é ignorado. Sempre adicione no mínimo
        <code> position: relative</code>.
      </AlertBox>

      <AlertBox type="warning" title="overflow: hidden no pai mata sticky">
        Mesmo um <code>overflow-x: hidden</code> num ancestral remoto
        derruba o sticky. Cuidado em layouts que mascaram o
        scroll horizontal.
      </AlertBox>

      <AlertBox type="warning" title="absolute sem pai relative voa pro corpo">
        O elemento se posiciona em relação ao primeiro ancestral com
        position. Se nenhum tem, vai para o <code>html</code>. Sempre
        cheque "qual é o pai posicionado?".
      </AlertBox>

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`position: static     /* padrão — ignora top/left/z-index */
position: relative   /* fica no fluxo, vira ref pra filhos absolute */
position: absolute   /* sai do fluxo, ancora no pai posicionado */
position: fixed      /* preso ao viewport */
position: sticky + top:0   /* gruda quando bate no topo */

inset: 0             /* atalho de top:0 right:0 bottom:0 left:0 */
isolation: isolate   /* cria stacking context limpo */

z-index NÃO funciona sem position
transform / opacity / filter CRIAM stacking context`}
      />
    </PageContainer>
  );
}
