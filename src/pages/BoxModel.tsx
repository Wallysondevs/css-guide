import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function BoxModel() {
  return (
    <PageContainer
      title="Box Model"
      subtitle="Todo elemento HTML é uma caixa retangular composta de quatro camadas. Entender essas camadas é o primeiro passo para qualquer layout."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <h2>As 4 camadas</h2>
      <CodeBlock
        language="text"
        code={`+--------------------------------+
|         margin (externa)        |
|  +--------------------------+   |
|  |   border                  |  |
|  |  +--------------------+   |  |
|  |  |  padding            |  |  |
|  |  |  +--------------+   |  |  |
|  |  |  |   content     |  |  |  |
|  |  |  +--------------+   |  |  |
|  |  +--------------------+   |  |
|  +--------------------------+   |
+--------------------------------+`}
      />

      <ul>
        <li><strong>content</strong> — texto, imagem, filhos. Tem <code>width</code> e <code>height</code>.</li>
        <li><strong>padding</strong> — espaço interno entre o conteúdo e a borda.</li>
        <li><strong>border</strong> — a linha visível ao redor.</li>
        <li><strong>margin</strong> — espaço externo, separa de outros elementos. Pode ser negativa.</li>
      </ul>

      <h2>O problema histórico</h2>
      <CodeBlock
        language="css"
        code={`/* Sem box-sizing: largura final = width + padding + border */
.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #000;
  /* ocupa 342px na tela! */
}`}
      />

      <h2>A solução universal: box-sizing</h2>
      <CodeBlock
        language="css"
        code={`/* Ajuste recomendado em TODO projeto */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Agora width já inclui padding e border */
.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #000;
  /* ocupa exatamente 300px */
}`}
      />

      <AlertBox type="success" title="border-box é o padrão de fato">
        Praticamente todo CSS reset/normalize moderno aplica
        <code> box-sizing: border-box </code> globalmente. Tailwind,
        Bootstrap, MUI — todos. Configure no seu reset e nunca mais
        pense nisso.
      </AlertBox>

      <h2>Margin collapse (a confusão clássica)</h2>
      <CodeBlock
        language="html"
        code={`<div style="margin-bottom: 20px">A</div>
<div style="margin-top: 30px">B</div>
<!-- Espaço entre A e B = 30px (não 50!) -->`}
      />
      <p>
        Margens verticais adjacentes se <strong>colapsam</strong>
        usando o maior valor. Acontece também entre pai e primeiro/último
        filho. Como evitar:
      </p>
      <CodeBlock
        language="css"
        code={`/* Qualquer um destes quebra o colapso */
.parent {
  display: flex;        /* ou grid */
  /* OU */
  padding: 0.01px 0;
  /* OU */
  overflow: hidden;
  /* OU */
  border-top: 1px solid transparent;
}`}
      />

      <h2>Padding e margin shorthand</h2>
      <CodeBlock
        language="css"
        code={`/* 1 valor — todos os lados */
padding: 1rem;

/* 2 — vertical | horizontal */
padding: 1rem 2rem;

/* 3 — top | horizontal | bottom */
padding: 1rem 2rem 0.5rem;

/* 4 — top | right | bottom | left (sentido horário) */
padding: 1rem 2rem 0.5rem 0;

/* Lógicos (independente de direção do texto) */
padding-block: 1rem;        /* top + bottom em LTR */
padding-inline: 2rem;       /* left + right em LTR */
margin-block-start: 1rem;   /* respeita writing-mode */`}
      />

      <h2>display: block | inline | inline-block</h2>
      <CodeBlock
        language="css"
        code={`/* block — ocupa linha inteira, aceita width/height */
div, section, article { display: block; }

/* inline — flui no texto, IGNORA width/height/margin-vertical */
span, a, strong { display: inline; }

/* inline-block — flui inline mas aceita box completo */
.tag { display: inline-block; padding: .25rem .5rem; }

/* none — remove do fluxo (e da árvore de acessibilidade!) */
.hidden { display: none; }

/* contents — elimina a CAIXA mas mantém os filhos */
.wrapper { display: contents; }`}
      />

      <h2>outline ≠ border</h2>
      <CodeBlock
        language="css"
        code={`/* border ocupa espaço (entra no box model) */
.btn { border: 2px solid blue; }

/* outline NÃO ocupa espaço — fica POR FORA, sem deslocar */
.btn:focus-visible { outline: 2px solid blue; outline-offset: 2px; }

/* Por isso outline é o padrão para foco acessível */`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* Card com altura mínima e padding consistente */
.card {
  min-height: 200px;
  padding: 1.5rem;
  border: 1px solid hsl(0 0% 90%);
  border-radius: .75rem;
}

/* Centralizar bloco horizontalmente */
.container {
  max-width: 1200px;
  margin-inline: auto;     /* moderna; equivale a margin: 0 auto */
  padding-inline: 1rem;
}

/* Reset de listas (zerar padding e marker) */
ul.menu {
  padding-inline-start: 0;
  list-style: none;
}`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="margin auto não funciona em flex/grid item">
        <code>margin: 0 auto</code> centraliza um bloco no fluxo normal.
        Em flex container, use <code>justify-content: center</code> ou
        <code> margin-inline: auto </code> no item — funciona, mas o
        comportamento é diferente.
      </AlertBox>

      <AlertBox type="danger" title="height: 100% precisa de pai com altura">
        <code>height: 100%</code> em <code>body</code> sem
        <code> html, body &#123; height: 100% &#125; </code> não funciona.
        Em layouts modernos, prefira <code>min-height: 100dvh</code>.
      </AlertBox>

      <AlertBox type="warning" title="display:none vs visibility:hidden vs opacity:0">
        <ul>
          <li><code>display:none</code> — sai do fluxo, sai da acessibilidade.</li>
          <li><code>visibility:hidden</code> — ocupa espaço, sai da acessibilidade.</li>
          <li><code>opacity:0</code> — ocupa espaço, AINDA é clicável e lido por screen reader.</li>
        </ul>
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`* { box-sizing: border-box; }                  /* sempre */
padding: T R B L      /* horário */
margin: T R B L
margin-inline: auto   /* centraliza horiz */
margin-block: 1rem    /* topo + base */
display: block | inline | inline-block | flex | grid | contents | none
outline: 2px solid    /* foco — não ocupa espaço */
border: 2px solid     /* ocupa espaço */`}
      />
    </PageContainer>
  );
}
