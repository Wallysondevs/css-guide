import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Units() {
  return (
    <PageContainer
      title="Unidades CSS"
      subtitle="px, em, rem, %, vw, ch, dvh, fr, clamp()... cada uma resolve um problema. Saber qual usar separa CSS amador de profissional."
      difficulty="intermediario"
      timeToRead="9 min"
    >
      <h2>Absolutas vs relativas</h2>
      <ul>
        <li><strong>Absolutas</strong>: <code>px</code>, <code>cm</code>, <code>mm</code>, <code>in</code>, <code>pt</code>. Tamanho fixo, ignoram contexto.</li>
        <li><strong>Relativas</strong>: <code>em</code>, <code>rem</code>, <code>%</code>, <code>vw/vh</code>, <code>ch</code>, <code>ex</code>. Recalculam conforme pai/raiz/viewport.</li>
      </ul>

      <h2>px — quando ainda faz sentido</h2>
      <CodeBlock
        language="css"
        code={`/* Bom para: bordas finas, ícones, pixels exatos */
.card { border: 1px solid #eee; border-radius: 8px; }
.icon { width: 24px; height: 24px; }

/* Ruim para: tipografia (não respeita zoom do usuário em alguns browsers antigos) */`}
      />

      <h2>em — relativo ao font-size do PRÓPRIO elemento</h2>
      <CodeBlock
        language="css"
        code={`.card {
  font-size: 18px;
  padding: 1em;       /* = 18px */
  margin-bottom: 2em; /* = 36px */
}

/* CUIDADO com cascata de em (compounding) */
ul { font-size: 1.2em; }
ul ul { font-size: 1.2em; }   /* neto = 1.44em */
ul ul ul { font-size: 1.2em; } /* bisneto = 1.728em ! */`}
      />

      <h2>rem — relativo ao font-size da RAIZ (html)</h2>
      <CodeBlock
        language="css"
        code={`html { font-size: 16px; }     /* padrão do browser */

.btn {
  font-size: 1rem;             /* = 16px */
  padding: .5rem 1rem;         /* = 8px 16px */
  border-radius: .5rem;        /* = 8px */
}

/* Vantagem: respeita o "Default font size" do browser do usuário.
   Truque didático: html { font-size: 62.5% } => 1rem = 10px (mais cálculos limpos) */`}
      />

      <AlertBox type="info" title="Regra de bolso">
        <ul>
          <li><strong>rem</strong> para tipografia, espaçamentos, raios.</li>
          <li><strong>px</strong> para bordas finas e detalhes.</li>
          <li><strong>%</strong> para larguras dentro de containers.</li>
          <li><strong>vw/vh/dvh</strong> para herói/viewport.</li>
          <li><strong>ch</strong> para limitar largura de texto (~65ch ideal).</li>
          <li><strong>fr</strong> para Grid.</li>
        </ul>
      </AlertBox>

      <h2>Viewport units</h2>
      <CodeBlock
        language="css"
        code={`/* Clássicas */
.hero { height: 100vh; width: 100vw; }
/* 1vh = 1% da altura do viewport
   1vw = 1% da largura
   1vmin = menor dos dois
   1vmax = maior */

/* Modernas (2024+) — resolvem o "100vh com URL bar do mobile" */
.hero { min-height: 100dvh; }   /* dynamic — recalcula com URL bar */
.hero { min-height: 100svh; }   /* small — assume URL bar visível */
.hero { min-height: 100lvh; }   /* large — assume URL bar oculta */`}
      />

      <h2>ch e ex — relativos à fonte</h2>
      <CodeBlock
        language="css"
        code={`/* 1ch = largura do "0" da fonte atual */
article p { max-width: 65ch; }   /* ideal para legibilidade */

/* 1ex = altura do "x" minúsculo da fonte atual */
.dropcap { line-height: 1ex; }`}
      />

      <h2>% — depende do que é</h2>
      <CodeBlock
        language="css"
        code={`/* width/height — relativo ao container pai */
.col { width: 50%; }

/* padding/margin — SEMPRE relativo à LARGURA do pai (mesmo verticalmente!) */
.box { padding-top: 50%; }    /* aspect-ratio "hack" antigo */

/* font-size — relativo ao font-size do pai (= 1em) */
small { font-size: 80%; }

/* line-height sem unidade — multiplicador do font-size atual */
body { line-height: 1.5; }    /* prefira sem unidade */`}
      />

      <h2>Calc, min, max, clamp</h2>
      <CodeBlock
        language="css"
        code={`/* calc() — operações matemáticas */
.col { width: calc(100% - 2rem); }
.hero { height: calc(100dvh - 64px); } /* desconta header */

/* min() — escolhe o MENOR valor (limita o máximo) */
.title { font-size: min(5vw, 3rem); }

/* max() — escolhe o MAIOR valor (limita o mínimo) */
.gap { gap: max(1rem, 2vw); }

/* clamp(MIN, IDEAL, MAX) — fluido com limites — fluid typography! */
h1 { font-size: clamp(2rem, 5vw + 1rem, 4rem); }
.container { padding-inline: clamp(1rem, 5%, 3rem); }`}
      />

      <h2>fr — exclusivo do Grid</h2>
      <CodeBlock
        language="css"
        code={`.layout {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  /* 200px fixo, depois divide o resto em 2 partes iguais */
}

.layout {
  grid-template-columns: 1fr 2fr 1fr;
  /* proporção 1:2:1 do espaço disponível */
}`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* Tipografia fluida moderna */
:root {
  --step--1: clamp(0.83rem, 0.78rem + 0.24vw, 0.96rem);
  --step-0:  clamp(1rem,    0.93rem + 0.36vw, 1.20rem);
  --step-1:  clamp(1.20rem, 1.10rem + 0.49vw, 1.50rem);
  --step-2:  clamp(1.44rem, 1.30rem + 0.69vw, 1.88rem);
  --step-3:  clamp(1.73rem, 1.53rem + 0.97vw, 2.34rem);
}

/* Container com padding fluido */
.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
}

/* Hero sem o "100vh quebrado" */
.hero {
  min-height: 100dvh;
  padding-block: clamp(2rem, 8vh, 6rem);
}`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="100vh corta no mobile">
        Em iOS Safari, <code>100vh</code> inclui a área coberta pela
        URL bar — quando ela some, o conteúdo é cortado embaixo.
        Sempre prefira <code>100dvh</code> em 2024+.
      </AlertBox>

      <AlertBox type="danger" title="Compounding de em">
        Aninhar <code>em</code> sem rem cria explosão de tamanhos.
        Use <code>rem</code> para a maioria, e <code>em</code> só
        em casos onde você QUER escala relativa (padding de botão
        que cresce com o font-size).
      </AlertBox>

      <AlertBox type="warning" title="line-height com unidade">
        <code>line-height: 1.5</code> herda CORRETO. <code>line-height:
        1.5em</code> herda o VALOR COMPUTADO, quebrando em filhos com
        font-size diferente. Sempre sem unidade.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`px       — bordas, ícones precisos
rem      — tipografia, espaçamentos (regra geral)
em       — quando QUERO escalar com o pai
%        — width dentro de container; padding-bottom:% para aspect-ratio
vw vh    — viewport (cuidado: prefira dvh em mobile)
dvh svh lvh — viewport dinâmico (mobile-safe)
ch       — largura de texto (max-width: 65ch)
fr       — grid only
clamp(min, ideal, max)  — tudo "fluido com limite"`}
      />
    </PageContainer>
  );
}
