import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";

export default function CustomProperties() {
  return (
    <PageContainer
      title="Custom Properties (Variáveis CSS)"
      subtitle="Variáveis NATIVAS do CSS — não precisam de Sass nem build step. Vivem no navegador, herdam pela árvore, mudam com JavaScript em tempo real. Base de qualquer design system moderno."
      difficulty="iniciante"
      timeToRead="9 min"
    >
      <h2>Sintaxe básica</h2>
      <CodeBlock
        language="css"
        code={`/* Definir — sempre começa com -- */
:root {
  --brand: #3b82f6;
  --space-3: 1rem;
  --radius: .5rem;
}

/* Usar — sempre via var() */
.btn {
  background: var(--brand);
  padding: var(--space-3);
  border-radius: var(--radius);
}

/* Fallback (segundo argumento) */
.btn { background: var(--brand, royalblue); }`}
      />

      <h2>O melhor caso: tema dark com 1 toggle</h2>
      <VisualDemo
        title="Apenas mude o data-theme do html"
        code={`:root {
  --bg: white;
  --fg: black;
}
[data-theme="dark"] {
  --bg: #0f172a;
  --fg: #fafafa;
}

body { background: var(--bg); color: var(--fg); }`}
        preview={
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div
              style={{
                background: "white",
                color: "#0f172a",
                padding: 16,
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 13,
              }}
            >
              <strong>Tema light</strong>
              <p style={{ margin: "4px 0 0", color: "#64748b" }}>conteúdo de exemplo</p>
            </div>
            <div
              style={{
                background: "#0f172a",
                color: "#fafafa",
                padding: 16,
                borderRadius: 8,
                border: "1px solid #1e293b",
                fontSize: 13,
              }}
            >
              <strong>Tema dark</strong>
              <p style={{ margin: "4px 0 0", color: "#94a3b8" }}>conteúdo de exemplo</p>
            </div>
          </div>
        }
      />

      <h2>Variáveis vivem no navegador (Sass não)</h2>
      <BeforeAfter
        beforeLabel="Sass — congelado em build time"
        afterLabel="CSS — muda em runtime"
        before={
          <pre className="text-xs text-slate-700 leading-relaxed">
            {`$brand: blue;

.btn { background: $brand; }

// pra mudar:
// recompila tudo`}
          </pre>
        }
        after={
          <pre className="text-xs text-slate-700 leading-relaxed">
            {`:root { --brand: blue; }

.btn { background: var(--brand); }

/* JS muda em tempo real: */
root.style
  .setProperty('--brand', 'red');`}
          </pre>
        }
      />

      <h2>Escopo: variáveis seguem a árvore HTML</h2>
      <VisualDemo
        title="Sobrescrever uma variável só dentro de um componente"
        code={`:root { --brand: blue; }

.card-success {
  --brand: green;     /* só dentro deste card */
}
.card-success .btn {
  background: var(--brand);   /* green */
}`}
        preview={
          <div style={{ display: "flex", gap: 8 }}>
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
              padrão
            </button>
            <button
              style={{
                background: "#10b981",
                color: "white",
                padding: "8px 14px",
                border: 0,
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              .card-success
            </button>
          </div>
        }
      />

      <h2>Padrão "API de componente" (avançado mas vale ouro)</h2>
      <VisualDemo
        title="Componente expõe variáveis pra customização"
        code={`.card {
  --card-bg: white;
  --card-padding: 1.5rem;
  --card-radius: .75rem;

  background: var(--card-bg);
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}

/* Customiza sem sobrescrever as propriedades inteiras */
.card.compact { --card-padding: .75rem; --card-radius: .25rem; }
.card.featured {
  --card-bg: linear-gradient(135deg, #fbbf24, #ef4444);
}`}
        preview={
          <div style={{ display: "grid", gap: 8 }}>
            <div
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: ".75rem",
                border: "1px solid #e5e7eb",
                fontSize: 13,
                color: "#0f172a",
              }}
            >
              .card padrão
            </div>
            <div
              style={{
                background: "white",
                padding: ".75rem",
                borderRadius: ".25rem",
                border: "1px solid #e5e7eb",
                fontSize: 13,
                color: "#0f172a",
              }}
            >
              .card.compact
            </div>
            <div
              style={{
                background: "linear-gradient(135deg,#fbbf24,#ef4444)",
                padding: "1.5rem",
                borderRadius: ".75rem",
                fontSize: 13,
                color: "white",
                fontWeight: 700,
              }}
            >
              .card.featured
            </div>
          </div>
        }
      />

      <h2>Sistema de tokens — o jeito profissional</h2>
      <CodeBlock
        language="css"
        code={`:root {
  /* Primitivos (a paleta crua) */
  --gray-50:  oklch(98% 0 0);
  --gray-900: oklch(15% 0 0);
  --blue-500: oklch(60% 0.18 250);

  /* Semânticos (uso prático) */
  --color-bg:        var(--gray-50);
  --color-text:      var(--gray-900);
  --color-primary:   var(--blue-500);

  /* Espaçamento (escala 4px) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;

  /* Tipografia */
  --fs-sm: .875rem;
  --fs-md: 1rem;
  --fs-lg: 1.25rem;

  /* Outros */
  --radius-md: .5rem;
  --shadow-md: 0 4px 12px rgb(0 0 0 / .08);
  --transition: 200ms cubic-bezier(.4, 0, .2, 1);
}`}
      />

      <h2>Manipular via JavaScript</h2>
      <CodeBlock
        language="js"
        code={`const root = document.documentElement;

// Ler
const brand = getComputedStyle(root)
  .getPropertyValue('--brand').trim();

// Escrever
root.style.setProperty('--brand', 'hotpink');

// Remover (volta ao padrão)
root.style.removeProperty('--brand');

// Caso clássico: theme switcher
const setTheme = (t) => {
  document.documentElement.dataset.theme = t;
  localStorage.setItem('theme', t);
};

// Cursor seguindo o mouse via variável
document.addEventListener('mousemove', e => {
  document.body.style.setProperty('--mx', e.clientX + 'px');
  document.body.style.setProperty('--my', e.clientY + 'px');
});`}
      />

      <h2>@property — variáveis tipadas (que animam!)</h2>
      <p>
        Custom properties normais são tratadas como string e <strong>não
        animam</strong>. Com <code>@property</code>, você diz o tipo e
        o navegador anima entre valores — abre portas pra efeitos
        impossíveis antes.
      </p>

      <CodeBlock
        language="css"
        code={`@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-gradient {
  to { --gradient-angle: 360deg; }
}

.card {
  background: conic-gradient(from var(--gradient-angle), blue, red, blue);
  animation: spin-gradient 4s linear infinite;
}`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Fallback inválido descarta a propriedade inteira">
        <code>color: var(--x, abc)</code> com <code>--x</code> indefinido
        vira <code>color: abc</code> — inválido — e a propriedade
        inteira é ignorada (volta a herdar). Sempre forneça um fallback
        válido.
      </AlertBox>

      <AlertBox type="warning" title="var() não funciona em @media">
        <code>@media (min-width: var(--mq))</code> NÃO funciona. Pra
        valores literais em queries, declare múltiplas regras ou use
        <code> env() </code> (limitado).
      </AlertBox>

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`:root { --brand: blue; }
color: var(--brand)
color: var(--brand, fallback)

/* Tipado e animável */
@property --x {
  syntax: "<length>";
  initial-value: 0px;
  inherits: false;
}

/* JS */
el.style.setProperty('--brand', 'red')
getComputedStyle(el).getPropertyValue('--brand').trim()

/* Padrão "API de componente" */
.card { --pad: 1rem; padding: var(--pad); }
.card.compact { --pad: .5rem; }`}
      />
    </PageContainer>
  );
}
