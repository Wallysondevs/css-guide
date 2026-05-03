import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";

export default function Animations() {
  return (
    <PageContainer
      title="Transições e Animações"
      subtitle="Animação bem feita não é firula — guia o olho, dá feedback de interação e faz o site parecer mais 'caro'. Vamos do hover suave aos spinners e ao novo View Transitions."
      difficulty="iniciante"
      timeToRead="11 min"
    >
      <h2>transition — o jeito mais simples</h2>
      <p>
        Use quando algo MUDA de estado (hover, foco, classe sendo
        adicionada). Você só precisa dizer "anime essa propriedade
        durante X tempo".
      </p>

      <VisualDemo
        title="Botão com hover e active suaves — passe o mouse"
        code={`.btn {
  background: #3b82f6;
  transform: translateY(0);
  transition:
    background 200ms ease,
    transform 150ms ease;
}
.btn:hover  { background: #1d4ed8; transform: translateY(-2px); }
.btn:active { transform: translateY(0); }`}
        preview={
          <button
            style={{
              background: "#3b82f6",
              color: "white",
              padding: "10px 18px",
              border: 0,
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 200ms ease, transform 150ms ease, box-shadow 200ms ease",
              boxShadow: "0 1px 0 rgba(0,0,0,.1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "#1d4ed8";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 16px rgba(59,130,246,.3)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "#3b82f6";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 1px 0 rgba(0,0,0,.1)";
            }}
          >
            Passe o mouse
          </button>
        }
      />

      <h2>Easing (timing function) — a personalidade da animação</h2>
      <CodeBlock
        language="css"
        code={`transition-timing-function: linear;       /* constante, robótico */
transition-timing-function: ease;         /* default, suave */
transition-timing-function: ease-in;      /* devagar no começo */
transition-timing-function: ease-out;     /* devagar no fim */
transition-timing-function: ease-in-out;  /* devagar nas duas pontas */

/* Custom (use cubic-bezier.com pra brincar) */
transition-timing-function: cubic-bezier(.4, 0, .2, 1);    /* "Material" */
transition-timing-function: cubic-bezier(.34, 1.56, .64, 1); /* spring */`}
      />

      <h2>@keyframes — sequências de quadros</h2>
      <p>
        Quando a mudança não é só "A → B" mas tem várias etapas (ou
        precisa rodar em loop), você usa <code>@keyframes</code> e
        aplica com <code>animation</code>.
      </p>

      <VisualDemo
        title="Spinner de carregamento"
        code={`@keyframes spin { to { transform: rotate(360deg); } }

.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin .8s linear infinite;
}`}
        preview={
          <>
            <style>{`@keyframes _csg_spin { to { transform: rotate(360deg); } }`}</style>
            <div
              style={{
                width: 32,
                height: 32,
                border: "3px solid #e5e7eb",
                borderTopColor: "#3b82f6",
                borderRadius: "50%",
                animation: "_csg_spin .8s linear infinite",
              }}
            />
          </>
        }
      />

      <VisualDemo
        title="Pulse — chamando atenção pra um botão"
        code={`@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgb(59 130 246 / .6); }
  50%      { box-shadow: 0 0 0 12px rgb(59 130 246 / 0); }
}

.cta { animation: pulse 1.6s ease-in-out infinite; }`}
        preview={
          <>
            <style>{`@keyframes _csg_pulse {
              0%,100% { box-shadow: 0 0 0 0 rgb(59 130 246 / .6); }
              50% { box-shadow: 0 0 0 14px rgb(59 130 246 / 0); }
            }`}</style>
            <button
              style={{
                background: "#3b82f6",
                color: "white",
                padding: "10px 18px",
                border: 0,
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                animation: "_csg_pulse 1.6s ease-in-out infinite",
              }}
            >
              Comprar agora
            </button>
          </>
        }
      />

      <VisualDemo
        title="Skeleton de carregamento"
        code={`@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%);
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
  border-radius: 4px;
}`}
        preview={
          <>
            <style>{`@keyframes _csg_shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }`}</style>
            <div style={{ display: "grid", gap: 6, width: 240 }}>
              {[60, 100, 80].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: 10,
                    width: `${w}%`,
                    background:
                      "linear-gradient(90deg,#e5e7eb 0%,#f3f4f6 50%,#e5e7eb 100%)",
                    backgroundSize: "200% 100%",
                    animation: "_csg_shimmer 1.6s ease-in-out infinite",
                    borderRadius: 4,
                  }}
                />
              ))}
            </div>
          </>
        }
      />

      <h2>Performance: o que animar</h2>
      <AlertBox type="success" title="Propriedades baratas (GPU)">
        <code>opacity</code> e <code>transform</code> (translate, scale,
        rotate). São processadas pela GPU sem refazer layout — sempre 60fps.
      </AlertBox>

      <AlertBox type="danger" title="Propriedades caras (causam reflow)">
        <code>width</code>, <code>height</code>, <code>top</code>,
        <code> left</code>, <code>margin</code>, <code>padding</code>,
        <code> font-size</code>. Forçam o navegador a recalcular o
        layout inteiro a cada frame. Em listas grandes, viram travamento.
      </AlertBox>

      <CodeBlock
        language="css"
        code={`/* RUIM — anima top (reflow) */
.bad { transition: top 300ms; }
.bad:hover { top: -5px; }

/* BOM — anima transform (só GPU) */
.good { transition: transform 300ms; }
.good:hover { transform: translateY(-5px); }`}
      />

      <h2>Stagger — animar itens em sequência</h2>
      <CodeBlock
        language="css"
        code={`@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.item { animation: fade-in 400ms ease-out backwards; }
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 80ms; }
.item:nth-child(3) { animation-delay: 160ms; }
.item:nth-child(4) { animation-delay: 240ms; }`}
      />

      <h2>Acessibilidade — prefers-reduced-motion</h2>
      <p>
        Algumas pessoas têm enxaqueca, vertigem ou TDAH e configuram o
        sistema pra reduzir movimento. <strong>Você precisa respeitar isso.</strong>
      </p>

      <CodeBlock
        language="css"
        code={`/* Cole isso em TODO projeto que tem animação */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}`}
      />

      <h2>Scroll-driven animations (CSS de 2024+)</h2>
      <CodeBlock
        language="css"
        code={`/* Barra de progresso de leitura no topo da página, sem JS */
@keyframes progress { to { transform: scaleX(1); } }

.read-bar {
  position: fixed;
  top: 0; left: 0;
  height: 4px;
  width: 100%;
  background: var(--brand);
  transform-origin: left;
  transform: scaleX(0);
  animation: progress linear;
  animation-timeline: scroll(root);  /* 'root' = a página inteira */
}

/* Fade-in conforme a seção entra na tela */
.section {
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="transition em display: none não anima">
        Display é "ligado/desligado" — não tem meio termo. Use opacity
        + visibility, ou em 2024+ a propriedade
        <code> transition-behavior: allow-discrete</code>.
      </AlertBox>

      <AlertBox type="warning" title="transition: all engana">
        Anima TUDO que muda — incluindo cor, tamanho, transform —
        causando bugs visuais e perda de performance. Sempre liste as
        propriedades explicitamente.
      </AlertBox>

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`/* Regra de ouro: anime opacity e transform; nada mais. */

transition: prop dur timing delay
ease | ease-in-out | cubic-bezier(.4,0,.2,1)

@keyframes nome { from {} to {} }
animation: nome dur timing delay iter dir fill-mode

@media (prefers-reduced-motion) { ... }   /* OBRIGATÓRIO */

/* Modernos */
animation-timeline: view() | scroll()      /* scroll-driven */
@view-transition { navigation: auto }      /* entre rotas */`}
      />
    </PageContainer>
  );
}
