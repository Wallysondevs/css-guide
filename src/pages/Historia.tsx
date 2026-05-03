import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Historia() {
  return (
    <PageContainer
      title="História do CSS"
      subtitle="De um e-mail em 1994 ao stack mais poderoso de design declarativo da web — três décadas que mudaram tudo. Vale conhecer pra entender por que algumas coisas são do jeito que são."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <h2>A web sem CSS (era horrível)</h2>
      <p>
        Em 1991, páginas eram só HTML. Sem cores, sem fontes, sem
        layout. Cada navegador renderizava do jeito que queria. Pra
        "estilizar", a galera usava tags como <code>&lt;font&gt;</code>,
        <code> &lt;center&gt;</code> e <strong>tabelas usadas como
        grid</strong> — misturando conteúdo e apresentação no mesmo
        arquivo. Manter isso era um pesadelo.
      </p>

      <h2>1994 — a ideia que mudou tudo</h2>
      <p>
        <strong>Håkon Wium Lie</strong> propôs o CSS num e-mail à lista
        www-talk em outubro de 1994. A ideia central: separar
        <strong> conteúdo </strong> (HTML) de <strong>apresentação</strong>
        (CSS) e permitir que o estilo "cascateie" do navegador →
        usuário → autor.
      </p>

      <AlertBox type="info" title="Linha do tempo das specs">
        <ul>
          <li><strong>1996</strong> — CSS 1 (cores, fontes, margens)</li>
          <li><strong>1998</strong> — CSS 2 (positioning, media types)</li>
          <li><strong>2011+</strong> — CSS 3 dividido em módulos independentes</li>
          <li><strong>2017</strong> — Grid Layout chega aos navegadores</li>
          <li><strong>2023</strong> — <code>:has()</code> em todos os browsers</li>
          <li><strong>2024</strong> — Nesting nativo, <code>@scope</code>, container queries em massa</li>
          <li><strong>2025</strong> — View Transitions, Anchor Positioning ficam estáveis</li>
        </ul>
      </AlertBox>

      <h2>Por que CSS3 não tem versão única?</h2>
      <p>
        Do CSS3 em diante, o W3C parou de versionar tudo junto e
        passou a dividir em <strong>módulos</strong> versionados
        separadamente: Selectors Level 4, Color Level 5, Grid Layout
        Level 2, etc. Isso permitiu evoluir cada área no seu ritmo.
        Por isso "CSS4" não existe oficialmente.
      </p>

      <h2>Os marcos modernos</h2>
      <CodeBlock
        language="css"
        code={`/* Flexbox (2012, mainstream em 2015) */
.menu { display: flex; gap: 1rem; }

/* Grid (2017) — primeiro sistema 2D real */
.layout { display: grid; grid-template-columns: 200px 1fr; }

/* Custom Properties (2016) */
:root { --brand: #ff6b00; }
.btn { background: var(--brand); }

/* :has() (2023) — finalmente "parent selector" */
article:has(img) { padding: 1rem; }

/* Container queries (2023) */
@container (min-width: 600px) {
  .card { display: grid; grid-template-columns: auto 1fr; }
}

/* Nesting nativo (2023+) */
.card {
  padding: 1rem;
  & h2 { margin-top: 0; }
  &:hover { background: #f3f3f3; }
}`}
      />

      <h2>O ecossistema ao redor</h2>
      <ul>
        <li><strong>Pré-processadores</strong> (Sass, Less) — adicionavam nesting, variáveis e mixins. Hoje, com nesting + custom properties + @layer, perderam parte do propósito.</li>
        <li><strong>PostCSS</strong> — pipeline de transformação (autoprefixer ainda é universal).</li>
        <li><strong>Tailwind, UnoCSS</strong> — geram classes utilitárias.</li>
        <li><strong>CSS-in-JS</strong> (styled-components, Emotion) — perdeu força com Server Components e CSS Modules nativos.</li>
      </ul>

      <h2>Pra onde o CSS vai?</h2>
      <ul>
        <li><strong>View Transitions</strong> — animações entre páginas/estados sem JS.</li>
        <li><strong>Anchor Positioning</strong> — tooltips/popovers ancorados sem JS.</li>
        <li><strong>Style Queries</strong> — query não só por tamanho, mas por valor de variável.</li>
        <li><strong>Houdini</strong> — APIs JS de baixo nível pro pipeline de render.</li>
      </ul>

      <AlertBox type="success" title="Por que estudar CSS hoje vale a pena">
        Cada vez mais coisas que exigiam JavaScript (modais, tooltips,
        scroll-driven animations, transições de rota) podem ser feitas
        SÓ com CSS — mais rápido, mais acessível e sem dependência de
        framework.
      </AlertBox>
    </PageContainer>
  );
}
