import { LitElement, html, css } from 'lit';
import {GonInput} from './gon-input.js';

export class GonTextbox extends LitElement {
    static get properties() {
        return {
          taskToDo:{
            type:String
          },
        };
      }
  
      static get styles() {
          return css`
      
            button{
              width:60%;
              height:40px;
              color:#414141;
              border-color:#0000003d;
              margin-top:2vh;
            }
  
            button :hover{
              color:#fff;
              background:#0000003d;
              cursor:pointer;
            }
          `;
      }
  
      constructor() {
        super();
        this.taskToDo='';
      }
      
  
      render() {
          return html`
            <gon-input .Value="${this.taskToDo}" @input=${(e) => {
            this.taskToDo = e.target.Value;}} placeholder="Escribe ...">
            </gon-input>
            <button @click=${this.addTask}>Aceptar</button>
          `;
      }
  
      addTask() {
        console.log(this.taskToDo)
        this.dispatchEvent(new CustomEvent('addTask', {
          bubbles: true,
          composed: true,
          detail: {
            task: this.taskToDo,          
            completed: false,
          }
        }));
        this.taskToDo='';
      }
}
customElements.define('gon-textbox', GonTextbox);
