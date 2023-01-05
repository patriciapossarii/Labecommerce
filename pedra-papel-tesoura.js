/*
Pedra ganha da tesoura (amassando-a ou quebrando-a).
Tesoura ganha do papel (cortando-o).
Papel ganha da pedra (embrulhando-a).
*/

const inputUser = process.argv[2]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (!inputUser) {
    console.log("Digite pedra, papel ou tesoura:")
} else {

    const arrayGame = ["pedra", "papel", "tesoura"]
    let numeroAleatorio = getRndInteger(0, 2)
    let computer = arrayGame[numeroAleatorio]

    if (inputUser === "pedra" && computer === "tesoura") {
        console.log(`Você escolheu ${inputUser} e o computador escolheu ${computer}. Você ganhou!`)
    } 
    else if (inputUser === "tesoura" && computer === "pedra") {
        console.log(`Você escolheu ${inputUser} e o computador escolheu ${computer}. Você perdeu!`)
    }
    else if (inputUser === "tesoura" && computer === "papel") {
        console.log(`Você escolheu ${inputUser} e o computador escolheu ${computer}. Você ganhou!`)
    }
    else if (inputUser === "papel" && computer === "tesoura") {
        console.log(`Você escolheu ${inputUser} e o computador escolheu ${computer}. Você perdeu!`)
    }
    else if (inputUser === "papel" && computer === "pedra") {
        console.log(`Você escolheu ${inputUser} e o computador escolheu ${computer}. Você ganhou!`)
    }
    else if (inputUser === "pedra" && computer === "papel") {
        console.log(`Você escolheu ${inputUser} e o computador escolheu ${computer}. Você perdeu!`)
    }
    else if (inputUser === computer) {
        console.log(`Você escolheu ${inputUser} e o computador ${inputUser}. Empate!`)
    }

}

