import { LitElement, html, css } from 'lit';
import {GonTextbox} from './gon-textbox.js';

export class GonParty extends LitElement {
    static styles = [
        css`
            .cards{
            width:100%;
            max-width:1200px;
            height:430px;
            display:flex;
            flex-wrap:wrap;
            justify-content:center;
            margin:auto;
          }       

          .card-overview{
            width:400px;
            height: 430px;
            margin:20px;
            text-align:center;
          }

          button{
              width:60%;
              height:40px;
              color:#414141;
              border-color:#0000003d;
              margin-top:2vh;
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
          listaCouple: {type: Array},
        };
      }
    
    constructor() {
        super();
        this.lista=[
            {task:'Juan',completed:false},
            {task:'Aaron',completed:false},
        ];
        this.listaFilter=[]
        this.listaCouple=[]
    }

    toggleCompleted(item) {
        item.completed = !item.completed;
        this.requestUpdate();
    }

    render() {
        this.listaFilter= this.lista.filter((item) => !item.completed);
        const listaf=html`
          ${this.listaFilter.map(
              (tarea) => html`
                  <li class=${tarea.completed ? 'completed' : 'todo'}
                      @click=${() => this.toggleCompleted(tarea)}>
                    ${tarea.task}
                  </li>
              `)}
        `;

        return html`
        <gon-textbox @addTask=${this.addTask}></gon-textbox>
        <button @click=${this.doCouples}>Realizar parejas</button>

              <br>
              <div class="cards">
                  <sl-card class="card-overview">
                    <div slot="header">
                      Integrantes
                    </div>
                    <ol>
                        ${listaf}
                        </ol>
                  </sl-card>

                  <sl-card class="card-overview">
                    <div slot="header">
                      Parejas
                    </div>
                    <ol>                
                        ${this.listaCouple.map(
                            (tarea) => html`
                            <li >
                                ${tarea}
                            </li>
                        `)}
                    </ol>
                </sl-card>              
              </div>
              
        `;
    }

    addTask(e) {
        this.lista.push(e.detail);
        this.requestUpdate();
    }

    doCouples(){
        const size= this.listaFilter.length
        this.listaCouple=new Array(size);
        if (size%2==0) {
            let temp=[...this.listaFilter]
            temp=[...temp.sort((a,b)=>Math.random()-0.5)]
            for (let i = 0; i < size/2; i++) {
                this.listaCouple[i] =temp[i].task+" y "+temp[size-(i+1)].task;
            }
        } else {
            alert("La lista debe ser par, elimine o agrege a una persona");
        }
    }
}
customElements.define('gon-party', GonParty);
