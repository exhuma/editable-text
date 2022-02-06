import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('editable-text')
class EditableText extends LitElement {
    override render() {
        return "Hello World!";
    }
}
