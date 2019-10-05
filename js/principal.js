var table = {
    'H': 'Hidrogênio','Sc':'Escândio',
    'Li': 'Lítio', 'Y':'Ítrio', 
    'Be': 'Berílio', 'Ti':'Titânio',
    'Na':'Sódio', 'Zr':'Zircônio', 
    'Mg':'Magnésio', 'Hf':'Háfnio', 
    'K':'Potássio','Rf':'Rutherfórdio', 
    'Ca':'Cálcio', 'La':'Lantânio', 
    'Rb':'Rubídio','Ac':'Actínio', 
    'Sr':'Estrôncio','V':'Vanádio',
    'Cs':'Césio','Nb':'Nióbio', 
    'Ba':'Bário','Ta':'Tântalo', 
    'Fr':'Frâncio','Db':'Dúbnio', 
    'Ra':'Rádio', 'Ce':'Cério',
    'Th':'Tório', 'Cr':'Cromo',
    'Mo':'Molibdênio', 'W':'Tungstênio',
    'Sg':'Seabórgio', 'Pr':'Praseodímio',
    'Pa':'Protactínio', 'Mn':'Manganês',
    'Tc':'Tecnécio', 'Re':'Rênio',
    'Bh':'Bóhrio', 'Nd':'Neodímio',
    'U':'Urânio', 'Fe':'Ferro',
    'Ru':'Rutênio', 'Os':'Ósmio',
    'Hs':'Hássio', 'Pm':'Promécio',
    'Np':'Netúnio', 'Co':'Cobalto',
    'Rh':'Ródio', 'Ir':'Irídio',
    'Mt':'Meitnério', 'Sm':'Samário',
    'Pu':'Plutônio', 'Ni':'Níquel',
    'Pd':'Paládio', 'Pt':'Platina',
    'Ds':'Darmstádio', 'Eu':'Európio',
    'Am':'Amerício', 'Cu':'Cobre',
    'Ag':'Prata', 'Au':'Ouro',
    'Rg':'Roentgênio', 'Gd':'Gadolínio',
    'Cm':'Cúrio', 'Zn':'Zinco',
    'Cd':'Cádmio', 'Hg':'Mercúrio',
    'Cn':'Copernício', 'Tb':'Térbio',
    'Bk':'Berquélio', 'B':'Boro',
    'Ai':'Alumínio', 'Ga':'Gálio',
    'In':'Índio', 'Tl':'Tálio',
    'Nh':'Nihônio', 'Dy':'Disprósio',
    'Cf':'Califórnio', 'C':'Carbono',
    'Si':'Silício', 'Ge':'Germânio',
    'Sn':'Estanho', 'Pb':'Chumbo',
    'Fi':'Fleróvio', 'Ho':'Hólmio',
    'Es':'Einsténio', 'N':'Nitrogênio',
    'P':'Fósforo', 'As':'Arsênio',
    'Sb':'Antimônio', 'Bi':'Bismuto',
    'Mc':'Moscóvio', 'Er':'Érbio',
    'Fe':'Férmio', 'O':'Oxigênio',
    'S':'Enxofre', 'Se':'Selênio',
    'Te':'Telúrio', 'Po':'Polônio',
    'Lv':'Livermório', 'Tm':'Túlio',
    'Md':'Mendelévio', 'F':'Flúor',
    'Cl':'Cloro', 'Br':'Bromo',
    'I':'Iodo', 'At':'Ástato',
    'Ts':'Tenessino', 'Yb':'Itérbio',
    'No':'Nobélio', 'He':'Hélio',
    'Ne':'Neônio', 'Ar':'Argônio',
    'Kr':'Criptônio', 'Xe':'Xenônio',
    'Rn':'Radônio', 'Og':'Oganessônio',
    'Lu':'Lutécio', 'Lr':'Laurêncio' 
}



const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const errorElement = document.querySelector('.error')
const title = document.querySelector('.title')


function gerarNumero(ini, fim) {
    return Math.floor(Math.random() * (fim - ini)) + ini;
}

function gerarQuestao(table){
    array_keys = []
    array_values = []

    for(const key in table){
        array_keys.push(key)
        array_values.push(table[key])
    }
    perq = array_keys[gerarNumero(0,array_keys.length)]
    question = {'question':perq}
    resp = []
    num = gerarNumero(0,4)
    
    verifica = [] 
    for(var x = 0; x < 4;x++){
        gen = array_values[gerarNumero(0,array_values.length)]
            if(num == x){
                resp.push({correct:true, text:table[perq]})
            }else{
                if(!verifica.includes(gen) && gen != table[perq]){
                    resp.push({correct:false, text:gen})
                }
            } 
        verifica.push(array_values[x])
    }
   
    question['answers'] = resp
    return question
} 

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  setNextQuestion()
})

function startGame() {
  title.classList.add('hide')
  startButton.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  erros = 0
  maxErro = 10
}

function setNextQuestion() {
  resetState()
  showQuestion(gerarQuestao(table))
}

function showQuestion(question) {
  
  questionElement.innerHTML = 'O que significa <span class="word">' + question.question + '</span> na tabela periódica?' 
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if(!correct == true){
      erros += 1
      errorElement.textContent = `Respostas erradas: ${erros}`
  } 
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if(erros < maxErro){
    nextButton.classList.remove('hide')
  } else {
    startButton.addEventListener('click', function() {
        errorElement.textContent = ''
    })
    errorElement.textContent = 'Você perdeu!' 
    questionContainerElement.classList.add('hide')
    startButton.innerText = 'Reiniciar'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}







