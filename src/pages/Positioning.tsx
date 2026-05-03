import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Positioning() {
  return (
    <PageContainer
      title="Position & Z-index"
      subtitle="static, relative, absolute, fixed, sticky — e o caos do stacking context. Onde a maioria dos bugs visuais nascem."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Os 5 valores de position</h2>
      <ul>
        <li><strong>static</strong> — padrão. Segue o fluxo. Ignora <code>top/right/bottom/left/z-index</code>.</li>
        <li><strong>relative</strong> — fica no fluxo, mas pode ser deslocado. Cria contexto para filhos absolute.</li>
        <li><strong>absolute</strong> — sai do fluxo. Posicionado em relação ao ancestral mais próximo com <code>position</code> diferente de static.</li>
        <li><strong>fixed</strong> — sai do fluxo. Posicionado em relação ao viewport. Não rola com a página.</li>
        <li><strong>sticky</strong> — híbrido: relative até cruzar um threshold, depois fixed.</li>
      </ul>

      <CodeBlock
        language="css"
        code={`/* relative — dentro do fluxo, deslocado visualmente */
.label { position: relative; top: -3px; }

/* absolute — em relação ao pai posicionado */
.tooltip-wrapper { position: relative; }
.tooltip-wrapper .tooltip {
  position: absolute;
  bottom: calc(100% + .5rem);
  left: 50%;
  transform: translateX(-50%);
}

/* fixed — em relação ao viewport */
.cookie-banner {
  position: fixed;
  inset: auto 0 0 0;     /* shorthand: top right bottom left */
  padding: 1rem;
}

/* sticky — gruda quando bate no threshold */
.section-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}`}
      />

      <h2>A propriedade inset (atalho moderno)</h2>
      <CodeBlock
        language="css"
        code={`/* inset = top + right + bottom + left */
.fill { position: absolute; inset: 0; }     /* preenche o pai */
.modal { position: fixed; inset: 0; }       /* fullscreen */

/* Logical (respeita writing-mode) */
.right { inset-inline-end: 1rem; inset-block-start: 1rem; }`}
      />

      <h2>Stacking context (a fonte de TODOS os bugs de z-index)</h2>
      <p>
        Um <strong>stacking context</strong> é um "isolamento" de z-index.
        Elementos dentro de um contexto NUNCA podem aparecer acima ou
        abaixo de elementos de OUTRO contexto, não importa o
        z-index. É essencial entender o que cria um.
      </p>

      <AlertBox type="info" title="O que cria um novo stacking context">
        <ul>
          <li>Elemento <code>html</code> (raiz).</li>
          <li><code>position: absolute|relative</code> + <code>z-index</code> ≠ auto.</li>
          <li><code>position: fixed</code> ou <code>sticky</code>.</li>
          <li><code>opacity</code> &lt; 1.</li>
          <li><code>transform</code>, <code>filter</code>, <code>perspective</code>, <code>backdrop-filter</code> ≠ none.</li>
          <li><code>will-change</code>, <code>contain: layout|paint|strict</code>.</li>
          <li><code>isolation: isolate</code> (a forma mais limpa).</li>
          <li>Flex/Grid item com <code>z-index</code>.</li>
        </ul>
      </AlertBox>

      <CodeBlock
        language="css"
        code={`/* Bug clássico: modal "atrás" do header */
.header {
  position: sticky;
  top: 0;
  transform: translateZ(0);   /* CRIOU stacking context */
  z-index: 10;
}

.modal {
  position: fixed;
  z-index: 9999;              /* não adianta — está em outro contexto */
}

/* SOLUÇÃO: subir o modal para o body via portal,
   ou usar isolation no header E garantir que o modal não tem
   ancestral com transform/opacity. */`}
      />

      <h2>isolation: isolate (a forma limpa)</h2>
      <CodeBlock
        language="css"
        code={`/* Cria stacking context SEM efeitos colaterais (sem transform fake) */
.card {
  isolation: isolate;
}

/* Útil para confinar z-index de filhos sem afetar o resto da página */`}
      />

      <h2>position: sticky em detalhe</h2>
      <CodeBlock
        language="css"
        code={`/* Sticky precisa de:
   1. Um threshold (top, bottom, etc.)
   2. Um pai SCROLLÁVEL que seja maior que o sticky */

.toc {
  position: sticky;
  top: 1rem;
  align-self: start;     /* CRÍTICO em flex/grid: sem isso o item estica */
}

/* Pegadinha: overflow:hidden no ANCESTRAL quebra sticky.
   Ferramenta de debug:
   document.querySelectorAll('*').forEach(el => {
     const s = getComputedStyle(el);
     if (['hidden','clip','auto','scroll'].includes(s.overflow))
       console.log('quebra sticky:', el);
   });  */`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* 1. Badge no canto de um card */
.card { position: relative; }
.card .badge {
  position: absolute;
  top: .5rem;
  right: .5rem;
}

/* 2. Modal centralizado (jeito moderno com display:grid) */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / .5);
  display: grid;
  place-items: center;
}

/* 3. Header sticky com scroll-margin para âncoras */
.section { scroll-margin-top: 5rem; }   /* compensa header de 80px */

/* 4. "Footer pegajoso" quando a página é curta */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}
.app main { flex: 1; }   /* empurra footer para baixo */

/* 5. Aspect-ratio para vídeos responsivos (substitui padding-bottom hack) */
.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="danger" title="z-index só funciona com position">
        <code>z-index: 999</code> em <code>position: static</code>
        (default) não faz nada. Sempre acompanhe com
        <code> position: relative </code> no mínimo.
      </AlertBox>

      <AlertBox type="warning" title="transform cria stacking context">
        Aplicar <code>transform: translate(0)</code> num pai cria um
        novo contexto — filhos com z-index ficam confinados a ele.
        Usado de propósito é poderoso; por engano vira pesadelo.
      </AlertBox>

      <AlertBox type="warning" title="position:absolute SEM pai relative">
        O elemento se posiciona em relação ao <code>html</code>
        (viewport quando rolado para topo). Quase nunca o que você
        quer. Sempre confirme: <em>"qual é o ancestral com
        position?"</em>.
      </AlertBox>

      <AlertBox type="danger" title="overflow:hidden no pai mata sticky">
        Mesmo um <code>overflow-x: hidden</code> num ancestral remoto
        é suficiente. Bug muito comum em sites com hero-banner que
        sangram para fora.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`position: relative   /* fica no fluxo, vira ref para filhos absolute */
position: absolute   /* sai do fluxo, em relação ao ancestor com position */
position: fixed      /* em relação ao viewport */
position: sticky + top: 0   /* gruda quando bate no topo */

inset: 0             /* top right bottom left = 0 */
isolation: isolate   /* novo stacking context limpo */

/* z-index: use uma escala documentada (10, 20, 30...)
   ou uma --z-modal: 1000; --z-toast: 2000; etc. */`}
      />
    </PageContainer>
  );
}
