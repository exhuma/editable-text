import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef, Ref } from 'lit/directives/ref.js';

@customElement('editable-text')
class EditableText extends LitElement {
    @property()
    value: string = ""

    @state()
    _editing = false;

    inputRef: Ref<HTMLInputElement> = createRef()

    _startEditing() {
        this._editing = true;
    }

    _cancelEdit() {
        this._editing = false;
    }

    _commitEdit() {
        if (!this.inputRef.value) {
            throw new Error("Unable to find a reference to the text-field");
        }
        this.value = this.inputRef.value.value;
        this._editing = false;
        this.dispatchEvent(new CustomEvent("change", { detail: { newValue: this.value } }));
    }

    override render() {
        if (this._editing) {
            return html`
            <input ${ref(this.inputRef)} type="text" value="${this.value}" />
            <a @click="${this._commitEdit}">commit</a>
            <a @click="${this._cancelEdit}">cancel</a>
            `
        }
        return html`
        <span>${this.value}</span>
        <a @click="${this._startEditing}">edit</a>
        `
    }
}
