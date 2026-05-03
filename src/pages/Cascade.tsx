import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Cascade() {
  return (
    <PageContainer
      title="Cascata, Especificidade e @layer"
      subtitle="Como o navegador escolhe a regra vencedora quando você tem 30 stylesheets, três frameworks e um inline style — o coração do CSS."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Os 4 critérios da cascata (em ordem)</h2>
      <ol>
        <li><strong>Origem & importância</strong> — user agent vs autor vs usuário; <code>!important</code> inverte as camadas.</li>
        <li><strong>Camadas (@layer)</strong> — declarações fora de qualquer layer vencem layers nomeados.</li>
        <li><strong>Especificidade</strong> — quantidade de IDs, classes/atributos/pseudo, tipos.</li>
        <li><strong>Ordem de aparição</strong> — o último vence em caso de empate.</li>
      </ol>

      <AlertBox type="info" title="A herança não está nessa lista">
        Herança (color, font, line-height, etc.) só age se nenhuma
        regra explícita atinge o elemento. Não compete com a cascata
        — atua depois.
      </AlertBox>

      <h2>Especificidade na prática</h2>
      <CodeBlock
        language="css"
        code={`/* Notação (a, b, c) — a=IDs, b=classes/attr/pseudo-classe, c=tipos/pseudo-elem */
*                   /* (0,0,0) */
li                  /* (0,0,1) */
ul li               /* (0,0,2) */
ul ol+li            /* (0,0,3) */
h1 + *[rel=up]      /* (0,1,1) */
ul ol li.red        /* (0,1,3) */
li.red.level        /* (0,2,1) */
#x34y               /* (1,0,0) */
style="color:red"   /* (1,0,0,0) — inline */
!important          /* trump card, derruba tudo do mesmo nível */`}
      />

      <h2>O @layer — a forma moderna de organizar prioridade</h2>
      <CodeBlock
        language="css"
        code={`/* Define a ordem de prioridade em uma linha (do menor → maior) */
@layer reset, base, components, utilities;

@layer reset {
  * { box-sizing: border-box; margin: 0; }
}

@layer base {
  body { font-family: system-ui; line-height: 1.5; }
}

@layer components {
  .btn { padding: .5rem 1rem; border-radius: .5rem; }
}

@layer utilities {
  .text-center { text-align: center; }
}

/* Regras sem @layer SEMPRE vencem layers nomeados */
.btn { background: hotpink; }   /* vence o do components */`}
      />

      <h2>Importando libs em layers</h2>
      <CodeBlock
        language="css"
        code={`/* Coloca um framework inteiro num layer de baixa prioridade */
@import url("normalize.css") layer(reset);
@import url("bootstrap.css") layer(framework);

@layer reset, framework, app;

@layer app {
  .btn { background: var(--brand); }
  /* Bate Bootstrap sem !important e sem aumentar especificidade */
}`}
      />

      <h2>!important: quando usar</h2>
      <p>
        Em código de aplicação, raramente. Casos legítimos:
      </p>
      <ul>
        <li>Utility class final (<code>.hidden &#123; display: none !important; &#125;</code>) — promessa de sempre esconder.</li>
        <li>Sobrescrever inline style vindo de bibliotecas externas (chat widgets, etc).</li>
        <li>Print stylesheets que precisam vencer telas.</li>
      </ul>

      <AlertBox type="warning" title="Guerra de !important">
        Quando dois <code>!important</code> colidem, a especificidade
        decide novamente entre eles. Por isso "subir o !important"
        nunca termina — a única saída saudável é
        refatorar para usar <code>@layer</code>.
      </AlertBox>

      <h2>Casos práticos</h2>
      <CodeBlock
        language="css"
        code={`/* Padrão para design system bem organizado */
@layer reset, tokens, base, components, layout, utilities, overrides;

@layer tokens   { :root { --space-3: 1rem; } }
@layer base     { body { font: 16px/1.5 system-ui; } }
@layer components {
  .card { padding: var(--space-3); border: 1px solid #eee; }
}
@layer utilities { .mt-3 { margin-top: var(--space-3); } }

/* Um override pontual entra no layer overrides */
@layer overrides { .promo .card { border-color: gold; } }`}
      />

      <h2>Debug</h2>
      <CodeBlock
        language="js"
        code={`// DevTools mostra TODA a cascata aplicada num elemento.
// Chrome/Firefox/Safari: clique-direito → Inspect → aba "Styles"
//   - Riscado = sobrescrito
//   - Hover na regra = mostra arquivo + linha
//   - Aba "Computed" = valor final aplicado
//   - "Inherited from <parent>" = veio por herança

// Atalho útil: pesquisar por declaração
//   Ctrl+F dentro do painel Styles`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Especificidade não soma colunas">
        <code>(0, 1, 11)</code> NÃO é maior que <code>(0, 2, 0)</code>.
        Compara coluna por coluna da esquerda. 100 classes ainda
        perdem para 1 ID.
      </AlertBox>

      <AlertBox type="danger" title="Especificidade infla com aninhamento">
        Pré-processadores (Sass) facilitam aninhar 5 níveis profundo,
        gerando seletores como <code>.app .sidebar .menu .item .link</code>
        — especificidade <code>(0,5,0)</code>. Manutenção vira pesadelo.
        Mantenha aninhamento ≤ 2 níveis.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="css"
        code={`/* Ordem de vitória */
1. !important do usuário (acessibilidade)
2. !important do autor
3. !important do user agent
4. Author normal — fora de @layer
5. Author normal — em @layer (último layer ganha)
6. User normal
7. User agent normal

/* Especificidade */
inline > IDs > classes/attr/pseudo > tipos > universal`}
      />
    </PageContainer>
  );
}
