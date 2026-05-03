import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { VisualDemo } from "@/components/ui/VisualDemo";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { SpecificityBadge } from "@/components/ui/Diagrams";

export default function Cascade() {
  return (
    <PageContainer
      title="Cascata e Especificidade"
      subtitle="Você escreveu CSS, recarregou e… nada mudou. Por quê? Porque outra regra está vencendo. Vamos entender as 4 perguntas que o navegador faz pra escolher o vencedor."
      difficulty="intermediario"
      timeToRead="11 min"
    >
      <h2>A analogia: um juiz decidindo entre regras</h2>
      <p>
        Quando duas (ou cinco) regras se aplicam ao mesmo elemento, o
        navegador é o juiz. Ele faz, NESTA ORDEM:
      </p>
      <ol>
        <li><strong>De onde veio?</strong> CSS do navegador, do site ou do usuário?</li>
        <li><strong>Está em algum @layer?</strong> Camadas têm prioridade.</li>
        <li><strong>Especificidade.</strong> Quem tem o seletor mais "específico" ganha.</li>
        <li><strong>Empate?</strong> Quem foi escrito por último vence.</li>
      </ol>

      <h2>Especificidade na prática</h2>
      <p>
        Pense nela como uma <strong>placa de pontuação</strong> dividida em
        três caixinhas: <SpecificityBadge a={0} b={0} c={0} /> — IDs |
        Classes/atributos/pseudo | Tags/pseudo-elementos.
      </p>

      <div className="not-prose my-6 grid sm:grid-cols-2 gap-3">
        {[
          { sel: "*", a: 0, b: 0, c: 0 },
          { sel: "p", a: 0, b: 0, c: 1 },
          { sel: ".btn", a: 0, b: 1, c: 0 },
          { sel: "a:hover", a: 0, b: 1, c: 1 },
          { sel: "ul li.ativo", a: 0, b: 1, c: 2 },
          { sel: "#topo", a: 1, b: 0, c: 0 },
          { sel: 'style="..."', a: 1, b: 0, c: 0, inline: true },
          { sel: "!important", a: -1, b: -1, c: -1, sup: true },
        ].map((s) => (
          <div
            key={s.sel}
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-card text-sm"
          >
            <code className="font-mono text-primary">{s.sel}</code>
            {s.sup ? (
              <span className="text-xs text-yellow-400 font-bold">vence tudo</span>
            ) : s.inline ? (
              <span className="text-xs text-orange-400 font-bold">
                inline → 1,0,0,0
              </span>
            ) : (
              <SpecificityBadge a={s.a} b={s.b} c={s.c} />
            )}
          </div>
        ))}
      </div>

      <h2>O cenário clássico: "minha cor não muda"</h2>
      <BeforeAfter
        beforeLabel="❌ A regra perde — id é mais forte"
        afterLabel="✅ Aumentar especificidade ou usar @layer"
        before={
          <pre className="text-xs text-slate-700 leading-relaxed">
            {`<button id="btn" class="azul">Clique</button>

#btn   { color: red;  }   /* (1,0,0) */
.azul  { color: blue; }   /* (0,1,0) */

/* resultado: vermelho 😟 */`}
          </pre>
        }
        after={
          <pre className="text-xs text-slate-700 leading-relaxed">
            {`button.azul {
  color: blue;
}
/* (0,1,1) ainda perde do id (1,0,0) */

/* Solução de verdade:
   parar de usar #id pra estilo */`}
          </pre>
        }
      />

      <h2>Como a regra ganha em caso de empate</h2>
      <VisualDemo
        title="Mesma especificidade — vence quem foi escrito DEPOIS"
        code={`/* style.css */
.btn { background: blue; }
.btn { background: red; }   /* ESTA vence — vem por último */`}
        preview={
          <button
            style={{
              background: "red",
              color: "white",
              border: 0,
              padding: "10px 16px",
              borderRadius: 6,
              fontWeight: 600,
            }}
          >
            ficou vermelho
          </button>
        }
      />

      <h2>O @layer — a forma moderna de organizar prioridade</h2>
      <p>
        Em vez de competir com especificidade, você organiza o CSS em
        <strong> camadas</strong>. A ordem que você declara as camadas
        decide quem vence — independente do seletor.
      </p>

      <CodeBlock
        language="css"
        code={`/* Defina a ordem (do menos importante ao mais) */
@layer reset, base, components, utilities;

@layer reset {
  * { box-sizing: border-box; margin: 0; }
}

@layer base {
  body { font-family: system-ui; line-height: 1.5; }
}

@layer components {
  .btn { padding: .5rem 1rem; background: blue; }
}

@layer utilities {
  .text-center { text-align: center; }
}

/* Regras FORA de qualquer @layer SEMPRE ganham das que estão dentro */
.btn { background: hotpink; }   /* vence a do @layer components */`}
      />

      <h2>Exemplo do mundo real: integrar Bootstrap sem brigar com ele</h2>
      <VisualDemo
        title="Coloca o framework numa camada baixa, e seu app numa alta"
        code={`@import url("bootstrap.css") layer(framework);
@layer framework, app;

@layer app {
  .btn { background: var(--brand); }
  /* vence Bootstrap SEM precisar de !important
     SEM precisar aumentar especificidade */
}`}
        preview={
          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={{
                background: "#6c757d",
                color: "white",
                padding: "6px 12px",
                border: 0,
                borderRadius: 4,
                fontSize: 13,
              }}
            >
              .btn (bootstrap)
            </button>
            <button
              style={{
                background: "#ea580c",
                color: "white",
                padding: "6px 12px",
                border: 0,
                borderRadius: 4,
                fontSize: 13,
              }}
            >
              .btn (seu @layer app)
            </button>
          </div>
        }
      />

      <h2>!important — quando faz sentido (e quase nunca)</h2>
      <ul>
        <li>✅ Utilities finais: <code>.hidden &#123; display:none !important &#125;</code> — promessa de "sempre esconder".</li>
        <li>✅ Sobrescrever inline-style vindo de bibliotecas externas (chat widgets).</li>
        <li>❌ Em código de componente — quase sempre indica falta de @layer.</li>
      </ul>

      <AlertBox type="warning" title="Guerra de !important nunca termina">
        Se dois <code>!important</code> colidem, a especificidade decide
        novamente. "Subir o !important" vira ladeira sem fim. A saída
        é refatorar pra usar <code>@layer</code>.
      </AlertBox>

      <h2>Como a herança entra (ou não) na equação</h2>
      <p>
        Algumas propriedades como <code>color</code>,
        <code> font-family</code>, <code>line-height</code> são
        <strong> herdadas</strong>: se nada foi dito explicitamente, o
        elemento usa o valor do pai. Outras como
        <code> border</code>, <code>padding</code>,
        <code> background</code> NÃO herdam — começam do zero.
      </p>

      <CodeBlock
        language="css"
        code={`/* Forçar herança quando precisa */
.box {
  border-color: inherit;     /* pega do pai */
  background: inherit;
}

/* Voltar pro padrão do navegador */
button {
  all: unset;          /* zera tudo */
  all: revert;         /* volta ao default */
}`}
      />

      <h2>Como debugar no DevTools</h2>
      <CodeBlock
        language="text"
        code={`Chrome / Firefox / Safari → clique-direito no elemento → Inspect

Aba "Styles":
  • Cada regra mostra ARQUIVO + LINHA
  • Riscado = sobrescrito por outra regra
  • Hover na regra mostra qual venceu

Aba "Computed":
  • Valor FINAL aplicado
  • Expanda → veja a cadeia de cascata completa

Aba "Layout / Box Model":
  • Visualização das 4 camadas

Atalho útil: digite na caixa de busca dentro de "Styles"
para encontrar uma propriedade rapidamente.`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Especificidade NÃO soma colunas">
        <SpecificityBadge a={0} b={1} c={11} /> NÃO é maior que{" "}
        <SpecificityBadge a={0} b={2} c={0} />. Compara coluna por
        coluna da esquerda. 100 classes ainda perdem para 1 ID.
      </AlertBox>

      <AlertBox type="danger" title="Aninhar fundo demais infla a especificidade">
        Sass facilita escrever <code>.app .menu .item .link</code>{" "}
        — <SpecificityBadge a={0} b={4} c={0} />. Manutenção vira
        pesadelo. Mantenha aninhamento até 2 níveis.
      </AlertBox>

      <h2>Resumão</h2>
      <CodeBlock
        language="css"
        code={`/* Ordem de vitória (do mais forte ao mais fraco) */
1. !important do usuário (acessibilidade)
2. !important do site
3. inline style (style="...")
4. ID                    (1,0,0)
5. Classe / atributo / :hover  (0,1,0)
6. Tag / ::pseudo-element     (0,0,1)
7. Universal *

/* Em caso de empate: vence quem vem POR ÚLTIMO no arquivo */

/* @layer ordena tudo isso de forma explícita */
@layer reset, base, components, utilities;

/* Regras sem @layer sempre ganham das que estão dentro */`}
      />
    </PageContainer>
  );
}
