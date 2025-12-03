import AbsDialog from "./dialog.js";

export default class DialogConfig extends AbsDialog {
    render() {
        this.dialogHeader.setTitle('DIALOG DE configuración');
        this.dialogHeader.setCloseButton(e => {
            e.stopPropagation();
            this.close();
        });
        this.dialogContent.element.innerText = 'DATOS DE CONFIGURACIÓN';
        this.dialog.setStyle({ width: '350px'});
        super.render();
    }
}
