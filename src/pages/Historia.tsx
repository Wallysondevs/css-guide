import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Historia() {
  return (
    <PageContainer
      title="História do CSS"
      subtitle="De um e-mail em 1994 ao stack mais poderoso de design declarativo da web — três décadas de evolução."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <h2>Antes do CSS: a web sem estilo</h2>
      <p>
        Em 1991, a web tinha apenas HTML — sem cores, sem fontes,
        sem layout. Cada navegador renderizava do jeito que queria.
        A solução comum eram tags como <code>&lt;font&gt;</code>,
        <code> &lt;center&gt;</code> e tabelas usadas como grid:
        misturava conteúdo e apresentação no mesmo arquivo.
      </p>

      <h2>1994 — a proposta original</h2>
      <p>
        <strong>Håkon Wium Lie</strong> propõe o CSS num e-mail à
        lista www-talk em outubro de 1994. A ideia central: separar
        <strong> conteúdo </strong> (HTML) de <strong>apresentação</strong>
        (CSS) e permitir que o estilo "cascateie" do navegador →
        usuário → autor.
      </p>

      <AlertBox type="info" title="Linha do tempo das specs">
        <ul>
          <li><strong>1996</strong> — CSS 1 (cores, fontes, margens).</li>
          <li><strong>1998</strong> — CSS 2 (positioning, media types).</li>
          <li><strong>2011+</strong> — CSS 3 dividido em módulos independentes.</li>
          <li><strong>2017</strong> — Grid Layout chega aos navegadores.</li>
          <li><strong>2023</strong> — <code>:has()</code> em todos os browsers.</li>
          <li><strong>2024</strong> — Nesting nativo, <code>@scope</code>, container queries em massa.</li>
        </ul>
      </AlertBox>

      <h2>Por que CSS3 não tem versão única?</h2>
      <p>
        A partir do CSS3 o W3C decidiu fragmentar a especificação
        em <strong>módulos</strong> versionados independentemente:
        Selectors Level 4, Color Level 5, Grid Layout Level 2, etc.
        Isso permitiu evoluir áreas em paralelo. "CSS4" não existe
        oficialmente — cada módulo segue seu Level próprio.
      </p>

      <h2>Os marcos modernos</h2>
      <CodeBlock
        language="css"
        code={`/* Flexbox (2012, mainstream em 2015) */
.menu { display: flex; gap: 1rem; }

/* Grid (2017) — primeiro sistema 2D real */
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
}

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
        <li><strong>Pré-processadores</strong> (Sass, Less, Stylus) — adicionaram nesting, variáveis e mixins quando o CSS nativo não tinha. Hoje, com <code>@layer</code>, custom properties e nesting, parte do propósito desapareceu.</li>
        <li><strong>PostCSS</strong> — pipeline de transformação (autoprefixer ainda é universal).</li>
        <li><strong>Tailwind, UnoCSS</strong> — CSS atomic generation.</li>
        <li><strong>CSS-in-JS</strong> (styled-components, Emotion) — perdeu força com Server Components e CSS Modules nativos.</li>
      </ul>

      <h2>Para onde o CSS está indo?</h2>
      <ul>
        <li><strong>Houdini</strong> — APIs JavaScript de baixo nível para o pipeline de render do CSS.</li>
        <li><strong>View Transitions</strong> — animações entre páginas/estados sem JS.</li>
        <li><strong>Anchor Positioning</strong> — tooltips/popovers ancorados sem JS.</li>
        <li><strong>Style Queries</strong> — querying não só por tamanho mas por valor de variável.</li>
      </ul>

      <AlertBox type="success" title="Por que estudar CSS hoje">
        Cada vez mais coisas que exigiam JavaScript (modais, tooltips,
        scroll-driven animations, transições entre rotas) podem ser
        feitas só com CSS — mais rápido, mais acessível e sem
        dependência de framework.
      </AlertBox>
    </PageContainer>
  );
}
