window.onload = function() {
    const board = document.getElementById('gameBoard');
    const dice = document.getElementById('dice');
    const rollDiceBtn = document.getElementById('rollDiceBtn');
    const restartGameBtn = document.getElementById('restartGameBtn');
    const resetBoardBtn = document.getElementById('resetBoardBtn'); // Botão de restaurar
    const messageBox = document.getElementById('messageBox');
    const currentPlayerIndicator = document.getElementById('currentPlayerIndicator');

    let playerPositions = [0, 0];
    let currentPlayer = 0;
    let playerPieces = [];

    // Definição ORIGINAL das casas do tabuleiro - NUNCA SERÁ MUDADA
    const originalBoardSquares = [
        { type: 'action-purple', text: '0. Início da Jornada', effect: null },
        { type: 'action-green', text: '1. Apague as luzes da sala e fique dez minutos no escuro', effect: null },
        { type: 'action-green', text: '2. Coloque uma música sensual e dance para seu parceiro(a)', effect: null },
        { type: 'action-green', text: '3. Vire-se de costas e faça uma dança sedutora', effect: null },
        { type: 'action-red', text: '4. Peça para ele(a) tirar a roupa, conte até 5', effect: null },
        { type: 'action-green', text: '5. Tire uma peça de roupa. Escolha qual será', effect: null },
        { type: 'action-green', text: '6. Ele(a) pede', effect: null },
        { type: 'action-green', text: '7. Faça uma massagem ou seja massageado(a) por 5 minutos', effect: null },
        { type: 'action-red', text: '8. Beije outras partes do corpo dela(e) durante 2 minutos', effect: null },
        { type: 'action-red', text: '9. Chupe os dedos dele(a) um por vez, por 5 minutos', effect: null },
        { type: 'action-purple', text: '10. BÔNUS: Faça uma fantasia, quinze minutos', effect: null },
        { type: 'action-orange', text: '11. Estimule os mamilos dela(e)', effect: null },
        { type: 'action-green', text: '12. Acaricie lentamente por 5 min, sem beijar', effect: null },
        { type: 'action-green', text: '13. Sente na cama dele(a) e coloque romanticamente as mãos no peito', effect: null },
        { type: 'action-purple', text: '14. BÔNUS: Vocês escolhem o que fazer por quinze minutos', effect: null },
        { type: 'action-green', text: '15. Acaricie a sola do pé dele(a) usando as unhas', effect: null },
        { type: 'action-red', text: '16. VOLTE 2 CASAS ⏪', effect: 'backward', value: 2 },
        { type: 'action-green', text: '17. Deixe-o(a) de quatro e depois beije-o(a) bem nos lábios', effect: null },
        { type: 'action-red', text: '18. Ele(a) pede', effect: null },
        { type: 'action-green', text: '19. Completamente nu(a), deite-se sobre ele(a) e fique assim por 5 minutos', effect: null },
        { type: 'action-red', text: '20. Aceite levemente os testículos dele(a) enquanto beija seu corpo', effect: null },
        { type: 'action-green', text: '21. Ele(a) pede', effect: null },
        { type: 'action-green', text: '22. Ela(e) pede', effect: null },
        { type: 'action-red', text: '23. Esfregue a vagina no pênis dele(a)', effect: null },
        { type: 'action-orange', text: '24. Massageie o períneo dele(a) durante o ponto entre o saco e o ânus', effect: null },
        { type: 'action-red', text: '25. Beije na boca apaixonadamente durante 3 minutos da vagina dela(e)', effect: null },
        { type: 'action-red', text: '26. Masturbe-se na frente dele(a) por 3 minutos', effect: null },
        { type: 'action-red', text: '27. Faça sexo oral sem pressa', effect: null },
        { type: 'action-green', text: '28. Desafio da Paixão: Crie uma nova regra picante para o jogo', effect: null },
        { type: 'action-red', text: '29. Volta no Tempo: Relembre seu momento mais embaraçoso juntos e dê um beijo de desculpas', effect: 'backward', value: 1 },
        { type: 'action-purple', text: '30. BÔNUS: Troquem de lugar. Onde você está, seu parceiro(a) vai agora!', effect: 'swap' },
        { type: 'action-orange', text: '31. Toque Secreto: Descubra um novo ponto de prazer no corpo um do outro', effect: null },
        { type: 'action-green', text: '32. Juramento de Amor: Declare uma promessa de amor ao seu parceiro(a)', effect: null },
        { type: 'action-red', text: '33. Desejo Oculto: Revela um desejo secreto ao seu parceiro(a)', effect: null },
        { type: 'action-green', text: '34. Carícias no Pescoço: 2 minutos de beijos e mordiscadas no pescoço', effect: null },
        { type: 'action-red', text: '35. VOLTE 5 CASAS ⏪', effect: 'backward', value: 5 },
        { type: 'action-orange', text: '36. Olhar Sedutor: Troque olhares profundos por 1 minuto sem rir', effect: null },
        { type: 'action-red', text: '37. Gemido da Paixão: Faça um gemido sensual para o seu amor', effect: null },
        { type: 'action-green', text: '38. Pergunta Íntima: Faça uma pergunta sobre intimidade e responda honestamente', effect: null },
        { type: 'action-orange', text: '39. Massagem Sensorial: Use um objeto suave para tocar o corpo do(a) parceiro(a)', effect: null },
        { type: 'action-red', text: '40. Desafio Duplo: Cada um escolhe um desafio para o outro (para fazer agora!)', effect: null },
        { type: 'action-green', text: '41. Confissão Picante: Revele um segredo picante que nunca contou', effect: null },
        { type: 'action-purple', text: '42. BÔNUS: Banho Juntos: Aproveitem um banho relaxante e sensual', effect: null },
        { type: 'action-red', text: '43. Inversão de Papéis: Por 5 minutos, aja como seu parceiro(a) faria em um momento íntimo', effect: null },
        { type: 'action-red', text: '44. VOLTE 20 CASAS ⏪', effect: 'backward', value: 20 },
        { type: 'action-green', text: '45. Toque Surpresa: Toque o(a) parceiro(a) em um lugar inesperado por 30 segundos', effect: null },
        { type: 'end', text: '46. FIM 🎉: Conquiste o Final Feliz da Jornada!', effect: null }
    ];

    // Variável que contém o estado atual do tabuleiro (carregado ou original)
    let boardSquares;

    // Função para salvar o estado do tabuleiro no localStorage
    function saveBoardState() {
        localStorage.setItem('trilhaDoAmorBoard', JSON.stringify(boardSquares));
    }

    // Função para carregar o estado do tabuleiro do localStorage
    function loadBoardState() {
        const savedBoard = localStorage.getItem('trilhaDoAmorBoard');
        if (savedBoard) {
            boardSquares = JSON.parse(savedBoard);
            displayMessage("Tabuleiro personalizado carregado. Bom jogo!");
        } else {
            // Usa uma cópia do original para não alterar a constante
            boardSquares = JSON.parse(JSON.stringify(originalBoardSquares));
        }
    }

    // Função para restaurar o tabuleiro para o original
    function resetBoard() {
        if (confirm("Você tem certeza que quer restaurar o tabuleiro para o original? Todas as suas customizações serão perdidas.")) {
            localStorage.removeItem('trilhaDoAmorBoard');
            loadBoardState(); // Carrega o original
            restartGame(); // Reinicia o jogo para aplicar as mudanças visuais
            displayMessage("Tabuleiro restaurado para o original!");
        }
    }

    // Mapeamento de classes CSS para tipos de casa (cores específicas da imagem)
    const typeClasses = {
        'start': 'start-square',
        'end': 'end-square',
        'action-red': 'action-square-red',
        'action-orange': 'action-square-orange',
        'action-green': 'action-square-green',
        'action-purple': 'action-square-purple',
        'normal': 'board-square'
    };

    // Função para extrair o número de movimento do texto
    function parseMovementValue(text) {
        const regex = /(?:avance|volte)\s+(\d+)\s+casas?/i; // Regex para "avance N casas" ou "volte N casas"
        const match = text.match(regex);
        return match ? parseInt(match[1]) : null; // Retorna o número ou null se não encontrar
    }

    // Função para exibir mensagens no painel
    function displayMessage(msg) {
        messageBox.textContent = msg;
    }

    // Função para atualizar a posição visual das peças
    function updatePlayerPiecePositions() {
        playerPieces.forEach((piece, index) => {
            const targetSquare = board.children[playerPositions[index]];
            if (targetSquare) {
                targetSquare.appendChild(piece);
            }
        });
    }

    // Função para aplicar o efeito da casa
    function applySquareEffect(position) {
        const currentSquareElement = board.children[position];
        const squareTextContent = currentSquareElement ? currentSquareElement.querySelector('span').textContent : boardSquares[position].text;

        let effectMessage = '';
        let movementValue = null;

        if (currentSquareElement) {
            currentSquareElement.style.animation = 'pulse 0.5s 2 alternate';
            currentSquareElement.addEventListener('animationend', () => {
                currentSquareElement.style.animation = '';
            }, { once: true });
        }

        // Lógica de efeito para casas de troca e voltar/avançar
        if (boardSquares[position].effect === 'swap') {
            const otherPlayer = 1 - currentPlayer;
            const tempPos = playerPositions[currentPlayer];
            playerPositions[currentPlayer] = playerPositions[otherPlayer];
            playerPositions[otherPlayer] = tempPos;
            effectMessage = `Efeito da casa: ${squareTextContent}! Vocês trocaram de lugar no tabuleiro! Que reviravolta!`;
            setTimeout(updatePlayerPiecePositions, 300);
        } else if (boardSquares[position].effect === 'start') {
            playerPositions[currentPlayer] = 0;
            effectMessage = `Efeito da casa: ${squareTextContent}! De volta ao Início! Mas o amor sempre recomeça! ❤️`;
        } else if (boardSquares[position].effect === 'backward' || boardSquares[position].effect === 'forward') {
            // Para casas de "voltar" ou "avançar" que têm um valor pré-definido no array boardSquares
            movementValue = boardSquares[position].value;
            if (boardSquares[position].effect === 'forward') {
                const forwardTo = Math.min(boardSquares.length - 1, playerPositions[currentPlayer] + movementValue);
                playerPositions[currentPlayer] = forwardTo;
                effectMessage = `Efeito da casa: ${squareTextContent}! Avance para a casa ${forwardTo + 1}. Que sorte!`;
            } else if (boardSquares[position].effect === 'backward') {
                const backwardTo = Math.max(0, playerPositions[currentPlayer] - movementValue);
                playerPositions[currentPlayer] = backwardTo;
                effectMessage = `Efeito da casa: ${squareTextContent}! Volte para a casa ${backwardTo + 1}. Faz parte da jornada!`;
            }
        } else {
            // Para outras casas, o texto editável define a mensagem
            effectMessage = `Efeito da casa: ${squareTextContent}! Aproveitem o momento! 😊`;
        }

        setTimeout(() => {
            updatePlayerPiecePositions();
            displayMessage(effectMessage);
        }, 700);
    }

    // Função para obter a representação visual do dado (pontos)
    function getDiceFace(number) {
        // Usando Unicode para os pontos do dado
        // Alternativa: Usar SVGs para melhor controle de estilo, mas Unicode é mais simples
        const diceFaces = {
            1: '&#x2680;', // ⚀
            2: '&#x2681;', // ⚁
            3: '&#x2682;', // ⚂
            4: '&#x2683;', // ⚃
            5: '&#x2684;', // ⚄
            6: '&#x2685;'  // ⚅
        };
        return diceFaces[number] || '?'; // Retorna '?' se o número não for válido
    }


    // Função para lançar o dado
    function rollDice() {
        rollDiceBtn.disabled = true;
        let rollCount = 0;
        const interval = setInterval(() => {
            const randomRoll = Math.floor(Math.random() * 6) + 1;
            dice.innerHTML = getDiceFace(randomRoll); // Usa a função para pegar a face visual
            rollCount++;
            if (rollCount > 10) {
                clearInterval(interval);
                movePlayer(randomRoll);
            }
        }, 100);
    }

    // Função para mover o jogador
    function movePlayer(roll) {
        let newPosition = playerPositions[currentPlayer] + roll;

        if (newPosition >= boardSquares.length - 1) {
            newPosition = boardSquares.length - 1;
            displayMessage(`Jogador ${currentPlayer + 1} chegou ao FIM! 🎉 Parabéns, pombinhos! A jornada do amor nunca termina!`);
            rollDiceBtn.disabled = true;
        } else {
            const currentSquareElement = board.children[newPosition];
            const squareText = currentSquareElement ? currentSquareElement.querySelector('span').textContent : boardSquares[newPosition].text;
            displayMessage(`Jogador ${currentPlayer + 1} tirou ${roll} e moveu para a casa ${newPosition + 1}: ${squareText}.`);
        }

        playerPositions[currentPlayer] = newPosition;
        updatePlayerPiecePositions();
        applySquareEffect(newPosition);

        setTimeout(() => {
            if (newPosition < boardSquares.length - 1) {
                currentPlayer = 1 - currentPlayer;
                currentPlayerIndicator.textContent = `Vez do Jogador ${currentPlayer + 1}`;
                rollDiceBtn.disabled = false;
            }
        }, 2000);
    }
    
    // Função para criar o tabuleiro dinamicamente
    function createBoard() {
        board.innerHTML = '';
        playerPieces = []; // Limpar peças existentes para recriação

        boardSquares.forEach((square, index) => {
            const squareElement = document.createElement('div');
            squareElement.classList.add('board-square', typeClasses[square.type] || 'normal', `square-${index}`);
            
            // Verifica se o bloco é de "voltar" ou "trocar" para NÃO adicionar o ícone de lápis e não ser editável
            const isNonEditable = (square.effect === 'backward' || square.effect === 'forward' || square.effect === 'swap' || square.effect === 'start' || square.type === 'end');

            let innerHTMLContent = `<span contenteditable="${!isNonEditable}">${square.text}</span>`;
            if (!isNonEditable) { // Apenas adiciona o ícone se for editável
                innerHTMLContent = `<i class="fas fa-pencil-alt edit-icon" title="Clique para editar"></i>` + innerHTMLContent;
            }

            squareElement.innerHTML = innerHTMLContent;
            squareElement.dataset.index = index;
            board.appendChild(squareElement);

            // Adiciona listeners APENAS se o span for editável
            if (!isNonEditable) {
                const editIcon = squareElement.querySelector('.edit-icon');
                const textSpan = squareElement.querySelector('span');

                editIcon.addEventListener('click', (event) => {
                    event.stopPropagation();
                    textSpan.contentEditable = "true";
                    textSpan.focus();
                });

                textSpan.addEventListener('blur', () => {
                    textSpan.contentEditable = "false";
                    boardSquares[index].text = textSpan.textContent;
                    saveBoardState(); // SALVA o estado após a edição
                });
            }
        });

        const player1Piece = document.createElement('div');
        player1Piece.classList.add('player-piece', 'player-1');
        player1Piece.textContent = '👨';
        board.children[playerPositions[0]].appendChild(player1Piece);
        playerPieces.push(player1Piece);

        const player2Piece = document.createElement('div');
        player2Piece.classList.add('player-piece', 'player-2');
        player2Piece.textContent = '👩';
        board.children[playerPositions[1]].appendChild(player2Piece);
        playerPieces.push(player2Piece);

        updatePlayerPiecePositions();
    }

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes pulse {
            0% { transform: scale(1); }
            100% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(styleSheet);


    rollDiceBtn.addEventListener('click', rollDice);
    restartGameBtn.addEventListener('click', restartGame); // Event listener para o novo botão
    resetBoardBtn.addEventListener('click', resetBoard); // Event listener para restaurar

    // Nova função para reiniciar o jogo
    function restartGame() {
        playerPositions = [0, 0]; // Reinicia posições
        currentPlayer = 0; // Reinicia para o Jogador 1
        dice.innerHTML = getDiceFace(1); // Limpa o dado, mostrando a face 1
        rollDiceBtn.disabled = false; // Reabilita o botão de dado
        currentPlayerIndicator.textContent = `Vez do Jogador 1`; // Atualiza o indicador
        createBoard(); // Recria o tabuleiro (que recoloca as peças)
        displayMessage("Jogo reiniciado! Bem-vindos à \"A Trilha do Amor\"! Jogador 1, comece a aventura! ❤️");
    }

    loadBoardState(); // CARREGA o estado do tabuleiro ao iniciar
    createBoard();
    displayMessage("Bem-vindos à \"A Trilha do Amor\"! Jogador 1, comece a aventura! ❤️");
};
