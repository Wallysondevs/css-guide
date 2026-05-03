import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Colors() {
  return (
    <PageContainer
      title="Cores Modernas"
      subtitle="rgb, hsl, oklch, color-mix, gradients, wide-gamut P3 — o sistema de cor da web finalmente alcançou o que designers usam há décadas."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Os formatos clássicos</h2>
      <CodeBlock
        language="css"
        code={`/* Hex (limitado a sRGB) */
color: #ff6b00;
color: #ff6b00cc;       /* com alpha */

/* RGB */
color: rgb(255 107 0);          /* sintaxe moderna (sem vírgulas) */
color: rgb(255 107 0 / 80%);    /* com alpha */

/* HSL — mais intuitivo (matiz, saturação, luminosidade) */
color: hsl(25 100% 50%);
color: hsl(25 100% 50% / .8);

/* Nomes (147 disponíveis, raramente usar) */
color: tomato;
color: rebeccapurple;
color: transparent;
color: currentColor;    /* herda o color do elemento */`}
      />

      <h2>OKLCH — o futuro (e o presente recomendado)</h2>
      <p>
        <code>oklch()</code> é um espaço de cor <strong>perceptualmente
        uniforme</strong>: aumentar L em 10% parece igualmente mais
        claro independente do hue. HSL não tem essa propriedade —
        amarelo "50% de luminosidade" parece muito mais claro que
        azul "50%".
      </p>

      <CodeBlock
        language="css"
        code={`/* oklch(L C H) — Lightness, Chroma, Hue */
color: oklch(70% 0.2 30);      /* laranja vívido */
color: oklch(50% 0.15 250);    /* azul */
color: oklch(70% 0.2 30 / .8); /* com alpha */

/* L: 0% (preto) → 100% (branco)
   C: 0 (cinza) → ~0.4 (saturação máxima visível)
   H: 0-360° (mesmo conceito do HSL)  */

/* Por que importa: paletas geradas com OKLCH têm contraste consistente */
:root {
  --primary-50:  oklch(95% 0.02 250);
  --primary-100: oklch(90% 0.05 250);
  --primary-500: oklch(60% 0.20 250);
  --primary-900: oklch(20% 0.10 250);
}`}
      />

      <h2>color-mix (mistura sem pré-processador)</h2>
      <CodeBlock
        language="css"
        code={`/* Misturar duas cores no espaço escolhido */
color: color-mix(in oklch, blue 60%, white);
color: color-mix(in srgb, var(--brand) 80%, black 20%);

/* Útil para hover states automáticos */
.btn {
  background: var(--brand);
}
.btn:hover {
  background: color-mix(in oklch, var(--brand), black 10%);
}
.btn:active {
  background: color-mix(in oklch, var(--brand), black 20%);
}`}
      />

      <h2>Wide-gamut: P3 e Rec2020</h2>
      <CodeBlock
        language="css"
        code={`/* sRGB cobre ~35% das cores visíveis. P3 cobre ~50%.
   Telas de iPhone, MacBook, OLED de TVs modernas suportam P3. */

color: color(display-p3 1 0 0);          /* "vermelho real" — mais saturado */
color: color(rec2020 0 1 0);             /* verde ainda mais amplo */

/* Fallback automático — browsers que não suportam ignoram */
.brand {
  color: red;                                 /* sRGB */
  color: color(display-p3 1 0.1 0.05);        /* sobrescreve em telas P3 */
}`}
      />

      <h2>Gradients</h2>
      <CodeBlock
        language="css"
        code={`/* Linear */
background: linear-gradient(to bottom, #fff, #eee);
background: linear-gradient(45deg, #ff6b00, #ffcc00);
background: linear-gradient(180deg, transparent, black 80%);

/* Radial */
background: radial-gradient(circle at center, #fff, transparent);
background: radial-gradient(ellipse at top, var(--brand), transparent 70%);

/* Conic (gira ao redor de um ponto) */
background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);

/* Repeating */
background: repeating-linear-gradient(
  45deg,
  #f0f0f0 0,
  #f0f0f0 10px,
  white 10px,
  white 20px
);

/* Mesh-like com múltiplos radial em camadas */
background:
  radial-gradient(at 20% 30%, hsl(0 100% 50% / .3), transparent 50%),
  radial-gradient(at 80% 70%, hsl(220 100% 50% / .3), transparent 50%),
  black;

/* Gradient interpolation no espaço perceptual */
background: linear-gradient(in oklch, blue, red);   /* sem "zona cinza" no meio */`}
      />

      <h2>Variáveis CSS para sistema de cor</h2>
      <CodeBlock
        language="css"
        code={`:root {
  /* Tokens primitivos */
  --color-blue-500: oklch(60% 0.18 250);
  --color-blue-600: oklch(50% 0.20 250);

  /* Tokens semânticos */
  --color-bg:        oklch(98% 0.005 250);
  --color-text:      oklch(15% 0.02 250);
  --color-primary:   var(--color-blue-600);
  --color-link:      var(--color-blue-500);
  --color-border:    oklch(90% 0.01 250);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:    oklch(15% 0.02 250);
    --color-text:  oklch(95% 0.01 250);
    --color-border: oklch(30% 0.02 250);
  }
}

body { background: var(--color-bg); color: var(--color-text); }`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* Botões com variantes geradas via color-mix */
.btn {
  --btn-bg: var(--color-primary);
  background: var(--btn-bg);
  color: white;
}
.btn:hover  { background: color-mix(in oklch, var(--btn-bg), black 8%); }
.btn:active { background: color-mix(in oklch, var(--btn-bg), black 16%); }
.btn:disabled { background: color-mix(in oklch, var(--btn-bg), gray 60%); }

/* Border sutil que respeita dark mode */
.card {
  border: 1px solid color-mix(in srgb, currentColor 15%, transparent);
}

/* Glassmorphism */
.panel {
  background: oklch(100% 0 0 / .6);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid oklch(100% 0 0 / .3);
}

/* Texto com gradient */
.title {
  background: linear-gradient(45deg, var(--c1), var(--c2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}`}
      />

      <h2>Acessibilidade: contraste</h2>
      <p>
        WCAG 2.2 exige contraste mínimo entre texto e fundo:
      </p>
      <ul>
        <li><strong>4.5:1</strong> para texto normal (Level AA).</li>
        <li><strong>3:1</strong> para texto grande (≥18pt regular ou 14pt bold).</li>
        <li><strong>7:1</strong> para Level AAA.</li>
      </ul>
      <CodeBlock
        language="css"
        code={`/* APCA (algoritmo perceptual) está em desenvolvimento.
   Ferramenta: https://www.myndex.com/APCA/  */

/* Use a função light-dark() para alternar respeitando preferência */
:root { color-scheme: light dark; }
.btn { color: light-dark(black, white); }`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Hex não suporta wide gamut">
        <code>#ff0000</code> SEMPRE significa sRGB. Para acessar P3,
        você precisa de <code>color(display-p3 ...)</code> ou
        <code> oklch()</code>.
      </AlertBox>

      <AlertBox type="danger" title="HSL para tema dark falha">
        Misturar tons em HSL gera resultados surpreendentes. Por
        exemplo, <code>hsl(60 100% 50%)</code> (amarelo) parece
        muito mais "claro" que <code>hsl(240 100% 50%)</code>
        (azul) — mesmo L. Use OKLCH para paletas.
      </AlertBox>

      <AlertBox type="warning" title="background-clip: text precisa de prefix">
        Em browsers antigos, ainda precisa de
        <code> -webkit-background-clip: text </code> antes da
        propriedade unprefixed.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`/* Formatos modernos */
oklch(70% 0.2 30)              /* o melhor para paletas */
rgb(255 0 0 / 80%)             /* sintaxe moderna */
color(display-p3 1 0 0)        /* wide gamut */

color-mix(in oklch, A, B 30%)  /* misturar */
linear-gradient(in oklch, ...)  /* gradient suave */
backdrop-filter: blur(10px)     /* glassmorphism */
light-dark(L, D)                /* tema automático */

color-scheme: light dark;       /* habilita dark mode */
@media (prefers-color-scheme: dark) { ... }`}
      />
    </PageContainer>
  );
}
