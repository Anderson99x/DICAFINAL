document.addEventListener("DOMContentLoaded", () => {
    const areaCronometro = document.getElementById("area-cronometro");
    const temporizadorElement = document.getElementById("temporizador");
    const tituloCronometro = document.getElementById("titulo-cronometro");
    const statusText = document.getElementById("status-text");

    const fase1 = document.getElementById("fase1");
    const fase2 = document.getElementById("fase2");
    const fase3 = document.getElementById("fase3");

    const btnLiberarVideo = document.getElementById("btn-liberar-video");
    const inputSenhaVideo = document.getElementById("senha-video");
    const videoBloqueado = document.getElementById("video-bloqueado");
    const videoLiberado = document.getElementById("video-liberado");
    const erroVideo = document.getElementById("erro-video");


    const SENHA_VIDEO_CORRETA = "22/01/2024"; 


    const alvo1 = new Date(); alvo1.setHours(16, 30, 0, 0); // 13:30 - Trampolim
    const alvo2 = new Date(); alvo2.setHours(21, 0, 0, 0);  // 21:00 - Jantar
    const alvo3 = new Date(); alvo3.setHours(23, 0, 0, 0);  // 23:00 - Carta Final

    function atualizarSistema() {
        const agora = new Date().getTime();

        if (agora >= alvo3.getTime()) {
            fase1.classList.remove("oculto");
            fase2.classList.remove("oculto");
            fase3.classList.remove("oculto");
            areaCronometro.style.display = "none";
            statusText.innerText = "> TODAS AS FASES CONCLUÍDAS. MISSÃO CUMPRIDA.";
            statusText.style.color = "#55ff55";
        } 
        else if (agora >= alvo2.getTime()) {
            fase1.classList.remove("oculto");
            fase2.classList.remove("oculto");
            statusText.innerText = "> FASE 02 ATIVA. AGUARDANDO DESCRIPTOGRAFIA FINAL...";
            calcularTempo(alvo3.getTime(), agora, "MENSAGEM FINAL EM:");
        } 
        else if (agora >= alvo1.getTime()) {
            fase1.classList.remove("oculto");
            statusText.innerText = "> FASE 01 ATIVA. AGUARDANDO PROTOCOLO NOTURNO...";
            calcularTempo(alvo2.getTime(), agora, "REABASTECIMENTO EM:");
        } 
        else {
            statusText.innerText = "> SISTEMA SINCRONIZADO. AGUARDANDO LIBERAÇÃO...";
            calcularTempo(alvo1.getTime(), agora, "INÍCIO DA OPERAÇÃO EM:");
        }
    }

    function calcularTempo(alvoTime, agoraTime, titulo) {
        const diferenca = alvoTime - agoraTime;
        tituloCronometro.innerText = `> ${titulo}`;

        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        temporizadorElement.innerText = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    }

    // Validação da Senha do Vídeo
    if (btnLiberarVideo) {
        btnLiberarVideo.addEventListener("click", () => {
            const tentativa = inputSenhaVideo.value.trim();
            if (tentativa.toUpperCase() === SENHA_VIDEO_CORRETA.toUpperCase()) {
                videoBloqueado.style.display = "none";
                videoLiberado.classList.remove("oculto");
            } else {
                erroVideo.classList.remove("oculto");
                inputSenhaVideo.value = "";
                inputSenhaVideo.focus();
            }
        });
    }

    setInterval(atualizarSistema, 1000);
    atualizarSistema();
});