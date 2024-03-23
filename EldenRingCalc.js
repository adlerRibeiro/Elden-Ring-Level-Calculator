function handleScroll(event) {}

// Adiciona o ouvinte de evento para a rolagem
document.addEventListener("wheel", handleScroll)

function calcularRunas() {
   // Obter os valores dos campos de entrada
   var levelAtual = parseInt(document.getElementById("level-atual").value)
   var levelDesejado = parseInt(document.getElementById("level-maximo").value)

   // Calcular o custo total de runas
   var totalRunas = 0
   for (var i = levelAtual; i < levelDesejado; i++) {
      var x = Math.max((i + 81 - 92) * 0.02, 0)
      var runeCost = Math.floor((x + 0.1) * Math.pow(i + 81, 2) + 1)
      totalRunas += runeCost
   }

   // Atualizar o valor do campo de entrada de total de runas
   var totalRunasInput = document.getElementById("total-runas")
   totalRunasInput.value = totalRunas.toString().replace(/\D/g, "") // remove todos os caracteres não numéricos

   calcularTempo()
}

var timeout = null // variável para armazenar o identificador de timeout

// Adicionar listeners de evento para os campos de entrada
document.getElementById("level-atual").addEventListener("input", function () {
   // Limpar o timeout anterior, se houver
   if (timeout) {
      clearTimeout(timeout)
   }
   // Configurar um novo timeout
   timeout = setTimeout(calcularRunas, 2000) // 2000 milissegundos = 2 segundos
})

document.getElementById("level-maximo").addEventListener("input", function () {
   // Limpar o timeout anterior, se houver
   if (timeout) {
      clearTimeout(timeout)
   }
   // Configurar um novo timeout
   timeout = setTimeout(calcularRunas, 2000) // 2000 milissegundos = 2 segundos
})

// Função para verificar se o foco está em um input
function isInputFocused() {
   // Verifica se o foco está em algum input
   const inputs = document.querySelectorAll("input, textarea, select")
   for (let i = 0; i < inputs.length; i++) {
      if (inputs[i] === document.activeElement) {
         return true // Retorna verdadeiro se o foco estiver em algum input
      }
   }
   return false // Retorna falso se o foco não estiver em nenhum input
}

// Função para trocar o fundo da página
function changeBackground(e) {
   // Verificar se o foco não está em nenhum input
   if (!isInputFocused()) {
      // Verificar se a tecla "6" foi pressionada
      if (e.key === "6") {
         // Verificar se a tecla "9" foi pressionada imediatamente após a tecla "6"
         document.addEventListener("keydown", function (e) {
            if (e.key === "9") {
               // Trocar o fundo da página para a nova imagem desejada
               document.body.style.backgroundImage = "url('https://cdnb.artstation.com/p/assets/images/images/059/065/269/large/jhobert-duarte-28.jpg?1675564223')" // Substitua 'nova-imagem.jpg' pelo URL da nova imagem
            }
         })
      }
   }
}

// Adicionar um ouvinte de evento para o teclado
document.addEventListener("keydown", changeBackground)

function calcularTempo() {
   var totalRunas = parseInt(document.getElementById("total-runas").value)
   var runas = parseInt(document.getElementById("runas").value)
   var minutos = parseInt(document.getElementById("minutos").value)
   var totalTempoInput = document.getElementById("total-tempo")

   // Verificar se ambos os campos de Runas e Minutos não estão vazios
   if (runas !== 0 && minutos !== 0 && totalRunas) {
      var runasPorHora = Math.floor(runas / minutos) * 60
      var totalHoras = Math.ceil(totalRunas / runasPorHora)

      totalTempoInput.value = totalHoras.toString() + " horas"
   } else {
      totalTempoInput.value = ""
   }
}

// Adicionar listeners de evento para os campos de entrada de Runas e Minutos
document.getElementById("runas").addEventListener("input", function () {
   // Limpar o timeout anterior, se houver
   if (timeout) {
      clearTimeout(timeout)
   }
   // Configurar um novo timeout
   timeout = setTimeout(calcularTempo, 2000) // 2000 milissegundos = 2 segundos
})

document.getElementById("minutos").addEventListener("input", function () {
   // Limpar o timeout anterior, se houver
   if (timeout) {
      clearTimeout(timeout)
   }
   // Configurar um novo timeout
   timeout = setTimeout(calcularTempo, 2000) // 2000 milissegundos = 2 segundos
})
