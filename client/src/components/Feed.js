import React from 'react';
import { List, message, Avatar, Spin } from 'antd';
import { connect } from 'react-redux';
import { loadFeed } from '../actions/index';
import { Link } from 'react-router-dom';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

function mapStateToProps(state) {
  return { feedData: state.feedData };
};

class Feed extends React.Component {
  state = {
    loading: false,
  }
  loadedRowsMap = {}
  componentDidMount() {
    !!this.props.feedData ? this.props.dispatch(loadFeed()) : null
  }
  handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    this.setState({
      loading: true,
    });
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      this.loadedRowsMap[i] = 1;
    }
    if (this.props.feedData.length > 2) {
      // message.warning('Virtualized List loaded all');
      this.setState({
        loading: false,
      });
      return;
    }
    this.props.dispatch(loadFeed());
  }
  isRowLoaded = ({ index }) => {
    return !!this.loadedRowsMap[index];
  }
  renderItem = ({ index, key, style }) => {
    const item = this.props.feedData[index];
    return (
      <List.Item
        key={key}
        style={style}
        //actions={[<Link>{item.number_of_replies}</Link>]}
      >
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<Link to={`/${item.account.screen_name}`}>{item.account.screen_name}</Link>}
          description={item.description}
        />
      </List.Item>
    );
  }
  render() {
    const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
      <VList
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        overscanRowCount={2}
        rowCount={this.props.feedData.length}
        rowHeight={73}
        rowRenderer={this.renderItem}
        onRowsRendered={onRowsRendered}
        scrollTop={scrollTop}
        width={width}
      />
    );
    const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
      <AutoSizer disableHeight>
        {({ width }) => vlist({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width })}
      </AutoSizer>
    );
    const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.handleInfiniteOnLoad}
        rowCount={this.props.feedData.length}
      >
        {({ onRowsRendered }) => autoSize({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered })}
      </InfiniteLoader>
    );
    return (
      <List>
        {
          this.props.feedData.length > 0 && (
            <WindowScroller>
              {infiniteLoader}
            </WindowScroller>
          )
        }
        {this.state.loading && <Spin className="demo-loading" />}
      </List>
    );
  }
}

export default connect(mapStateToProps)(Feed);