import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef, Ref } from 'lit/directives/ref.js';

@customElement('editable-text')
class EditableText extends LitElement {

    static styles = css`
    A {
        text-decoration: underline;
        color: #00f;
    }
    .clickable {
        cursor: pointer;
    }
    `;


    @property()
    value = ""

    @state()
    _editing = false;

    _oldValue = ""

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
        this.dispatchEvent(new CustomEvent("change", { detail: { newValue: this.value, oldValue: this._oldValue } }));
        this._oldValue = this.inputRef.value.value;
    }

    protected override firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
        this._oldValue = this.value;
    }

    override render() {
        if (this._editing) {
            return html`
            <input ${ref(this.inputRef)} type="text" value="${this.value}" />
            <slot class="clickable" name="commitButton" @click="${this._commitEdit}"><a>commit</a></slot>
            <slot class="clickable" name="cancelButton" @click="${this._cancelEdit}"><a>cancel</a></slot>
            `
        }
        return html`
        <span>${this.value}</span>
        <slot class="clickable" name="editButton" @click="${this._startEditing}"><a>edit</a></slot>
        `
    }
}
