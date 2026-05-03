import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";

export default function Units() {
  return (
    <PageContainer
      title="Unidades CSS"
      subtitle="px, rem, %, vw, ch, dvh, fr, clamp()… cada uma resolve um problema diferente. Saber qual usar em cada situação separa CSS amador de profissional."
      difficulty="iniciante"
      timeToRead="9 min"
    >
      <h2>A grande divisão</h2>
      <ul>
        <li><strong>Absolutas</strong> — tamanho fixo, ignoram contexto. <code>px</code> é a única que importa hoje.</li>
        <li><strong>Relativas</strong> — recalculam baseadas em algo (raiz, pai, viewport, fonte).</li>
      </ul>

      <h2>px — bom pra detalhes finos</h2>
      <p>
        Use pra <strong>bordas</strong>, <strong>ícones</strong> e
        <strong> raios pequenos</strong>. Coisas que precisam de pixel
        perfeito.
      </p>
      <CodeBlock
        language="css"
        code={`.card  { border: 1px solid #eee; border-radius: 8px; }
.icon  { width: 24px; height: 24px; }`}
      />

      <h2>rem — o padrão pra tipografia e espaçamento</h2>
      <p>
        <code>1rem</code> = tamanho da fonte da raiz (geralmente
        <strong> 16px</strong>). A grande vantagem: se o usuário aumenta
        a fonte do navegador (acessibilidade), TUDO escala junto.
      </p>

      <VisualDemo
        title="Tudo em rem escala junto se a fonte do browser muda"
        code={`html { font-size: 16px; }      /* padrão */

.btn {
  font-size: 1rem;            /* 16px */
  padding: .5rem 1rem;        /* 8px 16px */
  border-radius: .5rem;       /* 8px */
}`}
        preview={
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              style={{
                fontSize: 16,
                padding: "8px 16px",
                borderRadius: 8,
                background: "#3b82f6",
                color: "white",
                border: 0,
                fontWeight: 600,
              }}
            >
              .btn (16px base)
            </button>
            <button
              style={{
                fontSize: 20,
                padding: "10px 20px",
                borderRadius: 10,
                background: "#3b82f6",
                color: "white",
                border: 0,
                fontWeight: 600,
              }}
            >
              .btn (usuário aumentou pra 20px)
            </button>
          </div>
        }
      />

      <h2>em — relativo ao próprio elemento</h2>
      <BeforeAfter
        beforeLabel="❌ em aninhado se acumula (compounding)"
        afterLabel="✅ rem é estável"
        before={
          <div style={{ fontSize: 14, color: "#0f172a" }}>
            <ul style={{ fontSize: "1.2em" }}>
              li (1.2em)
              <ul style={{ fontSize: "1.2em" }}>
                neto (1.44em)
                <ul style={{ fontSize: "1.2em" }}>bisneto (1.73em!)</ul>
              </ul>
            </ul>
          </div>
        }
        after={
          <div style={{ fontSize: 14, color: "#0f172a" }}>
            <ul style={{ fontSize: "1.2rem" }}>
              li (1.2rem)
              <ul style={{ fontSize: "1.2rem" }}>
                neto (1.2rem)
                <ul style={{ fontSize: "1.2rem" }}>bisneto (1.2rem)</ul>
              </ul>
            </ul>
          </div>
        }
        caption="Use em quando QUER escalar com o pai (botão que cresce com o font-size). Caso contrário, rem."
      />

      <h2>% — depende de QUEM é o pai</h2>
      <CodeBlock
        language="css"
        code={`/* width/height — % do PAI */
.col { width: 50%; }   /* metade do container */

/* padding/margin — % SEMPRE da LARGURA do pai (sim, mesmo no vertical!) */
.box { padding-top: 50%; }    /* truque antigo de aspect-ratio */

/* font-size — % do font-size do pai (= 1em) */
small { font-size: 80%; }`}
      />

      <h2>vw / vh / dvh — tamanho da janela do navegador</h2>
      <ul>
        <li><code>1vw</code> = 1% da largura do viewport.</li>
        <li><code>1vh</code> = 1% da altura.</li>
        <li><code>1dvh</code> = 1% da altura <strong>dinâmica</strong> — recalcula quando a barra de URL do mobile aparece/some.</li>
      </ul>

      <AlertBox type="warning" title="Use 100dvh, NÃO 100vh, em mobile">
        No iPhone, <code>100vh</code> não conta a barra de URL — quando
        ela some, o conteúdo é cortado embaixo. Em 2024+, sempre
        <code> min-height: 100dvh </code> pra herói/landing.
      </AlertBox>

      <h2>ch — largura ideal de leitura</h2>
      <VisualDemo
        title="65ch é a largura recomendada para parágrafos legíveis"
        code={`article p { max-width: 65ch; }`}
        preview={
          <p
            style={{
              maxWidth: "65ch",
              margin: 0,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#0f172a",
            }}
          >
            Texto largo demais cansa os olhos porque precisa fazer um
            "salto" longo da última palavra de uma linha pra primeira da
            próxima. Limitar a ~65 caracteres é o sweet spot para
            leitura confortável em web.
          </p>
        }
      />

      <h2>clamp(MIN, IDEAL, MAX) — tamanho fluido com limites</h2>
      <p>
        Possivelmente <strong>a função mais útil do CSS moderno</strong>.
        Você define um valor mínimo, um ideal (que cresce com o
        viewport) e um máximo. O navegador escolhe o adequado.
      </p>

      <VisualDemo
        title="Título que cresce no desktop, sem ficar gigante em telas 4K"
        code={`h1 {
  font-size: clamp(1.5rem, 5vw + 1rem, 3rem);
  /*       MIN     IDEAL          MAX
            ↓        ↓             ↓
          24px  cresce com vw    48px (teto)  */
}`}
        preview={
          <h1
            style={{
              fontSize: "clamp(1.5rem, 5vw + 1rem, 3rem)",
              margin: 0,
              color: "#0f172a",
              fontWeight: 800,
            }}
          >
            Título Fluido
          </h1>
        }
      />

      <h2>fr — exclusivo do Grid</h2>
      <CodeBlock
        language="css"
        code={`.layout {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  /* 200px fixo, depois 2 partes iguais do que sobrar */
}

.layout {
  grid-template-columns: 1fr 2fr 1fr;
  /* proporção 1:2:1 */
}`}
      />

      <h2>min(), max(), calc() — operações matemáticas</h2>
      <CodeBlock
        language="css"
        code={`/* calc — operações com qualquer mistura de unidades */
.col   { width: calc(100% - 2rem); }
.hero  { height: calc(100dvh - 64px); }   /* tira 64px do header */

/* min — escolhe o MENOR (limita o máximo) */
.title { font-size: min(5vw, 3rem); }

/* max — escolhe o MAIOR (limita o mínimo) */
.gap   { gap: max(1rem, 2vw); }`}
      />

      <h2>Exemplo do mundo real: container fluido perfeito</h2>
      <VisualDemo
        title="Largura adapta sozinho até o limite"
        code={`.container {
  width: min(100% - 2rem, 1200px);   /* nunca passa de 1200, sempre tem 1rem de respiro */
  margin-inline: auto;               /* centraliza */
  padding-block: clamp(2rem, 8vh, 6rem);
}`}
        preview={
          <div
            style={{
              width: "min(100% - 1rem, 600px)",
              marginInline: "auto",
              paddingBlock: "clamp(1rem, 4vh, 2rem)",
              background: "#1e293b",
              color: "white",
              borderRadius: 8,
              textAlign: "center",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            container responsivo, centralizado e com respiro
          </div>
        }
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="danger" title="line-height com unidade quebra herança">
        <code>line-height: 1.5</code> (sem unidade) herda como
        multiplicador — sempre correto. <code>line-height: 1.5em</code>
        herda o valor calculado e amassa em filhos com font-size
        diferente. <strong>Sempre sem unidade.</strong>
      </AlertBox>

      <AlertBox type="warning" title="Compounding de em">
        Aninhar <code>em</code> sem rem cria explosão de tamanhos. Use
        <code> rem </code> pra maioria, <code>em</code> só quando você
        QUER escala relativa (padding de botão que cresce com font-size).
      </AlertBox>

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`px       — bordas e ícones precisos
rem      — tipografia, espaçamentos (regra geral)
em       — quando QUERO escalar com o pai
%        — width dentro de container
vw vh    — viewport (cuidado: prefira dvh em mobile)
dvh      — viewport dinâmico (mobile-safe)
ch       — largura de texto (max-width: 65ch)
fr       — só em grid

clamp(min, ideal, max)  — fluido com limite (use SEMPRE pra tipografia)
min(100% - 2rem, 1200px) — container responsivo perfeito`}
      />
    </PageContainer>
  );
}
