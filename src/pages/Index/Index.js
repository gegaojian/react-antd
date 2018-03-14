import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ContainerQuery} from 'react-container-query';
import {enquireScreen} from 'enquire-js';
import classNames from 'classnames';
import {Layout, Icon, Button} from 'antd/lib';
import './Index.css';
import logo from './img/lsIco.png';
import SiderMenu from 'components/SiderMenu/SiderMenu';
import GlobalHeader from 'components/GlobalHeader';
import {getPermissions} from '../../redux/actions/index';

const {Header, Sider, Content, Footer} = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200
  }
};
let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class Index extends Component {
  state = {
    collapsed: false,
    isMobile: isMobile,
    open: false,
    msg: 'begin'
  }

  constructor(props) {
    super(props);
  }

  onSwitch = () => {
    this.setState({
      open: !this.state.open
    });
  }

  onTouchEnd = () => {
    this.setState({open: false});
  }

  toggle = () => {
    // this.props.getPermissions();
    this.triggerResizeEvent();
    isMobile
      ? this.setState({
        open: !this.state.open,
        collapsed: false
      })
      : this.setState({
        collapsed: !this.state.collapsed,
        open: false
      });
  }

  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  componentWillMount() {
    this
      .props
      .getPermissions();
  }

  componentDidMount() {
    enquireScreen((b) => {
      isMobile = b;
      this.setState({isMobile: b});
    })

  }

  render() {
    const {permissions} = this.props.index;
    const layout = (
      <Layout >
        <SiderMenu
          collapsed={this.state.collapsed}
          isMobile={this.state.isMobile}
          msg={this.state.msg}
          open={this.state.open}
          onTouchEnd={this.onTouchEnd}></SiderMenu>
        <Layout>
          <Header
            style={{
            background: '#fff',
            padding: 0
          }}>
          <GlobalHeader collapsed={this.state.collapsed} toggle={this.toggle}/>
          </Header>

          <Content
            style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280
          }}>

            <div style={{
              width: '100%'
            }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{
            padding: 0
          }}></Footer>
        </Layout>
      </Layout>
    );

    return (
      <ContainerQuery query={query}>
        {params => <div className={classNames(params)}>{layout}</div>}
      </ContainerQuery>
    );
  }
}

const mapStateToProps = (state) => {
  return {index: state.index}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPermissions: () => {
      dispatch(getPermissions());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
