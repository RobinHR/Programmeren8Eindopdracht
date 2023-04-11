const nn = ml5.neuralNetwork({
    task: 'regression', debug: true
})

function loadData() {
    Papa.parse("./data/footballData.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => prepareData(results.data)
    })
}

function prepareData(data) {
    const cleanData = data.filter(player => (player.value_eur !== 0))
    cleanData.sort(() => Math.random() > 0.5)
    let trainData = cleanData.slice(0, Math.floor(cleanData.length * 0.8))
    let testData = cleanData.slice(Math.floor(cleanData.length * 0.8) + 1)

    console.log(trainData);

    for (let row of trainData) {
        nn.addData({age: row.age, overall: row.overall, potential: row.potential}, {value_eur: row.value_eur})
    }

    nn.normalizeData()
    nn.train({epochs: 15}, () => modelTrained(nn))
}
function modelTrained(nn) {
    let button = document.getElementById('saveModel')
    button.addEventListener('click', (event) => saveModel(nn));
}


function saveModel(nn){
    nn.save();
}

loadData();