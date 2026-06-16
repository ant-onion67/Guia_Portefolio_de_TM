// Base de dados estruturada para os Módulos do Curso (Fase 2)
const dadosModulos = {
    1: [
        {
            disciplina: "Modúlos de TM",
            modulos: [
                { id: "9960", nome: "Edição de Bitmap", desc: "Edição e tratamento de imagens digitais para criação de conteúdos visuais." },
                { id: "9961", nome: "Edição Vetorial", desc: "Criação e edição de gráficos vetoriais com qualidade escalável." },
                { id: "0141", nome: "Animação 2D", desc: "Criação de animações bidimensionais para conteúdos digitais." }
            ]
        },
        {
            disciplina: "Modúlos de SI",
            modulos: [
                { id: "9948", nome: "Redes e protocolos multimédia", desc: "Estudo das redes, protocolos e servidores utilizados na comunicação e distribuição de conteúdos multimédia na Internet."
				}
				
            ]
        }
    ],
    2: [
        {
            disciplina: "Modúlos de TM",
            modulos: [
                { id: "9962", nome: "Animação Interativa", desc: "Criação de animações interativas para aplicações e conteúdos multimédia." },
                { id: "9966", nome: "Edição 3d", desc: "Criação e edição de modelos e animações tridimensionais." }
            ]
        },
        {
            disciplina: "Modúlos de SI",
            modulos: [
                { id: "9951", nome: "Linguagem de programação web", desc: "Desenvolvimento de aplicações web dinâmicas com programação de servidor e bases de dados." }
            ]
        }
    ],
    3: [
        {
            disciplina: "Modúlos de TM",
            modulos: [
                { id: "9964", nome: "Edição de Som", desc: "Captação, edição e tratamento de áudio para conteúdos multimédia." },
                { id: "9973", nome: "Pós-Produção de Som", desc: "Mistura, melhoria e finalização de áudio para projetos multimédia." },
                { id: "5404", nome: "Pós Produção de Vídeo", desc: "Edição, montagem e finalização de vídeo para conteúdos audiovisuais." }
            ]
        }
    ]
};

// Controlo de Navegação das Vistas (SPA)
function switchView(viewId) {
    // Atualizar classes nas secções de conteúdo
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    const activeView = document.getElementById(`view-${viewId}`);
    if (activeView) activeView.classList.add('active');

    // Atualizar botões de navegação
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === viewId.toLowerCase() || 
            (viewId === 'home' && btn.innerText.toLowerCase() === 'home')) {
            btn.classList.add('active');
        }
    });

    // Se mudar para a vista de Anos, ativa por defeito o 1º Ano
    if (viewId === 'anos') {
        filterYear(1);
    }
    
    // Rolar automaticamente para o topo ao mudar de ecrã
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Atalho da Home para abrir diretamente um Ano específico
function openYear(ano) {
    switchView('anos');
    filterYear(ano);
}

// Filtrar e construir a lista de módulos dinamicamente por Ano
function filterYear(ano) {
    // Atualizar botões de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const targetBtn = document.getElementById(`btn-yr${ano}`);
    if (targetBtn) targetBtn.classList.add('active');

    // Construir o HTML dos módulos
    const container = document.getElementById('modules-container');
    container.innerHTML = '';

    const disciplinasDoAno = dadosModulos[ano];
    
    if (disciplinasDoAno) {
        disciplinasDoAno.forEach(item => {
            let disciplinaHtml = `<div class="disciplina-wrapper">
                <div class="disciplina-title">${item.disciplina}</div>`;
            
            item.modulos.forEach(mod => {
                disciplinaHtml += `
                    <div class="modulo-item">
                        <div class="modulo-header">
                            <div class="modulo-code">${mod.id}</div>
                            <div class="modulo-name">${mod.nome}</div>
                        </div>
                        <div class="modulo-desc">${mod.desc}</div>
                    </div>
                `;
            });
            
            disciplinaHtml += `</div>`;
            container.innerHTML += disciplinaHtml;
        });
    }
}

// Registo do Service Worker para suporte Offline (Fase 3)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('PWA: Service Worker registado com sucesso!'))
            .catch(err => console.error('PWA: Falha ao registar o Service Worker:', err));
    });
}

// Deteção em tempo real de Estado de Rede (Online / Offline)
const toast = document.getElementById('offline-toast');

window.addEventListener('online', () => {
    toast.innerText = "Ligação restabelecida! Conteúdo atualizado.";
    toast.classList.remove('offline');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
});

window.addEventListener('offline', () => {
    toast.innerText = "Estás em modo Offline. A usar dados locais em cache.";
    toast.classList.add('offline');
    toast.classList.add('show');
});

// Verificar se abriu a aplicação já em modo offline
if (!navigator.onLine) {
    toast.innerText = "Estás em modo Offline. A usar dados locais em cache.";
    toast.classList.add('offline');
    toast.classList.add('show');
}