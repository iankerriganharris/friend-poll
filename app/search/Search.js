

const elasticsearch = require('elasticsearch')

module.exports = class Search {
  static constructor = () => {
    this.client = new elasticsearch.Client({
      host: 'localhost:9200'
    })
  }

  doSearch = () => {
    this.client.search(

    )
  }
}