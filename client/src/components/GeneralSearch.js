import React from 'react';
import { Input, Dropdown, Menu, Spin, Icon } from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";

class GeneralSearch extends React.Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => {
    this.setState({showResults: false, loading: false})
  }

  state = {
    showResults: false,
    value: [],
    data: [],
    loading: false
  }

  handleChange = (value) => {
    console.log(value)
    this.setState({value, data: [], loading: true},
      () => {
        setTimeout(async () => {
          if (this.state.value.length < 1) return this.resetComponent()
          const request = {
            credentials: 'include',
            method: 'GET'
          }
          const response = await axios(`/api/search?q=${value}`, request)
          if (response.status >= 200 && response.status < 300) {
            const data = response.data.map(hit => ({
              text: hit._source.screen_name,
              value: hit._source.screen_name
            }))
            this.setState({ data: [...data], showResults: true, loading: false})
          } else {
            const error = response.statusText
          }
        }, 300);
      }
    )
  }

  render() {
    const { value, data, showResults, loading } = this.state
    const dataList = data.length ? data.map(
      hit =>
        <Menu.Item key={hit.value}>
          <Link onClick={() => this.resetComponent()} to={`/${hit.value}`}>{hit.value}</Link>
        </Menu.Item>
    ) : <Menu.Item>No results found.</Menu.Item>
    const results = <Menu>{dataList}</Menu>
    console.log('show results ' + showResults)
    return(
      <div className={this.props.className}>
        <Spin size={"small"} spinning={loading}>
          <Input
            prefix={<Icon type="search"/>}
            placeholder="search..."
            onChange={(e) => this.handleChange(e.target.value)}
          />
        </Spin>
        {showResults ?
          <Dropdown visible overlay={results}>
            <div></div>
          </Dropdown>
          : null
        }
      </div>
    )
  }
}

export default GeneralSearch;