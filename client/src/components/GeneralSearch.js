import React from 'react';
import { Input, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";

const Search = Input.Search;

class GeneralSearch extends React.Component {

  resetComponent = () => {
    console.log('reset called')
    this.setState({showResults: false})
  }

  state = {
    showResults: false,
    value: [],
    data: []
  }

  doSearch = async (terms) => {
    const request = {
      credentials: 'include',
      method: 'GET'
    }
    const response = await axios(`/api/search?q=${terms}`, request)
    if (response.status >= 200 && response.status < 300) {
      const data = response.data.map(hit => ({
        text: hit._source.screen_name,
        value: hit._source.screen_name
      }))
      this.setState({ data: [...data], showResults: true})
    } else {
      const error = response.statusText
    }
  }

  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }

  render() {
    const { value, data, showResults } = this.state
    const dataList = data.length ? data.map(
      hit =>
        <Menu.Item key={hit.value}>
          <Link onClick={() => this.resetComponent()} to={`/${hit.value}`}>{hit.value}</Link>
        </Menu.Item>
    ) : <Menu.Item></Menu.Item>
    const results = <Menu>{dataList}</Menu>
    return(
      <div>
        <Search
          placeholder="search..."
          onSearch={this.doSearch}
        />
        <Dropdown visible={this.state.showResults} overlay={results}><div></div></Dropdown>
      </div>
    )
  }
}

export default GeneralSearch;