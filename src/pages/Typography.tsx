import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";

export default function Typography() {
  return (
    <PageContainer
      title="Tipografia"
      subtitle="A diferença entre um site bom e um excelente quase sempre está na tipografia. Não é magia: é fonte certa, line-height adequado, hierarquia clara e largura ideal de leitura."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <h2>Stack de fonte do sistema (zero download, super rápido)</h2>
      <p>
        Antes de baixar uma web font de 300 KB, considere usar a fonte
        nativa do sistema. Em 2025, todas elas são bonitas (San
        Francisco no Mac, Segoe no Windows, Roboto no Android) e
        carregam <strong>instantaneamente</strong>.
      </p>

      <VisualDemo
        title="Uma linha que serve pra praticamente tudo"
        code={`body {
  font-family: system-ui, sans-serif;
}`}
        preview={
          <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 16, color: "#0f172a" }}>
            <h3 style={{ margin: 0, fontWeight: 700 }}>Texto com fonte do sistema</h3>
            <p style={{ marginTop: 6, color: "#475569" }}>
              Carrega em zero tempo, fica bonito em qualquer dispositivo.
            </p>
          </div>
        }
      />

      <h2>line-height — o detalhe que muda tudo</h2>
      <BeforeAfter
        beforeLabel="❌ line-height: 1 — apertado e cansativo"
        afterLabel="✅ line-height: 1.6 — confortável"
        before={
          <p style={{ lineHeight: 1, fontSize: 14, color: "#0f172a", margin: 0 }}>
            Um parágrafo apertado é desconfortável de ler. As linhas
            "grudam" umas nas outras e o olho se perde ao pular de uma
            linha pra próxima. Resultado: o leitor desiste antes de chegar
            ao fim do texto.
          </p>
        }
        after={
          <p style={{ lineHeight: 1.6, fontSize: 14, color: "#0f172a", margin: 0 }}>
            Um parágrafo com respiro adequado convida a leitura. As
            linhas têm ar entre si, e o olho navega tranquilamente até o
            fim. Pequena mudança, grande impacto.
          </p>
        }
        caption="Para corpo de texto: 1.5–1.7. Para títulos: 1.1–1.3."
      />

      <AlertBox type="danger" title="Sempre line-height SEM unidade">
        <code>line-height: 1.5</code> herda como multiplicador (correto).<br />
        <code>line-height: 1.5em</code> herda valor calculado e quebra
        em filhos com font-size diferente.
      </AlertBox>

      <h2>Largura ideal: ~65 caracteres</h2>
      <VisualDemo
        title="max-width: 65ch é o sweet spot da legibilidade"
        code={`article p { max-width: 65ch; }`}
        preview={
          <p
            style={{
              maxWidth: "65ch",
              fontSize: 14,
              lineHeight: 1.6,
              color: "#0f172a",
              margin: 0,
            }}
          >
            Limitar a largura a aproximadamente 65 caracteres é uma
            recomendação tipográfica de séculos. Linhas mais longas
            forçam o olho a fazer um salto grande de uma linha pra
            próxima, aumentando o cansaço visual.
          </p>
        }
      />

      <h2>Hierarquia visual com escala harmônica</h2>
      <VisualDemo
        code={`h1 { font-size: 2.4rem; font-weight: 800; line-height: 1.1; }
h2 { font-size: 1.8rem; font-weight: 700; line-height: 1.2; }
h3 { font-size: 1.4rem; font-weight: 700; line-height: 1.3; }
p  { font-size: 1rem;   line-height: 1.6; }
small { font-size: .85rem; color: gray; }`}
        preview={
          <div style={{ color: "#0f172a" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
              H1 — Manchete
            </h1>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "8px 0 4px", lineHeight: 1.2 }}>
              H2 — Seção
            </h2>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "8px 0 4px", lineHeight: 1.3 }}>
              H3 — Subseção
            </h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
              Parágrafo de corpo. <small style={{ color: "#64748b" }}>nota miúda</small>
            </p>
          </div>
        }
      />

      <h2>Tipografia fluida (escala com a tela)</h2>
      <CodeBlock
        language="css"
        code={`h1 { font-size: clamp(1.75rem, 5vw + 1rem, 3.5rem); }
h2 { font-size: clamp(1.25rem, 3vw + .8rem, 2rem); }
p  { font-size: clamp(1rem, 1vw + .8rem, 1.15rem); }`}
      />

      <h2>letter-spacing — quando aumentar, quando diminuir</h2>
      <VisualDemo
        code={`h1     { font-size: 3rem; letter-spacing: -.02em; }   /* fechar em títulos */
.label { font-size: .75rem; text-transform: uppercase; letter-spacing: .08em; }`}
        preview={
          <div style={{ color: "#0f172a" }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1 }}>
              Título Apertado
            </div>
            <div
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: ".15em",
                color: "#64748b",
                fontWeight: 700,
                marginTop: 12,
              }}
            >
              ETIQUETA AFASTADA
            </div>
          </div>
        }
      />

      <h2>text-wrap: balance / pretty (CSS de 2024+)</h2>
      <BeforeAfter
        beforeLabel="❌ Padrão — quebra desbalanceada"
        afterLabel="✅ text-wrap: balance — linhas equilibradas"
        before={
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#0f172a", maxWidth: 280 }}>
            Como sua empresa pode crescer 3x em 6 meses com IA generativa
          </h2>
        }
        after={
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              margin: 0,
              color: "#0f172a",
              maxWidth: 280,
              textWrap: "balance" as any,
            }}
          >
            Como sua empresa pode crescer 3x em 6 meses com IA generativa
          </h2>
        }
        caption="Use balance em títulos, pretty em parágrafos longos (evita 'viúvas'). Uma linha de CSS."
      />

      <h2>Carregar uma web font (jeito certo)</h2>
      <CodeBlock
        language="css"
        code={`/* Auto-hospedada (privacidade + performance) */
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Variable.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-display: swap;        /* CRÍTICO: mostra fallback até carregar */
}

body {
  font-family: "Inter", system-ui, sans-serif;
}`}
      />

      <AlertBox type="danger" title="font-display: swap é obrigatório">
        Sem ele, o navegador deixa o texto INVISÍVEL até a fonte
        carregar (3-5 segundos no 3G). Com <code>swap</code>, mostra
        a fonte fallback imediatamente e troca quando carregar.
      </AlertBox>

      <h2>Truncar texto longo</h2>
      <VisualDemo
        title="Uma linha com reticências"
        code={`.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`}
        preview={
          <div
            style={{
              maxWidth: 240,
              padding: 8,
              border: "1px solid #cbd5e1",
              borderRadius: 6,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "#0f172a",
              fontSize: 13,
            }}
          >
            Este texto é muito longo e vai ser cortado com reticências
          </div>
        }
      />

      <CodeBlock
        language="css"
        code={`/* N linhas — line-clamp */
.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`}
      />

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`/* O essencial */
font-family: system-ui, sans-serif    /* zero download, sempre bonito */
line-height: 1.6                       /* sem unidade, no body */
max-width: 65ch                        /* legibilidade */

/* Hierarquia */
h1 { font-size: clamp(1.75rem, 5vw + 1rem, 3rem); line-height: 1.1; }
h2 { font-size: clamp(1.25rem, 3vw + .8rem, 2rem); line-height: 1.2; }

/* Modernos */
text-wrap: balance                     /* títulos */
text-wrap: pretty                      /* parágrafos */
font-variant-numeric: tabular-nums     /* tabelas */

/* Web font */
@font-face { ...; font-display: swap; }   /* SEMPRE swap */`}
      />
    </PageContainer>
  );
}
