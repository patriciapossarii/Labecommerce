
const inputParImpar = process.argv[2]
const inputNumber = Number(process.argv[3])

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (!inputParImpar || !inputNumber) {
    console.log("Digite impar ou par e um número:")
} else {
    const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10)
    const soma = numeroAleatorioEntreZeroeDez + inputNumber

    let compParImpar = ""
    if (inputParImpar === "par") {
        compParImpar = "impar"
    } else {
        compParImpar = "par"
    }


    let resultSomaParImpar = ""
    if (soma % 2 === 0) {
        resultSomaParImpar = "par"
    } else {
        resultSomaParImpar = "impar"
    }


    if (inputParImpar === resultSomaParImpar) {
        console.log(`Você escolheu ${inputParImpar} e o computador escolheu ${compParImpar}. O resultado foi ${soma}.
    Você ganhou` )
    } else {
        console.log(`Você escolheu ${inputParImpar} e o computador escolheu ${compParImpar}. O resultado foi ${soma}.
    Você perdeu`)
    }
}
