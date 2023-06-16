const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Harry se levanta del choque y decide:',
    options: [
      {
        text: 'Buscar a lisa en la ciudad',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Buscar a lisa en la carretera',
        nextText: 3
      }
      
    ]
  },
  {
    id: 2,
    text: 'Harry Decide buscar a lisa pero ve que la ciudad esta completamente sola, por lo que deberá explorar en el frio solo y sin ayuda.',
    options: [
      {
        text: 'Explorar',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Regresar al lugar del choque',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 3,
    text: 'Harry al caminar se topa con un grupo de monstruos que lo persiguen',
    options: [
      {
        text: 'Esconderse',
        nextText: 6
      },
      {
        text: 'Enfrentarse a los monstruos',
        nextText: 4
      },
      {
        text: 'Correr',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Harry se enfrenta a los monstruos pero por mayoria pierde y muere',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Harry logra ponerse a salvo',
    options: [
      {
        text: 'Explorar la ciudad',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Harry explorando de nuevo la ciudad decide buscar en todos los lugares ',
    options: [
      {
        text: 'Entrar a una casa',
        nextText: 8
      },
      {
        text: 'Darte por vencido',
        
        nextText: 9
      },
      {
        text: 'Seguir caminando en las calles',
        
        nextText: 10
      },
      {
        text: 'Buscar un lugar seguro' ,
        
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Harry al entrar una casa se topa con un grupo de monstruos que lo terminan matando',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Harry se da por vencido asi que la aventura termina aqui',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Caminando entre las calles Harry se vuelve a topar con un grupo de montruos que lo asesinan',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Harry buscando un lugar seguro se topa con un grupo de personas que le dicen que tienen una comunidad donde la gente esta refugiada, asi que decides ir con ellos. Al llegar a la comunidad preguntas por Lisa, te llevan con todos los niños que hay y entre todos los niños encuentras finalmente a Lisa  ',
    options: [
      {
        text: 'Felicidades. Jugar de nuevo.',
        nextText: -1
      }
    ]
  }
]

startGame()