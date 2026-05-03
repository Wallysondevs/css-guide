import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";

export default function Responsive() {
  return (
    <PageContainer
      title="Design Responsivo"
      subtitle="Seu site precisa funcionar de 320px (celular pequeno) a 4K. A boa notícia: o CSS moderno tornou isso fácil. Vamos do mobile-first clássico aos truques que dispensam media queries."
      difficulty="iniciante"
      timeToRead="11 min"
    >
      <h2>A regra de ouro: mobile-first</h2>
      <p>
        Comece escrevendo o CSS pensando no <strong>menor tamanho de
        tela</strong>. Depois, à medida que sobra espaço, vá adicionando
        complexidade. Resultado: menos código, mais performance no
        celular (que é onde a maioria do tráfego acontece).
      </p>

      <CodeBlock
        language="css"
        code={`/* Base: vale pra QUALQUER tamanho (mobile primeiro) */
.layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tablet em diante (768px+) */
@media (min-width: 48rem) {
  .layout { flex-direction: row; }
}

/* Desktop (1024px+) */
@media (min-width: 64rem) {
  .layout { gap: 2rem; }
}`}
      />

      <AlertBox type="info" title="Por que rem nas media queries?">
        Use <code>rem</code> em vez de <code>px</code>. Quando o usuário
        aumenta a fonte do browser, os breakpoints escalam junto e o
        layout continua coerente.
      </AlertBox>

      <h2>Sintaxe moderna (mais legível)</h2>
      <BeforeAfter
        beforeLabel="❌ Sintaxe antiga (verbosa)"
        afterLabel="✅ Range syntax (CSS moderno)"
        before={
          <pre className="text-xs text-slate-700 leading-relaxed">
            {`@media (min-width: 480px)
  and (max-width: 1024px) {
  /* tablet */
}

@media (min-width: 1024px) {
  /* desktop */
}`}
          </pre>
        }
        after={
          <pre className="text-xs text-slate-700 leading-relaxed">
            {`@media (480px <= width <= 1024px) {
  /* tablet */
}

@media (width >= 1024px) {
  /* desktop */
}`}
          </pre>
        }
      />

      <h2>Preferências do usuário (você precisa respeitar)</h2>
      <CodeBlock
        language="css"
        code={`/* Tema escuro do sistema */
@media (prefers-color-scheme: dark) {
  :root { --bg: #1a1a1a; --fg: #fafafa; }
}

/* Usuário pediu pra reduzir animação (acessibilidade) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}

/* Mais contraste */
@media (prefers-contrast: more) {
  :root { --border: black; }
}

/* Hover real (mouse) — desktop */
@media (hover: hover) {
  .btn:hover { transform: translateY(-2px); }
}`}
      />

      <h2>Container Queries — o jogo virou em 2023</h2>
      <p>
        Media queries respondem ao <strong>tamanho da tela</strong>.
        Container queries respondem ao <strong>tamanho do componente</strong>.
        Significa que o mesmo card pode se adaptar se for posto num
        grid de 4 colunas ou numa sidebar estreita — sem saber em qual
        contexto está.
      </p>

      <VisualDemo
        title="Card que vira layout horizontal quando tem espaço"
        code={`.card {
  container-type: inline-size;   /* "este elemento é um container" */
}

@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 80px 1fr; gap: 12px; }
}`}
        preview={
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div
              style={{
                padding: 12,
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                fontSize: 12,
                color: "#0f172a",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  background: "linear-gradient(135deg,#fbbf24,#ef4444)",
                  borderRadius: 6,
                  marginBottom: 8,
                }}
              />
              <div style={{ fontWeight: 700 }}>Card estreito</div>
              <div style={{ color: "#64748b" }}>vira vertical</div>
            </div>
            <div
              style={{
                padding: 12,
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                fontSize: 12,
                color: "#0f172a",
                display: "grid",
                gridTemplateColumns: "60px 1fr",
                gap: 10,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  aspectRatio: "1",
                  background: "linear-gradient(135deg,#34d399,#3b82f6)",
                  borderRadius: 6,
                }}
              />
              <div>
                <div style={{ fontWeight: 700 }}>Card largo</div>
                <div style={{ color: "#64748b" }}>vira horizontal</div>
              </div>
            </div>
          </div>
        }
      />

      <h2>Truques que DISPENSAM media queries</h2>
      <VisualDemo
        title="Grid responsivo com auto-fit (já vimos no capítulo de Grid)"
        code={`.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  padding: 12,
                  borderRadius: 8,
                  textAlign: "center",
                  color: "#0f172a",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Card {n}
              </div>
            ))}
          </div>
        }
      />

      <VisualDemo
        title="Container fluido perfeito (sem media query)"
        code={`.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
  padding-block: clamp(2rem, 8vh, 6rem);
}`}
        preview={
          <div
            style={{
              width: "min(100% - 1rem, 500px)",
              marginInline: "auto",
              padding: "16px",
              background: "#1e293b",
              color: "white",
              textAlign: "center",
              borderRadius: 8,
              fontSize: 13,
            }}
          >
            adapta a 100% do espaço, com teto em 500px
          </div>
        }
      />

      <h2>Tipografia fluida</h2>
      <VisualDemo
        title="Um clamp resolve título grande no desktop e legível no mobile"
        code={`h1 { font-size: clamp(1.75rem, 5vw + 1rem, 3.5rem); }
p  { font-size: clamp(1rem, 1vw + .8rem, 1.25rem); }`}
        preview={
          <div>
            <h1
              style={{
                fontSize: "clamp(1.75rem, 5vw + 1rem, 3rem)",
                margin: 0,
                color: "#0f172a",
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Título Fluido
            </h1>
            <p
              style={{
                fontSize: "clamp(.9rem, 1vw + .8rem, 1.1rem)",
                color: "#475569",
                marginTop: 8,
              }}
            >
              Diminua/aumente a janela e veja crescer suavemente.
            </p>
          </div>
        }
      />

      <h2>Imagens responsivas</h2>
      <CodeBlock
        language="html"
        code={`<!-- Browser escolhe a melhor versão pro contexto -->
<img
  src="hero-1280.jpg"
  srcset="
    hero-640.jpg 640w,
    hero-1280.jpg 1280w,
    hero-2560.jpg 2560w"
  sizes="(min-width: 1200px) 1200px, 100vw"
  alt="Banner"
  loading="lazy"
/>

<!-- Diferentes formatos com fallback -->
<picture>
  <source type="image/avif" srcset="hero.avif" />
  <source type="image/webp" srcset="hero.webp" />
  <img src="hero.jpg" alt="Banner" />
</picture>`}
      />
      <CodeBlock
        language="css"
        code={`/* Cole no reset de TODO projeto */
img, video, svg {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Mantém proporção (vídeos, embeds) */
.video { aspect-ratio: 16 / 9; }`}
      />

      <h2>Exemplo do mundo real: header que vira hambúrguer no mobile</h2>
      <CodeBlock
        language="css"
        code={`.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.menu { display: none; }              /* esconde no mobile */
.hamburger { display: block; }

@media (width >= 48rem) {
  .menu { display: flex; gap: 24px; } /* aparece no tablet+ */
  .hamburger { display: none; }
}`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="danger" title="Sem meta viewport, nada disso funciona">
        Sem essa tag no HTML, o iPhone "renderiza desktop e dá zoom out"
        — media queries não disparam.
      </AlertBox>
      <CodeBlock
        language="html"
        code={`<meta name="viewport" content="width=device-width, initial-scale=1" />`}
      />

      <AlertBox type="warning" title="overflow-x: hidden é gambiarra">
        Sintoma: scroll horizontal indesejado em mobile. Causa:
        algum elemento (geralmente <code>img</code> ou
        <code> table</code>) está estourando. Encontre e conserte
        com <code>max-width: 100%</code> em vez de mascarar.
      </AlertBox>

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`/* Mobile-first */
@media (width >= 48rem) { ... }

/* Preferências do usuário */
@media (prefers-color-scheme: dark) { ... }
@media (prefers-reduced-motion) { ... }

/* Componentes responsivos */
@container (min-width: 400px) { ... }

/* Sem media query */
clamp(MIN, IDEAL, MAX)
min(100% - 2rem, 1200px)
repeat(auto-fit, minmax(250px, 1fr))
aspect-ratio: 16 / 9
container-type: inline-size`}
      />
    </PageContainer>
  );
}
