#!/bin/bash
# KING•VPN Installer - Adaptado para /root/KINGVPN

TOTAL_STEPS=8
CURRENT_STEP=0
INSTALL_DIR="/root/KINGVPN"

show_progress() {
    PERCENT=$((CURRENT_STEP * 100 / TOTAL_STEPS))
    echo "Progreso: [${PERCENT}%] - $1"
}

error_exit() {
    echo -e "\nError: $1"
    exit 1
}

increment_step() {
    CURRENT_STEP=$((CURRENT_STEP + 1))
}

if [ "$EUID" -ne 0 ]; then
    error_exit "EJECUTE COMO ROOT"
else
    clear
    show_progress "Actualizando repositorios..."
    export DEBIAN_FRONTEND=noninteractive
    apt update -y >/dev/null 2>&1 || error_exit "Falla al actualizar repositorios"
    increment_step

    show_progress "Verificando el sistema..."
    if ! command -v lsb_release &> /dev/null; then
        apt install lsb-release -y >/dev/null 2>&1 || error_exit "Falla al instalar lsb-release"
    fi
    increment_step

    OS_NAME=$(lsb_release -is)
    VERSION=$(lsb_release -rs)

    case $OS_NAME in
        Ubuntu)
            case $VERSION in
                20.*|22.*|24.*)
                    show_progress "Sistema Ubuntu soportado"
                    ;;
                *)
                    error_exit "Versión de Ubuntu no soportada"
                    ;;
            esac
            ;;
        Debian)
            case $VERSION in
                11*|12*)
                    show_progress "Sistema Debian soportado"
                    ;;
                *)
                    error_exit "Versión de Debian no soportada"
                    ;;
            esac
            ;;
        *)
            error_exit "Sistema no soportado"
            ;;
    esac
    increment_step

    show_progress "Instalando paquetes necesarios..."
    apt upgrade -y >/dev/null 2>&1 || error_exit "Falla al actualizar el sistema"
    apt install wget git -y >/dev/null 2>&1 || error_exit "Falla al instalar paquetes"
    increment_step

    show_progress "Preparando carpeta de instalación..."
    rm -rf "$INSTALL_DIR"
    mkdir -p "$INSTALL_DIR" || error_exit "Falla al crear directorio"
    increment_step

    show_progress "Instalando Node.js 18..."
    bash <(wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh) >/dev/null 2>&1 || error_exit "Falla al instalar NVM"
    [ -s "/root/.nvm/nvm.sh" ] && \. "/root/.nvm/nvm.sh" || error_exit "Falla al cargar NVM"
    nvm install 18 >/dev/null 2>&1 || error_exit "Falla al instalar Node.js"
    increment_step

    show_progress "Clonando KING•VPN..."
    git clone --branch "main" https://github.com/InterKingxx/Panel.git "$INSTALL_DIR/temp" >/dev/null 2>&1 || error_exit "Falla al clonar el panel"

    # mover archivos correctamente
    mv "$INSTALL_DIR/temp/menu" "$INSTALL_DIR/menu" || error_exit "Falla al mover menu"
    mv "$INSTALL_DIR/temp/KINGVPN/"* "$INSTALL_DIR/" || error_exit "Falla al mover archivos del panel"
    rm -rf "$INSTALL_DIR/temp"

    cd "$INSTALL_DIR" || error_exit "Falla al entrar al directorio KINGVPN"

    npm install -g typescript >/dev/null 2>&1 || error_exit "Falla al instalar TypeScript"
    npm install --force >/dev/null 2>&1 || error_exit "Falla al instalar dependencias"
    increment_step

    show_progress "Configurando permisos..."
    chmod +x "$INSTALL_DIR/menu" || error_exit "Falla al configurar permisos"
    ln -sf "$INSTALL_DIR/menu" /usr/local/bin/kingvpn || error_exit "Falla al crear link simbólico"
    increment_step

    show_progress "Creando servicio systemd..."
    cat >/etc/systemd/system/kingvpn.service <<EOL
[Unit]
Description=KING•VPN
After=network.target

[Service]
Type=simple
ExecStart=$INSTALL_DIR/menu
Restart=always
User=root

[Install]
WantedBy=multi-user.target
EOL

    systemctl daemon-reload
    systemctl enable kingvpn
    systemctl start kingvpn
    increment_step

    show_progress "Instalación completa. Ejecuta 'kingvpn' para abrir el menú."
fi
