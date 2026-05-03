import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";

const swatch = (bg: string, label: string) => (
  <div
    style={{
      background: bg,
      color: "white",
      padding: "16px 12px",
      borderRadius: 8,
      fontSize: 11,
      fontWeight: 600,
      textShadow: "0 1px 2px rgba(0,0,0,.5)",
      textAlign: "center",
    }}
  >
    {label}
  </div>
);

export default function Colors() {
  return (
    <PageContainer
      title="Cores Modernas"
      subtitle="Você já usou hex e rgb. Vamos ver os formatos novos (oklch, color-mix, P3) que designers profissionais usam pra montar paletas que funcionam de verdade."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Os formatos clássicos</h2>
      <CodeBlock
        language="css"
        code={`/* Hex — o mais comum */
color: #ff6b00;
color: #ff6b00cc;       /* com transparência */

/* RGB — sintaxe moderna (sem vírgulas) */
color: rgb(255 107 0);
color: rgb(255 107 0 / 80%);

/* HSL — Matiz, Saturação, Luminosidade — mais intuitivo pra ajustar */
color: hsl(25 100% 50%);
color: hsl(25 100% 50% / .8);

/* Nomes (147 disponíveis) */
color: tomato;
color: rebeccapurple;
color: currentColor;    /* herda o color atual do elemento */`}
      />

      <h2>OKLCH — o futuro (e presente recomendado)</h2>
      <p>
        Em HSL, "50% de luminosidade" no amarelo parece muito mais
        claro do que no azul — mesmo com o mesmo número. Isso acontece
        porque HSL não bate com o jeito que nossos olhos percebem cor.
        OKLCH bate. Por isso é a forma <strong>certa</strong> de gerar
        paletas com tons consistentes.
      </p>

      <BeforeAfter
        beforeLabel="❌ HSL — luminosidade enganosa"
        afterLabel="✅ OKLCH — luminosidade consistente"
        before={
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {swatch("hsl(60 100% 50%)", "amarelo 50%")}
            {swatch("hsl(120 100% 50%)", "verde 50%")}
            {swatch("hsl(220 100% 50%)", "azul 50%")}
            {swatch("hsl(0 100% 50%)", "vermelho 50%")}
          </div>
        }
        after={
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {swatch("oklch(70% 0.2 90)", "amarelo 70%")}
            {swatch("oklch(70% 0.2 150)", "verde 70%")}
            {swatch("oklch(70% 0.2 250)", "azul 70%")}
            {swatch("oklch(70% 0.2 30)", "vermelho 70%")}
          </div>
        }
        caption="Veja como em OKLCH todas as cores parecem ter brilho parecido"
      />

      <CodeBlock
        language="css"
        code={`/* oklch(L C H) — Lightness, Chroma, Hue */
color: oklch(70% 0.2 30);     /* L: 0-100% | C: 0-0.4 | H: 0-360° */
color: oklch(50% 0.15 250);
color: oklch(70% 0.2 30 / .8); /* com alpha */`}
      />

      <h2>Construindo uma paleta inteira</h2>
      <VisualDemo
        title="Variando só a luminosidade (L), o resto fixo"
        code={`:root {
  --primary-50:  oklch(95% 0.02 250);
  --primary-100: oklch(90% 0.05 250);
  --primary-300: oklch(80% 0.12 250);
  --primary-500: oklch(60% 0.20 250);
  --primary-700: oklch(45% 0.18 250);
  --primary-900: oklch(20% 0.10 250);
}`}
        preview={
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4 }}>
            {[
              { l: 95, c: 0.02, label: "50" },
              { l: 90, c: 0.05, label: "100" },
              { l: 80, c: 0.12, label: "300" },
              { l: 60, c: 0.2, label: "500" },
              { l: 45, c: 0.18, label: "700" },
              { l: 20, c: 0.1, label: "900" },
            ].map((s) =>
              swatch(`oklch(${s.l}% ${s.c} 250)`, s.label)
            )}
          </div>
        }
      />

      <h2>color-mix — misturar cores SEM pré-processador</h2>
      <VisualDemo
        title="Hover state automático: misture com preto/branco"
        code={`.btn        { background: #3b82f6; }
.btn:hover  { background: color-mix(in oklch, #3b82f6, black 12%); }
.btn:active { background: color-mix(in oklch, #3b82f6, black 24%); }`}
        preview={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { c: "#3b82f6", label: "normal" },
              { c: "color-mix(in oklch, #3b82f6, black 12%)", label: "hover" },
              { c: "color-mix(in oklch, #3b82f6, black 24%)", label: "active" },
              { c: "color-mix(in oklch, #3b82f6, gray 60%)", label: "disabled" },
            ].map((b) => (
              <button
                key={b.label}
                style={{
                  background: b.c as any,
                  color: "white",
                  border: 0,
                  padding: "8px 14px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        }
      />

      <h2>Gradientes</h2>
      <VisualDemo
        code={`.linear  { background: linear-gradient(135deg, #fbbf24, #ef4444); }
.radial  { background: radial-gradient(circle at 30% 30%, #34d399, #1e3a8a); }
.conic   { background: conic-gradient(red, orange, yellow, green, blue, purple, red); }`}
        preview={
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            <div
              style={{
                height: 80,
                borderRadius: 8,
                background: "linear-gradient(135deg, #fbbf24, #ef4444)",
              }}
            />
            <div
              style={{
                height: 80,
                borderRadius: 8,
                background: "radial-gradient(circle at 30% 30%, #34d399, #1e3a8a)",
              }}
            />
            <div
              style={{
                height: 80,
                borderRadius: "50%",
                background:
                  "conic-gradient(red, orange, yellow, green, blue, purple, red)",
              }}
            />
          </div>
        }
      />

      <h2>Glassmorphism — vidro fosco</h2>
      <VisualDemo
        title="Combo: cor com alpha + backdrop-filter"
        code={`.glass {
  background: rgb(255 255 255 / .6);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgb(255 255 255 / .3);
  border-radius: 12px;
}`}
        preview={
          <div
            style={{
              padding: 24,
              borderRadius: 12,
              background:
                "linear-gradient(135deg,#fbbf24 0%,#ef4444 50%,#8b5cf6 100%)",
            }}
          >
            <div
              style={{
                background: "rgb(255 255 255 / .55)",
                backdropFilter: "blur(12px) saturate(180%)",
                WebkitBackdropFilter: "blur(12px) saturate(180%)",
                border: "1px solid rgb(255 255 255 / .35)",
                borderRadius: 12,
                padding: 20,
                color: "#0f172a",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              vidro fosco
            </div>
          </div>
        }
      />

      <h2>Sistema de cores com variáveis</h2>
      <CodeBlock
        language="css"
        code={`:root {
  /* Tokens primitivos (a paleta crua) */
  --gray-50:  oklch(98% 0 0);
  --gray-900: oklch(15% 0 0);
  --blue-500: oklch(60% 0.18 250);

  /* Tokens semânticos (uso) */
  --color-bg:        var(--gray-50);
  --color-text:      var(--gray-900);
  --color-primary:   var(--blue-500);
  --color-border:    color-mix(in srgb, currentColor 12%, transparent);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:    oklch(15% 0.02 250);
    --color-text:  oklch(95% 0.01 250);
  }
}

body { background: var(--color-bg); color: var(--color-text); }`}
      />

      <h2>Acessibilidade: contraste mínimo</h2>
      <p>
        WCAG (padrão de acessibilidade) exige contraste mínimo entre
        texto e fundo:
      </p>
      <ul>
        <li><strong>4.5:1</strong> para texto normal</li>
        <li><strong>3:1</strong> para texto grande (≥18pt regular ou 14pt bold)</li>
        <li><strong>7:1</strong> para o nível AAA</li>
      </ul>

      <BeforeAfter
        beforeLabel="❌ Contraste 2.3:1 — reprovado"
        afterLabel="✅ Contraste 7.1:1 — aprovado AAA"
        before={
          <div
            style={{
              background: "#cbd5e1",
              color: "#9ca3af",
              padding: 16,
              borderRadius: 6,
              fontWeight: 600,
            }}
          >
            Texto difícil de ler
          </div>
        }
        after={
          <div
            style={{
              background: "#cbd5e1",
              color: "#0f172a",
              padding: 16,
              borderRadius: 6,
              fontWeight: 600,
            }}
          >
            Texto fácil de ler
          </div>
        }
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Hex não acessa cores wide-gamut">
        <code>#ff0000</code> sempre é o vermelho do sRGB. Pra cores
        mais saturadas (celulares modernos suportam), use
        <code> oklch() </code> ou <code>color(display-p3 ...)</code>.
      </AlertBox>

      <AlertBox type="danger" title="Não use cor SOZINHA pra comunicar">
        "Campo vermelho = erro" exclui daltônicos. Sempre combine com
        ícone, label, padrão visual ou texto.
      </AlertBox>

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`/* Formatos modernos */
oklch(70% 0.2 30)              /* o melhor pra paletas */
rgb(255 0 0 / 80%)             /* sintaxe moderna */
color(display-p3 1 0 0)        /* cores wide-gamut */

color-mix(in oklch, A, B 30%)  /* misturar */
linear-gradient(in oklch, ...) /* gradient sem zona cinza */
backdrop-filter: blur(10px)    /* glassmorphism */

color-scheme: light dark;
@media (prefers-color-scheme: dark) { ... }

/* Padrão pro design system */
:root { --primary-500: oklch(60% 0.18 250); }
.btn { background: var(--primary-500); }
.btn:hover { background: color-mix(in oklch, var(--primary-500), black 10%); }`}
      />
    </PageContainer>
  );
}
