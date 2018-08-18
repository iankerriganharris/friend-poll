import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import {doSearch} from "../actions";

const mapDispatchToProps = dispatch => {
  return {
    doSearch: terms => {dispatch(doSearch(terms))}
  };
};

const Search = Input.Search;

const GeneralSearch = (props) => {
  return(
    <div>
      <Search
        placeholder="search..."
        onSearch={terms => props.doSearch(terms)}
        style={{ width: 200 }}
      />
    </div>
  )
}

export default connect(null, mapDispatchToProps)(GeneralSearch)