const tf = require('@tensorflow/tfjs')
const holder = require('@tensorflow/tfjs-node')
const beerTesting = require('./beerTesting.json')
// const beer = require('./beer.json')

const Tensor = async beer => {
  const trainingData = tf.tensor2d(
    beer.map(item => [item.abv, item.geo, item.type])
  )

  const outputData = tf.tensor2d(beer.map(item => [item.score]))

  const testingData = tf.tensor2d(
    beerTesting.map(item => [item.abv, item.geo, item.type])
  )

  // neural network

  const model = tf.sequential()

  model.add(
    tf.layers.dense({
      inputShape: [3],
      activation: 'linear',
      units: 4
      // kernelInitializer: "constant"
      // useBias: true
    })
  )

  model.add(
    tf.layers.dense({
      activation: 'linear',
      units: 1,
      kernelInitializer: 'ones'
    })
  )

  model.add(
    tf.layers.dense({
      activation: 'linear',
      units: 1,
      kernelInitializer: 'ones'
    })
  )

  model.compile({
    loss: 'meanSquaredError',
    optimizer: tf.train.adam(0.06)
  })

  // train our network

  let fit = await model.fit(trainingData, outputData, {epochs: 500, verbose: 0})
  let output = await model.predict(testingData).data()

  return output
}

module.exports = {Tensor}
