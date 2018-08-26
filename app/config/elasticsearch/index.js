
module.exports = (elasticsearch) => {
  return new elasticsearch.Client({
    host: 'localhost:9200'
  })
}