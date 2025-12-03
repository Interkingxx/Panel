import AbsDialog from "./dialog.js";

export default class DialogDefault extends AbsDialog {
    render() {
        this.dialogHeader.setTitle('DIALOGO PADRON');
        this.dialogHeader.setCloseButton(e => {
            e.stopPropagation();
            this.close();
        });
        this.dialogContent.element.innerText = 'ESTE ES UN DIALOGO PADRON (CHECKUSER, MENSAJES ETC...)'
        this.setStyle({ 'text-align': 'center' });
        super.render();
    }
}
