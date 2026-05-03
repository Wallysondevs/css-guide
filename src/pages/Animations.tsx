import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Animations() {
  return (
    <PageContainer
      title="Transições & Animações"
      subtitle="transition para mudanças de estado, @keyframes para sequências, scroll-driven animations para parallax sem JS — o kit completo de motion."
      difficulty="intermediario"
      timeToRead="11 min"
    >
      <h2>transition — animar mudanças de estado</h2>
      <CodeBlock
        language="css"
        code={`.btn {
  background: blue;
  transform: scale(1);
  transition: background 200ms ease, transform 150ms ease;
}
.btn:hover {
  background: navy;
  transform: scale(1.05);
}

/* Shorthand: property duration timing-function delay */
transition: opacity 300ms ease-out 100ms;

/* Múltiplas propriedades — separar com vírgula */
transition:
  opacity 300ms ease,
  transform 200ms cubic-bezier(.4, 0, .2, 1);

/* Animar TUDO (cuidado com performance) */
transition: all 200ms ease;`}
      />

      <h2>Timing functions (easing)</h2>
      <CodeBlock
        language="css"
        code={`/* Pré-definidos */
transition-timing-function: linear;
transition-timing-function: ease;          /* default */
transition-timing-function: ease-in;       /* devagar no começo */
transition-timing-function: ease-out;      /* devagar no fim */
transition-timing-function: ease-in-out;   /* devagar nos dois extremos */

/* Bezier custom (use cubic-bezier.com) */
transition-timing-function: cubic-bezier(.4, 0, .2, 1);  /* "Material" */
transition-timing-function: cubic-bezier(.34, 1.56, .64, 1); /* spring suave */

/* Steps (animação "pixelizada") */
transition-timing-function: steps(5, end);

/* Spring (CSS Working Group, 2024+) */
animation-timing-function: linear(0, 0.5 25%, 1);   /* sintaxe linear() */`}
      />

      <h2>@keyframes — sequências</h2>
      <CodeBlock
        language="css"
        code={`@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes slideIn {
  0%   { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: .5; }
}

/* Aplicar */
.spinner { animation: spin 1s linear infinite; }
.toast   { animation: slideIn 200ms ease-out; }

/* Shorthand: name duration timing delay iteration direction fill-mode play-state */
animation: slideIn 200ms ease-out 100ms 1 normal both running;`}
      />

      <h2>Propriedades de animation em detalhe</h2>
      <CodeBlock
        language="css"
        code={`.x {
  animation-name: slideIn;
  animation-duration: 300ms;
  animation-timing-function: ease-out;
  animation-delay: 100ms;
  animation-iteration-count: 1 | infinite | 3;
  animation-direction: normal | reverse | alternate | alternate-reverse;
  animation-fill-mode: none | forwards | backwards | both;
  animation-play-state: running | paused;
}

/* fill-mode: forwards = mantém o estado FINAL após terminar.
              backwards = aplica estado inicial ANTES de começar (durante delay).
              both = ambos. */`}
      />

      <h2>Performance: o que animar</h2>
      <AlertBox type="success" title="Propriedades baratas (compositor only)">
        <code>opacity</code>, <code>transform</code> (translate, scale,
        rotate). São processadas pela GPU sem reflow ou repaint
        completo. <strong>Sempre prefira essas.</strong>
      </AlertBox>

      <AlertBox type="danger" title="Propriedades caras (causam reflow)">
        <code>width, height, top, left, margin, padding, font-size</code>.
        Forçam o browser a recalcular layout de toda a página. Em
        animações de 60fps, são proibidas.
      </AlertBox>

      <CodeBlock
        language="css"
        code={`/* RUIM — anima top (reflow a cada frame) */
.bad { transition: top 300ms; }
.bad:hover { top: -5px; }

/* BOM — anima transform (só compositor) */
.good { transition: transform 300ms; }
.good:hover { transform: translateY(-5px); }

/* will-change avisa o browser para promover a layer
   (use APENAS antes de animar; remova depois) */
.modal { will-change: transform, opacity; }`}
      />

      <h2>Animar entre/saída de elementos</h2>
      <CodeBlock
        language="css"
        code={`/* Entrada (display: none → visível) precisa de "starting-style" */
@starting-style {
  .modal[open] { opacity: 0; transform: scale(.95); }
}
.modal[open] {
  opacity: 1;
  transform: scale(1);
  transition: opacity 200ms, transform 200ms;
}

/* Saída via display: none — antes era IMPOSSÍVEL, agora possível com:
   transition-behavior: allow-discrete (2024+) */
.tooltip {
  display: none;
  opacity: 0;
  transition: opacity 200ms, display 200ms allow-discrete;
}
.tooltip.show {
  display: block;
  opacity: 1;
}`}
      />

      <h2>Scroll-driven animations</h2>
      <CodeBlock
        language="css"
        code={`/* Animação que progride conforme scroll */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.section {
  animation: fade-in linear;
  animation-timeline: view();             /* progresso = visibilidade no viewport */
  animation-range: entry 0% cover 30%;
}

/* Progress bar de leitura no topo da página */
.read-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: var(--brand);
  transform-origin: left;
  animation: progress linear;
  animation-timeline: scroll(root);       /* root = página inteira */
}
@keyframes progress {
  to { transform: scaleX(1); }
}`}
      />

      <h2>View Transitions API (entre rotas/estados)</h2>
      <CodeBlock
        language="css"
        code={`/* Animação automática entre estados da página */
@view-transition { navigation: auto; }

/* Customizar nomes de transição */
.hero-image { view-transition-name: hero; }

::view-transition-old(hero),
::view-transition-new(hero) {
  animation-duration: 400ms;
}

/* JavaScript que dispara: */
/* document.startViewTransition(() => updateDOM()) */`}
      />

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* 1. Botão com hover suave + active "punch" */
.btn {
  transition: transform 150ms cubic-bezier(.4, 0, .2, 1),
              box-shadow 150ms ease;
}
.btn:hover  { transform: translateY(-2px); box-shadow: 0 8px 20px rgb(0 0 0 / .15); }
.btn:active { transform: translateY(0);    transition-duration: 50ms; }

/* 2. Skeleton loading */
@keyframes skel {
  0%, 100% { background-position: 200% 0; }
  50%      { background-position: -200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #eee 0%, #f5f5f5 50%, #eee 100%);
  background-size: 200% 100%;
  animation: skel 1.5s ease-in-out infinite;
}

/* 3. Indicator de carregamento (spinner) */
@keyframes spin { to { transform: rotate(1turn); } }
.spinner {
  width: 24px; height: 24px;
  border: 3px solid #eee;
  border-top-color: var(--brand);
  border-radius: 50%;
  animation: spin .8s linear infinite;
}

/* 4. Stagger (cascateado) com animation-delay */
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 100ms; }
.item:nth-child(3) { animation-delay: 200ms; }`}
      />

      <h2>Acessibilidade — prefers-reduced-motion</h2>
      <CodeBlock
        language="css"
        code={`/* SEMPRE adicione este reset em todo projeto */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Ou desabilitar APENAS animações decorativas */
@media (prefers-reduced-motion: no-preference) {
  .hero { animation: float 3s ease-in-out infinite; }
}`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="transition em display: none">
        Não anima nada — o elemento simplesmente desaparece. Use
        opacity + visibility, ou em 2024+ o
        <code> transition-behavior: allow-discrete</code>.
      </AlertBox>

      <AlertBox type="danger" title="will-change para SEMPRE">
        <code>will-change: transform</code> permanente cria layer GPU
        permanente — consome RAM e bateria. Use só durante a animação,
        remova depois (via JS).
      </AlertBox>

      <AlertBox type="warning" title="transition: all em qualquer coisa">
        Anima TODA mudança, inclusive coisas que você não esperava
        (font-size, color, transform...). Pode causar bugs visuais e
        performance. Liste explicitamente as propriedades.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`/* Regra de ouro: anime opacity e transform; nada mais. */

transition: prop dur timing delay
ease | ease-in-out | cubic-bezier(.4,0,.2,1)
@keyframes nome { from {} to {} }
animation: nome dur timing delay iter dir fill-mode

@starting-style { ... }            /* estado inicial em entrada */
transition-behavior: allow-discrete /* anima display:none */
animation-timeline: view() | scroll()  /* scroll-driven */
@view-transition { navigation: auto } /* entre rotas */

@media (prefers-reduced-motion) { ... }  /* a11y obrigatório */`}
      />
    </PageContainer>
  );
}
