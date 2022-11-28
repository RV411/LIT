import { LitElement, html, css } from 'lit';
import {GonTextbox} from './gon-textbox.js';
import { GonCard } from "./gon-card";

export class GonResultboard extends LitElement {
    static get properties() {
        return {
          lista: {type: Array},
        };
      }
    
      static get styles() {
        return css`   
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

          .completed {
            text-decoration-line: line-through;
            color: #777;
            cursor:pointer;
          }
    
          .todo{
            cursor:pointer;
          }
              
        `;
      }
    
      constructor() {
        super();
        this.lista=[
          {task:'Lomitos',completed:false},
          {task:'Guacamayas',completed:true},
        ];
      }

      toggleCompleted(item) {
        item.completed = !item.completed;
        this.requestUpdate();
      }
      
      render() {
        // const falta= this.lista.filter((item) => !item.completed);
        // const hecho= this.lista.filter((item) => item.completed);
        // const listaf=html`
        //   ${falta.map(
        //       (tarea) => html`
        //           <p class=${tarea.completed ? 'completed' : 'todo'}
        //               @click=${() => this.toggleCompleted(tarea)}>
        //             ${tarea.task}
        //           </p>
        //       `)}
        // `;

        // const listah=html`
        // ${hecho.map(
        //     (tarea) => html`
        //         <p class=${tarea.completed ? 'completed' : 'todo'}
        //             @click=${() => this.toggleCompleted(tarea)}>
        //           ${tarea.task}
        //         </p>
        //     `)}
        // `;

      //   <!-- <sl-card class="card-overview">
      //   <div slot="header">
      //     Tareas Faltantes
      //   </div>
      //   ${listaf}
      // </sl-card>                  

      // <sl-card class="card-overview">
      //   <div slot="header">
      //     Tareas Realizadas
      //   </div>
      //   ${listah}
      // </sl-card>               -->
        return html`
              <gon-textbox @addTask=${this.addTask}></gon-textbox>
              <br>
              <div class="cards">
                  <gon-card texto="Tareas Faltantes" .lista="${this.lista.filter((item) => !item.completed)}" ></gon-card>
                  <gon-card texto="Tareas Realizadas" .lista="${this.lista.filter((item) => item.completed)}" ></gon-card> 
              </div>                          
        `;
      }
    
      addTask(e) {
        this.lista.push(e.detail);
        this.requestUpdate();
      }
}
customElements.define('gon-resultboard', GonResultboard);
