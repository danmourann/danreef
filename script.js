document.addEventListener('DOMContentLoaded', function() {
    // Alternador de tema (mantido igual)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Alternador entre calculadoras
    const switchButtons = document.querySelectorAll('.switch-btn');
    const calculators = document.querySelectorAll('.tool-card');
    
    switchButtons.forEach(button => {
        button.addEventListener('click', function() {
            const calcToShow = this.getAttribute('data-calc');
            
            // Atualiza botões ativos
            switchButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Atualiza calculadoras visíveis
            calculators.forEach(calc => {
                calc.classList.remove('active');
                if (calc.id.includes(calcToShow)) {
                    setTimeout(() => {
                        calc.classList.add('active');
                    }, 10);
                }
            });
        });
    });
    
    // Calculadora de volume do aquário (mantida igual)
    const calculateVolumeBtn = document.getElementById('calculate-volume');
    const volumeResult = document.getElementById('volume-result');
    
    calculateVolumeBtn.addEventListener('click', function() {
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        const height = parseFloat(document.getElementById('height').value);
        
        if (isNaN(length) || isNaN(width) || isNaN(height) || length <= 0 || width <= 0 || height <= 0) {
            showError(volumeResult, 'Por favor, insira valores válidos para todas as dimensões.');
            return;
        }
        
        const volume = (length * width * height) / 1000;
        volumeResult.innerHTML = `Seu aquário tem aproximadamente <strong>${volume.toFixed(2)} litros</strong>.`;
        volumeResult.style.display = 'block';
    });

    // ... (mantenha o código existente) ...

// Calculadora de Potência para Aquecedor
const calculateHeaterBtn = document.getElementById('calculate-heater');
const heaterResult = document.getElementById('heater-result');

calculateHeaterBtn.addEventListener('click', function() {
    const volume = parseFloat(document.getElementById('tank-volume').value);
    
    if (isNaN(volume) || volume <= 0) {
        showError(heaterResult, 'Por favor, insira um volume válido.');
        return;
    }
    
    const minWattage = Math.ceil(volume * 1.0); // Mínimo de 1W por litro
    const recommendedWattage = Math.ceil(volume * 1.5); // Recomendado 1.5W por litro
    
    heaterResult.innerHTML = `
        Para ${volume} litros:<br>
        <strong>Mínimo:</strong> ${minWattage}W<br>
        <strong>Recomendado:</strong> ${recommendedWattage}W<br>
        <small>(1,5W por litro de água)</small>
    `;
    heaterResult.style.display = 'block';
});

// ... (restante do código) ...
    
    
// Calculadora de substrato - Versão corrigida
const calculateSubstrateBtn = document.getElementById('calculate-substrate');
const substrateResult = document.getElementById('substrate-result');

calculateSubstrateBtn.addEventListener('click', function() {
    const length = parseFloat(document.getElementById('tank-length').value);
    const width = parseFloat(document.getElementById('tank-width').value);
    const depth = parseFloat(document.getElementById('substrate-depth').value);
    
    if (isNaN(length) || isNaN(width) || isNaN(depth) || length <= 0 || width <= 0 || depth <= 0) {
        showError(substrateResult, 'Por favor, insira valores válidos para todas as dimensões.');
        return;
    }
    
    // Cálculo corrigido:
    const volumeCm3 = length * width * depth; // Volume em cm³
    const volumeLiters = volumeCm3 / 1000;    // Convertendo para litros
    const substrateKg = (volumeLiters * 1.5).toFixed(2); // Densidade 1.5kg/litro
    
    substrateResult.innerHTML = `
        Para uma camada de ${depth} cm em um aquário ${length}cm × ${width}cm:<br>
        <strong>Volume:</strong> ${volumeLiters.toFixed(2)} litros<br>
        <strong>Substrato necessário:</strong> ${substrateKg} kg<br>
        <small>(Considerando densidade de 1,5kg por litro de substrato)</small>
    `;
    substrateResult.style.display = 'block';
});
    
    function showError(element, message) {
        element.innerHTML = `<span style="color: #e74c3c;">${message}</span>`;
        element.style.display = 'block';
    }
});

// ... (mantenha o código existente e adicione:)

// Navegação entre conjuntos de ferramentas
const prevButton = document.getElementById('prev-tools');
const nextButton = document.getElementById('next-tools');
const toolSets = document.querySelectorAll('.tool-buttons');
let currentToolSet = 0;

// Mostra o conjunto de ferramentas atual
function showToolSet(index) {
    toolSets.forEach((set, i) => {
        set.classList.toggle('active', i === index);
    });
    
    // Atualiza estado dos botões de navegação
    prevButton.disabled = index === 0;
    nextButton.disabled = index === toolSets.length - 1;
}

// Event listeners para navegação
prevButton.addEventListener('click', () => {
    if (currentToolSet > 0) {
        currentToolSet--;
        showToolSet(currentToolSet);
    }
});

nextButton.addEventListener('click', () => {
    if (currentToolSet < toolSets.length - 1) {
        currentToolSet++;
        showToolSet(currentToolSet);
    }
});

// Inicializa o primeiro conjunto de ferramentas
showToolSet(0);

// Calculadora de Mistura de Sal
const calculateSaltBtn = document.getElementById('calculate-salt');
const saltResult = document.getElementById('salt-result');

calculateSaltBtn.addEventListener('click', function() {
    const brand = document.getElementById('salt-brand').value;
    const volume = parseFloat(document.getElementById('water-volume').value);
    
    if (isNaN(volume) || volume <= 0) {
        showError(saltResult, 'Por favor, insira um volume válido.');
        return;
    }
    
    let saltNeeded;
    let brandName;
    
    // Configurações para cada marca de sal
    switch(brand) {
        case 'oceanTech':
            saltNeeded = (volume / 30) * 1000; // 1000g para cada 30L
            brandName = 'OceanTech Bio Active';
            break;
        // Adicione mais casos para outras marcas aqui
        default:
            saltNeeded = 0;
            brandName = 'esta marca';
    }
    
    saltResult.innerHTML = `
        Para ${volume} litros com ${brandName}:<br>
        <strong>${saltNeeded.toFixed(0)} gramas</strong> de sal.<br>
        <small>(Salinidade alvo: 1.025)</small>
    `;
    saltResult.style.display = 'block';
});
// ... (mantenha o código existente) ...

// Dados dos problemas (pode ser movido para um JSON externo)
const problemsData = {
    aiptasia: {
        title: "Aiptasia",
        image: "images/problems/aiptasia.jpg",
        description: "Anêmonas invasoras que picam corais e se multiplicam rapidamente.",
        solutions: [
            {type: "predador", text: "Campeão natural: <strong>Camarão Bailarino</strong> (Thor amboinensis)"},
            {type: "produto", text: "Injetar <strong>Lemon Juice</strong> ou produtos específicos como Aiptasia-X"},
            {type: "controle", text: "Melhorar qualidade da água (reduzir nutrientes)"}
        ]
    },
    ciano: {
        title: "Ciano Bactéria",
        image: "images/problems/ciano.jpg",
        description: "Colônias de bactérias fotossintéticas que formam tapetes viscosos roxos ou esverdeados.",
        solutions: [
            {type: "controle", text: "Sifonar manualmente durante trocas de água"},
            {type: "produto", text: "Usar azitromicina (com cautela) ou produtos como <strong>Red Cyano RX</strong>"},
            {type: "prevenção", text: "Reduzir fosfatos e nitratos (RO/DI ajuda)"},
            {type: "equilíbrio", text: "Aumentar competição com macroalgas ou corais"}
        ]
    },
    valonia: {
        title: "Algas Valônia (Bubble Algae)",
        image: "images/problems/valonia.jpg",
        description: "Algas em formato de bolhas verdes que se reproduzem rapidamente e competem por nutrientes.",
        solutions: [
            {type: "manual", text: "Remoção cuidadosa com pinça (evitar estourar as bolhas)"},
            {type: "predador", text: "Caranguejo Mitrax (<em>Mithraculus sculptus</em>)"},
            {type: "controle", text: "Reduzir fosfatos e nitratos"},
            {type: "equipamento", text: "Skimmer eficiente e filtragem química"}
        ]
    },
    
    dinoflagelados: {
        title: "Dinoflagelados",
        image: "images/problems/dino.jpg",
        description: "Organismos unicelulares que formam camadas marrons e liberam toxinas.",
        solutions: [
            {type: "blackout", text: "3 dias de apagão total (cubra o aquário)"},
            {type: "produto", text: "Peróxido de hidrogênio (dosagem controlada)"},
            {type: "filtragem", text: "Aumentar trocas de água e usar carvão ativado"}
        ]
    }
};

// Adicione esta linha no CSS via JavaScript para melhor visualização
document.styleSheets[0].insertRule(`
    .problem-card:nth-child(n+4) {
        margin-top: 20px;
    }
`, document.styleSheets[0].cssRules.length);

// Modal de soluções
const modal = document.createElement('div');
modal.className = 'problem-modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="problem-solutions"></div>
    </div>
`;
document.body.appendChild(modal);

// Event listeners para os cards de problema
document.querySelectorAll('.problem-card').forEach(card => {
    card.addEventListener('click', function() {
        const problemId = this.getAttribute('data-problem');
        const problem = problemsData[problemId];
        
        const solutionsHTML = `
            <h2><i class="fas fa-bug"></i> ${problem.title}</h2>
            <img src="${problem.image}" alt="${problem.title}" style="max-width:100%; border-radius:5px; margin:10px 0">
            <p>${problem.description}</p>
            <h3><i class="fas fa-lightbulb"></i> Soluções:</h3>
            <ul>
                ${problem.solutions.map(sol => `
                    <li>
                        <span class="solution-tag">${sol.type}</span>
                        ${sol.text}
                    </li>
                `).join('')}
            </ul>
        `;
        
        document.querySelector('.problem-solutions').innerHTML = solutionsHTML;
        modal.style.display = 'block';
    });
});

// Fechar modal
document.querySelector('.close-modal').addEventListener('click', function() {
    modal.style.display = 'none';
});

// Fechar ao clicar fora
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
// Mostra a calculadora correta quando um botão do conjunto é clicado
document.querySelectorAll('.tool-buttons .switch-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const calcToShow = this.getAttribute('data-calc');
        
        // Esconde todas as calculadoras
        document.querySelectorAll('.tool-card').forEach(calc => {
            calc.classList.remove('active');
        });
        
        // Mostra a calculadora selecionada
        const targetCalc = document.getElementById(`${calcToShow}-calculator`);
        if (targetCalc) {
            targetCalc.classList.add('active');
        }
    });
});