const nn = ml5.neuralNetwork({task: 'regression'})
nn.load('./model/model.json', modelLoaded)

async function modelLoaded() {
    console.log("the model was loaded!")
}

let button = document.getElementById('predict')
button.addEventListener('click', ev => predict(ev))

async function predict(ev) {
    let ageIngevuld = document.getElementById('age').value;
    let overallIngevuld = document.getElementById('overall').value;
    let potentialIngevuld = document.getElementById('potential').value;


    const result = await nn.predict({
        age: parseInt(ageIngevuld),
        overall: parseInt(overallIngevuld),
        potential:parseInt(potentialIngevuld)
    })
    console.log(result[0])

    let endResult = document.getElementById('result')
    let num = parseInt((result[0].value_eur / 100000));
    num /= 10;
    console.log(typeof num)
    endResult.innerHTML = `De prijs van deze voetballer is: ${num} miljoen`;
}