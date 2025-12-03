class ApkDownloadModal {
    __html = `
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalToggleLabel">DESCARGAR APK</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-2">
                <div class="d-flex flex-column gap-2 justify-content-center">
                    <div class="card">
                        <div class="card-body p-2">
                            <h5 class="card-title d-flex justify-content-center">TUTORIALES</h5>
                            <p class="card-text">Siguenos en el grupo de telegram ahi podras tener ayuda de los participantes y creador, aprenderas vincular tu credencial al apk.</p>
                            <a href="https://www.youtube.com/watch?v=hz2zCdgvRzA&t=2s&ab_channel=DTunnel" class="btn btn-dark w-100 mt-2">VINCULAR PANEL AL APK</a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body p-2">
                            <h5 class="card-title d-flex justify-content-center">PANEL•KING</h5>
                            <p class="card-text">Esta version por el momentos solo tiene metodo de conexion   SSH, a medida que cresca se le iran agregando mas metodos</p>
                            <a href="https://raw.githubusercontent.com/DTunnelMod/base/main/painel/4.2.5/DTunnelMod%20SSH.apk" class="btn btn-dark w-100 mt-2">DESCARGAR</a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body p-2">
                            <h5 class="card-title d-flex justify-content-center">PANEL•KING PRO</h5>
                            <p class="card-text">Esta version contiene el metodo de  conexiones SSH y OpenVPN</p>
                            <a href="https://raw.githubusercontent.com/DTunnelMod/base/main/painel/4.2.5/DTunnelMod%20Pro.apk" class="btn btn-dark w-100 mt-2">DESCARGAR</a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body p-2">
                            <h5 class="card-title d-flex justify-content-center">PANEL•KING V2RAY</h5>
                            <p class="card-text">Esta version contiene los metodos de conexiones de SSH, OpenVPN y V2RAY</p>
                            <a href="https://raw.githubusercontent.com/DTunnelMod/base/main/painel/4.2.5/DTunnelMod%20V2Ray.apk" class="btn btn-dark w-100 mt-2">DESCARGAR</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    constructor() {
        this._element = document.createElement('div');
        this._element.classList.add('modal', 'fade');
        this._element.setAttribute('tabindex', '-1');
        this._element.innerHTML = this.__html;

        this._root = this._element.querySelector('.modal-body');
        this.modal = new bootstrap.Modal(this._element);
    }

    setApp(app) {
        this._root.innerHTML = '';
        this._root.append(app.element);
    }

    setFooter(footer) {
        this._root.append(footer.element);
    }

    show() {
        this.modal.show();
    }

    hide() {
        this.modal.hide();
    }
}

export default ApkDownloadModal;