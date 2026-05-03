import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function CustomProperties() {
  return (
    <PageContainer
      title="Custom Properties (CSS Variables)"
      subtitle="Variáveis NATIVAS do CSS, com escopo, herança e atualização em tempo real via JavaScript. Mais poderosas que variáveis de Sass — porque vivem no runtime."
      difficulty="intermediario"
      timeToRead="9 min"
    >
      <h2>Sintaxe básica</h2>
      <CodeBlock
        language="css"
        code={`/* Definir — sempre prefixo "--" */
:root {
  --brand: oklch(60% 0.20 250);
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
.btn { background: var(--brand, royalblue); }
.btn { color: var(--text-color, var(--brand, black)); }`}
      />

      <AlertBox type="info" title="Custom Properties ≠ Sass variables">
        <ul>
          <li><strong>Sass</strong>: compila para valores fixos. Não acessível em runtime.</li>
          <li><strong>CSS</strong>: vivem no runtime. Mudam com media query, JS, classes, etc.</li>
          <li><strong>CSS</strong> herdam pelo DOM (cascade nativo).</li>
          <li><strong>CSS</strong> têm escopo por seletor — não é apenas global.</li>
        </ul>
      </AlertBox>

      <h2>Escopo e herança</h2>
      <CodeBlock
        language="css"
        code={`/* Global */
:root { --brand: blue; }

/* Escopo de componente */
.card {
  --brand: red;             /* só dentro de .card e seus filhos */
  background: var(--brand); /* red */
}

.card .btn {
  background: var(--brand); /* red — herdou do .card */
}

/* Sobrescrever por estado */
.card[data-variant="success"] {
  --brand: green;
}`}
      />

      <h2>Tema dark/light com 1 variável</h2>
      <CodeBlock
        language="css"
        code={`:root {
  --bg: white;
  --fg: black;
  --border: #eee;
}

[data-theme="dark"] {
  --bg: #1a1a1a;
  --fg: #fafafa;
  --border: #333;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #1a1a1a;
    --fg: #fafafa;
    --border: #333;
  }
}

body { background: var(--bg); color: var(--fg); }`}
      />

      <h2>Variáveis em valores parciais</h2>
      <CodeBlock
        language="css"
        code={`/* Compor cores via canais separados */
:root {
  --brand-h: 250;
  --brand-s: 100%;
  --brand-l: 50%;
}

.btn {
  background: hsl(var(--brand-h) var(--brand-s) var(--brand-l));
}

.btn:hover {
  /* só muda a luminosidade — sem precisar de outra cor inteira */
  background: hsl(var(--brand-h) var(--brand-s) calc(var(--brand-l) - 10%));
}

/* Spacing scale via multiplicador */
:root { --space-base: 0.25rem; }
.p-1 { padding: calc(var(--space-base) * 1); }   /* 0.25rem */
.p-4 { padding: calc(var(--space-base) * 4); }   /* 1rem */
.p-8 { padding: calc(var(--space-base) * 8); }   /* 2rem */`}
      />

      <h2>Manipular via JavaScript</h2>
      <CodeBlock
        language="js"
        code={`// Ler
const root = document.documentElement;
const brand = getComputedStyle(root).getPropertyValue('--brand').trim();

// Escrever
root.style.setProperty('--brand', 'hotpink');

// Remover (volta ao default)
root.style.removeProperty('--brand');

// Caso clássico: theme switcher persistente
const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
};

// Cursor seguindo o mouse via variáveis
document.addEventListener('mousemove', e => {
  document.body.style.setProperty('--mx', e.clientX + 'px');
  document.body.style.setProperty('--my', e.clientY + 'px');
});`}
      />

      <h2>@property — variáveis tipadas (com animação!)</h2>
      <p>
        Custom properties normais são tratadas como string — não
        animam. Com <code>@property</code>, você declara o tipo e o
        browser anima entre valores.
      </p>

      <CodeBlock
        language="css"
        code={`/* Registrar tipo */
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-gradient {
  to { --gradient-angle: 360deg; }
}

.card {
  background: conic-gradient(
    from var(--gradient-angle),
    blue, red, blue
  );
  animation: spin-gradient 4s linear infinite;
}

/* Tipos suportados:
   <color>, <length>, <percentage>, <number>, <integer>, <angle>,
   <time>, <length-percentage>, <image>, <url>, <transform-function>,
   <transform-list>, <custom-ident>  */`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* Sistema de design tokens completo */
:root {
  /* Primitivos */
  --gray-50:  oklch(98% 0 0);
  --gray-900: oklch(15% 0 0);
  --blue-500: oklch(60% 0.18 250);

  /* Semânticos (referência) */
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
  --fs-sm: 0.875rem;
  --fs-md: 1rem;
  --fs-lg: 1.25rem;

  /* Raio, sombras, transições */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --shadow-md: 0 4px 12px rgb(0 0 0 / .08);
  --transition: 200ms cubic-bezier(.4, 0, .2, 1);
}

/* Componente usando só tokens */
.btn {
  background: var(--color-primary);
  color: white;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--fs-md);
  transition: transform var(--transition);
}

/* Configuração por instância via CSS API */
.btn-lg { --fs-md: var(--fs-lg); --space-2: var(--space-3); }`}
      />

      <h2>Padrão "API de componente"</h2>
      <CodeBlock
        language="css"
        code={`/* Componente expõe variáveis para customização */
.card {
  --card-bg: white;
  --card-border: #eee;
  --card-padding: 1.5rem;
  --card-radius: .75rem;

  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}

/* Uso: customiza sem sobrescrever as propriedades inteiras */
.card.featured {
  --card-bg: linear-gradient(45deg, #ff6b00, #ffcc00);
  --card-border: transparent;
}

.card.compact {
  --card-padding: .75rem;
  --card-radius: .25rem;
}`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="var() não é universal">
        <code>var(--cor)</code> só funciona DENTRO de uma propriedade.
        Não em <code>@media</code>, <code>@supports</code> ou
        <code> calc() </code> sem operação. Para valores literais
        em queries, use <code>env()</code> ou prepare múltiplas
        declarações.
      </AlertBox>

      <AlertBox type="danger" title="Fallback inválido = propriedade inválida">
        <code>color: var(--x, abc)</code> com <code>--x</code> não
        definida resulta em <code>color: abc</code>, que é inválido,
        e a propriedade INTEIRA é descartada (volta ao herdado).
        Sempre garanta um fallback válido.
      </AlertBox>

      <AlertBox type="warning" title="Performance em larga escala">
        Mudar uma variável em <code>:root</code> recalcula TODOS os
        descendentes que a usam. Em 10.000 elementos, pode causar
        jank. Use escopo mais restrito quando possível.
      </AlertBox>

      <h2>Cheat sheet</h2>
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

/* Padrão "componente API" */
.card { --pad: 1rem; padding: var(--pad); }
.card.compact { --pad: .5rem; }`}
      />
    </PageContainer>
  );
}
