import { LitElement, html, css } from 'lit';

export class GonInput extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
            }

            input {
            width: 90%;
            height:30px;
            margin-top:8vh;
            border: solid 1px #414141;
            
          }
        `;
    }

    static get properties() {
        return {
          Value: { type: String },
        };
    }

    constructor() {
        super();
        this.Value = '';
    }

    render() {
        return html`
            <input type="text" value="${this.Value}" @input=${this.updateTask}>
        `;
    }

    updateTask(e) {
        this.Value = e.target.value;
        this.requestUpdate();

    }
}
customElements.define('gon-input', GonInput);
