import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Flexbox() {
  return (
    <PageContainer
      title="Flexbox"
      subtitle="O sistema de layout 1D do CSS: alinha e distribui itens em uma linha ou coluna. Domínio obrigatório para qualquer componente moderno."
      difficulty="intermediario"
      timeToRead="12 min"
    >
      <h2>Conceitos: container e items</h2>
      <CodeBlock
        language="css"
        code={`.container {
  display: flex;          /* ou inline-flex */
  /* TUDO o que vem a seguir é PROPRIEDADE do container */
}

.container > .item {
  /* PROPRIEDADES do item */
}`}
      />

      <h2>Eixos: main e cross</h2>
      <ul>
        <li><strong>Main axis</strong> — direção dos itens. Por padrão horizontal (row).</li>
        <li><strong>Cross axis</strong> — perpendicular. Por padrão vertical.</li>
        <li><code>flex-direction: column</code> rotaciona tudo: main vira vertical, cross vira horizontal.</li>
      </ul>

      <h2>Propriedades do container</h2>
      <CodeBlock
        language="css"
        code={`.container {
  display: flex;
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  flex-flow: row wrap;            /* shorthand de direction + wrap */

  /* Distribuição no MAIN axis */
  justify-content: flex-start | flex-end | center
                 | space-between | space-around | space-evenly;

  /* Alinhamento no CROSS axis (linha única) */
  align-items: stretch | flex-start | flex-end | center | baseline;

  /* Alinhamento de MÚLTIPLAS linhas (precisa wrap) */
  align-content: flex-start | flex-end | center
               | space-between | space-around | stretch;

  /* Espaço entre itens (substitui margin entre vizinhos) */
  gap: 1rem;                       /* row e column */
  row-gap: 1rem;
  column-gap: 2rem;
}`}
      />

      <h2>Propriedades do item</h2>
      <CodeBlock
        language="css"
        code={`.item {
  /* CRESCIMENTO — quanto ocupar do espaço sobrando (proporção) */
  flex-grow: 0;        /* default = não cresce */

  /* ENCOLHIMENTO — quanto ceder quando faltar espaço */
  flex-shrink: 1;      /* default = encolhe proporcionalmente */

  /* TAMANHO BASE — antes de aplicar grow/shrink */
  flex-basis: auto;    /* auto | 0 | 200px | 30% */

  /* Shorthand (quase sempre use o atalho) */
  flex: 0 1 auto;      /* default */
  flex: 1;             /* = 1 1 0%   (ocupa o espaço sobrando) */
  flex: auto;          /* = 1 1 auto (cresce baseado no conteúdo) */
  flex: none;          /* = 0 0 auto (rígido) */

  /* Alinhamento INDIVIDUAL no cross axis (sobrescreve align-items) */
  align-self: auto | stretch | flex-start | flex-end | center;

  /* Reordenar visualmente (não muda o DOM) */
  order: 0;            /* default; negativo vai para o início */
}`}
      />

      <h2>Padrões mais usados</h2>
      <CodeBlock
        language="css"
        code={`/* 1. Centralizar absolutamente */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
}

/* 2. Header com logo à esquerda + menu à direita */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 3. Empurrar último item para a direita */
.toolbar { display: flex; gap: 1rem; }
.toolbar .right { margin-inline-start: auto; }

/* 4. Cards iguais que ocupam toda a linha */
.cards { display: flex; gap: 1rem; }
.cards > .card { flex: 1; }

/* 5. Grid responsivo "fake" com flex-wrap */
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.grid > .item { flex: 1 1 calc(33% - 1rem); min-width: 200px; }

/* 6. Sidebar fixa + main flexível */
.layout { display: flex; gap: 2rem; }
.layout > aside { flex: 0 0 250px; }   /* fixo */
.layout > main  { flex: 1; }           /* preenche o resto */`}
      />

      <h2>Diferença sutil: flex: 1 vs flex: auto vs width</h2>
      <CodeBlock
        language="css"
        code={`/* flex: 1   = 1 1 0%
   - basis 0% → ignora conteúdo, divide o espaço EM PROPORÇÃO IGUAL
   - 3 itens com flex:1 viram 3 colunas iguais sempre */

/* flex: auto = 1 1 auto
   - basis auto → começa com a largura do conteúdo, depois cresce
   - itens com mais texto ficam maiores */

/* width: 200px (sem flex)
   - basis igual a width, não cresce, não encolhe (a menos que falte espaço) */`}
      />

      <h2>gap em flex (a salvação)</h2>
      <CodeBlock
        language="css"
        code={`/* Antes (era preciso negative margin truques) */
.cards > .card { margin-right: 1rem; }
.cards > .card:last-child { margin-right: 0; }

/* Hoje: simples e funciona com wrap */
.cards { display: flex; flex-wrap: wrap; gap: 1rem; }`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* Botão com ícone alinhado verticalmente */
.btn {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .5rem 1rem;
}

/* Card com footer "grudado" embaixo (mesmo com conteúdo variável) */
.card {
  display: flex;
  flex-direction: column;
  min-height: 300px;
}
.card .footer { margin-top: auto; }

/* Lista de tags que quebra linha bonito */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
}

/* Holy Grail layout (header / sidebar / main / aside / footer) */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
.app > header, .app > footer { flex: 0 0 auto; }
.app > .body {
  display: flex;
  flex: 1;
}
.app > .body > main { flex: 1; }
.app > .body > aside { flex: 0 0 250px; }`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="min-width: auto bloqueia o shrink">
        Itens flex têm <code>min-width: auto</code> por padrão — eles
        nunca encolhem abaixo do conteúdo. Sintoma: texto longo
        estoura o container. Solução: <code>min-width: 0</code> no
        item (e <code>overflow: hidden</code> ou
        <code> text-overflow: ellipsis</code> se quiser cortar).
      </AlertBox>

      <AlertBox type="danger" title="margin auto NÃO funciona como em block">
        <code>margin: 0 auto</code> em flex item NÃO centraliza no
        sentido tradicional — funciona, mas faz coisa diferente:
        consome espaço vazio na direção. Use
        <code> justify-content: center </code> no container.
      </AlertBox>

      <AlertBox type="warning" title="height: 100% em coluna flex precisa do pai">
        <code>flex-direction: column</code> + <code>height:100%</code>
        em filho exige que o container tenha altura definida (não
        pode ser auto). Use <code>min-height: 100dvh</code> ou
        defina a altura explicitamente.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`/* Container */
display: flex
flex-direction: row | column
flex-wrap: wrap
gap: 1rem
justify-content: center | space-between | space-evenly  (main)
align-items: center | stretch                            (cross)
align-content: center                                    (multi-line)

/* Items */
flex: 1                  /* preenche em proporção igual */
flex: 0 0 200px          /* fixo */
align-self: flex-end     /* só este item */
order: -1                /* puxa pro início */
margin-inline-start: auto /* empurra à direita */`}
      />
    </PageContainer>
  );
}
