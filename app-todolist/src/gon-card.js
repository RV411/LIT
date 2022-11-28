import { LitElement, html, css } from 'lit';

export class GonCard extends LitElement {
    static styles = [
        css`
            .card-overview{
            width:400px;
            height: 430px;
            margin:20px;
            text-align:center;
          }
          .completed {
            text-decoration-line: line-through;
            color: #777;
            cursor:pointer;
          }
    
          .todo{
            cursor:pointer;
          }
        `
    ];

    static get properties() {
        return {
          lista: {type: Array},
          texto:{type:String},
        };
    }

    constructor() {
        super();
        this.lista=[];
        this.texto='';
    }

    toggleCompleted(item) {
        item.completed = !item.completed;
        this.requestUpdate();
      }

    render() {
        const listaf=html`
          ${this.lista.map(
              (tarea) => html`
                  <p class=${tarea.completed ? 'completed' : 'todo'}
                      @click=${() => this.toggleCompleted(tarea)}>
                    ${tarea.task}
                  </p>
              `)}
        `;

        return html`
            <sl-card class="card-overview" .lista="${this.lista}">
                <div slot="header">
                    ${this.texto}
                </div>
                ${listaf}
            </sl-card>
        `;
    }
}
customElements.define('gon-card', GonCard);
