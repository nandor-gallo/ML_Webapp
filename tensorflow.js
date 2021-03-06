const tfNode = require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const fs = require('fs')
const resolve = require('path').resolve

const possibles = ['Rock', 'Paper', 'Scissors']

//WORKING
async function prediction(imageBuffer) {
    const model = await tfNode.loadLayersModel('file://model/model.json');
    
    // convert image to tensorflow tensor
    let imageTensor = tfNode.node.decodePng(imageBuffer, 3)
    imageTensor = tf.div(imageTensor, 255)
    imageTensor = tf.image.resizeBilinear(imageTensor, [150, 150])
    imageTensor = imageTensor.expandDims(0)
    // console.log(imageTensor.shape)
    // console.log(imageTensor.dataSync())

    //Make a prediction using the model
    const prediction = model.predict(imageTensor);

    //Returns an array of indexes [n, n]

    results = prediction.dataSync()
    const pick = possibles[results.indexOf(Math.max(...results))]

    // TODO: return accuracy as well
    return { pick: pick, accuracy: Math.max(...results) }
}

// fs.readFile(resolve('./tmp/1.png'), function(err, image) {
//     if (err) return console.log(err)
//     console.log(prediction(image))
// })

module.exports.prediction = prediction
