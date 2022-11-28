import { LitElement, html, css } from 'lit';
import {GonResultboard} from './gon-resultboard.js';
import {GonTextbox} from './gon-textbox.js';
import { GonParty } from "./gon-party";

export class AppTodolist extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      titleBoolean:{type:Boolean},
      lista: {type: Array},
    };
  }

  static get styles() {
    return css`
      .container {
            font-size: calc(12px + 0.5vmin);
            text-align: center;
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
    this.title = 'TODO-LIST';
    this.titleBoolean=false;
    this.lista=[
      {task:'Lomitos',completed:false},
    ];
  }

  toggleCompleted(item) {
    item.completed = !item.completed;
    this.requestUpdate();
  }
  
  render() {
    return html`
        <div class="container">
          <h2>${this.title}</h2>
          <br>
            <gon-resultboard></gon-resultboard>                     
        </div> 
        <div class="container">
          <h2>GIFTS</h2>
          <gon-party></gon-party>
        </div>
        
    `;
  }

  addTask(e) {
    this.lista.push(e.detail);
    this.requestUpdate();
  }
}
