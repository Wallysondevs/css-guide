import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Typography() {
  return (
    <PageContainer
      title="Tipografia"
      subtitle="Web fonts, font-display, line-height ótimo, font-feature-settings, variable fonts — o detalhe que diferencia um site bom de um excelente."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Carregando uma web font</h2>
      <CodeBlock
        language="css"
        code={`/* Auto-hospedada (recomendado: privacidade + performance) */
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Variable.woff2") format("woff2-variations");
  font-weight: 100 900;             /* range para variable font */
  font-style: normal;
  font-display: swap;               /* CRÍTICO — ver abaixo */
}

body { font-family: "Inter", system-ui, sans-serif; }`}
      />

      <h2>font-display (a propriedade mais importante)</h2>
      <ul>
        <li><strong>auto</strong> — comportamento do browser (quase sempre = block).</li>
        <li><strong>block</strong> — texto invisível por até 3s. Bom para logos.</li>
        <li><strong>swap</strong> — mostra fonte fallback IMEDIATAMENTE, troca quando carrega. Padrão moderno.</li>
        <li><strong>fallback</strong> — 100ms invisível, depois fallback; só troca se carregou em 3s.</li>
        <li><strong>optional</strong> — 100ms invisível; só usa a custom font se já estiver no cache. Best for performance.</li>
      </ul>

      <CodeBlock
        language="css"
        code={`/* Estratégia anti-FOIT (Flash of Invisible Text) */
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter.woff2") format("woff2");
  font-display: swap;

  /* Métricas que aproximam o fallback (reduz CLS) */
  size-adjust: 100%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}`}
      />

      <h2>Variable fonts</h2>
      <CodeBlock
        language="css"
        code={`/* 1 arquivo cobre TODOS os pesos e estilos (~30-100 KB) */
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter.var.woff2") format("woff2-variations");
  font-weight: 100 900;          /* range, não valores fixos */
  font-stretch: 75% 125%;
}

/* Use qualquer peso intermediário */
.heading { font-weight: 580; }
.subtle  { font-weight: 350; }

/* Eixos custom via font-variation-settings */
.x {
  font-variation-settings:
    "wght" 600,
    "wdth" 110,         /* width */
    "slnt" -8,          /* slant */
    "opsz" 32;          /* optical size */
}`}
      />

      <h2>Stacks de fontes do sistema</h2>
      <CodeBlock
        language="css"
        code={`/* Sans-serif universal (zero download) */
font-family:
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  Oxygen,
  Ubuntu,
  Cantarell,
  "Helvetica Neue",
  sans-serif;

/* Mais simples e quase tão bom (2024+) */
font-family: system-ui, sans-serif;

/* Mono para código */
font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;`}
      />

      <h2>line-height — o detalhe que diferencia tudo</h2>
      <CodeBlock
        language="css"
        code={`/* Sem unidade — herda como MULTIPLICADOR (correto) */
body { line-height: 1.5; }      /* corpo de texto */
h1, h2, h3 { line-height: 1.2; } /* títulos */

/* Com unidade — herda valor COMPUTADO (quase sempre errado) */
body { line-height: 24px; }     /* h1 com 32px herda 24px → text "smushed" */

/* Trick para botões: line-height igual ao height visual */
.btn { padding: .75rem 1rem; line-height: 1; }`}
      />

      <h2>Espaçamento de letras</h2>
      <CodeBlock
        language="css"
        code={`/* Em headlines grandes, REDUZIR letter-spacing */
h1 { font-size: 4rem; letter-spacing: -0.02em; }

/* Em texto small/uppercase, AUMENTAR */
.label { font-size: .75rem; text-transform: uppercase; letter-spacing: .08em; }

/* word-spacing raramente útil */`}
      />

      <h2>OpenType features</h2>
      <CodeBlock
        language="css"
        code={`/* Ligatures, alternates, números tabulares, etc. */
.numbers {
  font-variant-numeric: tabular-nums;     /* alinhamento perfeito em tabelas */
}

.headline {
  font-feature-settings:
    "ss01" on,        /* stylistic set 1 */
    "dlig" on,        /* discretionary ligatures */
    "case" on;        /* uppercase punctuation */
}

/* Atalhos modernos (preferir) */
.text {
  font-variant-ligatures: common-ligatures discretionary-ligatures;
  font-variant-caps: small-caps;
  font-variant-numeric: oldstyle-nums proportional-nums;
}`}
      />

      <h2>Quebra e wrap</h2>
      <CodeBlock
        language="css"
        code={`/* Limitar largura para legibilidade */
article p { max-width: 65ch; }       /* ~65 caracteres */

/* text-wrap modernos (2024+) */
h1, h2, h3 { text-wrap: balance; }   /* títulos com linhas equilibradas */
p          { text-wrap: pretty; }     /* evita "viúvas" no fim */

/* Quebra de palavra longa (URLs, code) */
.code {
  overflow-wrap: anywhere;            /* quebra em qualquer ponto */
  word-break: normal;                 /* respeita palavras */
}

/* Hifenização (precisa lang="pt-BR" no html) */
article { hyphens: auto; }`}
      />

      <h2>Truncar texto</h2>
      <CodeBlock
        language="css"
        code={`/* 1 linha */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* N linhas (line-clamp moderno) */
.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Versão padronizada (2024+) */
.clamp-3 {
  line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* Sistema de tipografia fluida + harmônica */
:root {
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, monospace;

  --fs--1: clamp(.83rem, .78rem + .24vw, .96rem);
  --fs-0:  clamp(1rem, .93rem + .36vw, 1.20rem);
  --fs-1:  clamp(1.20rem, 1.10rem + .49vw, 1.50rem);
  --fs-2:  clamp(1.44rem, 1.30rem + .69vw, 1.88rem);
  --fs-3:  clamp(1.73rem, 1.53rem + .97vw, 2.34rem);
  --fs-4:  clamp(2.07rem, 1.81rem + 1.36vw, 2.93rem);
}

body { font-family: var(--font-sans); font-size: var(--fs-0); line-height: 1.6; }
h1   { font-size: var(--fs-4); line-height: 1.1; letter-spacing: -.02em; text-wrap: balance; }
h2   { font-size: var(--fs-3); line-height: 1.2; letter-spacing: -.01em; text-wrap: balance; }

/* Artigo de blog otimizado para leitura */
article {
  max-width: 70ch;
  margin-inline: auto;
  font-size: var(--fs-0);
  line-height: 1.7;
  text-wrap: pretty;
  hyphens: auto;
}
article p + p { margin-top: 1em; }`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="danger" title="font-display: block é o pior padrão">
        Sem <code>font-display: swap</code> (ou outro), texto fica
        invisível até a fonte carregar. Em conexões 3G isso pode ser
        3-5 segundos de tela em branco. <strong>Sempre defina
        font-display.</strong>
      </AlertBox>

      <AlertBox type="warning" title="line-height com unidade">
        <code>line-height: 1.5em</code> herda computado. Em h1 com
        font-size diferente, o espaçamento vira amassado. Sempre
        sem unidade: <code>line-height: 1.5</code>.
      </AlertBox>

      <AlertBox type="warning" title="Google Fonts: privacidade e performance">
        Em 2022, tribunal alemão considerou Google Fonts violação de
        GDPR (envia IP para Google). Auto-hospede via
        <code> @fontsource </code> ou baixe os WOFF2 manualmente.
        Bonus: 1 round-trip a menos.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`@font-face { ... font-display: swap; }    /* sempre swap */
font-family: system-ui, sans-serif        /* zero download */
font-weight: 100-900                      /* variable font */
font-variation-settings: "wght" 580       /* eixos custom */

line-height: 1.5                          /* SEM unidade */
letter-spacing: -.02em                    /* só em headlines grandes */

text-wrap: balance                        /* títulos */
text-wrap: pretty                         /* parágrafos */
hyphens: auto                             /* requer lang */
font-variant-numeric: tabular-nums        /* tabelas */

max-width: 65ch                           /* limite de leitura */`}
      />
    </PageContainer>
  );
}
