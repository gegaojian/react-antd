import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd/lib';
import Drawer from 'rc-drawer-menu';
import 'rc-drawer-menu/assets/index.css';

import {Link} from 'react-router-dom';
import './index.css';

const {Sider} = Layout;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TempMenu = (props) => (
  <Sider
    trigger={null}
    collapsible
    collapsed={props.collapsed}
    style={{
    minHeight: '100vh'
  }}>
    <div className="logo"/>
    <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={props.collapsed}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span><Link to="/page1">Option 1</Link></span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span><Link to="/counter">Option 2</Link></span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span onClick={()=>{history.pushState(null,'','/userinfo')}}>Option 3</span>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
  </Sider>
);

class SiderMenu extends Component {
  state = {
    // collapsed: false
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  onChange = (bool) => {
    console.log(bool);
  }

  render() {
    return (this.props.isMobile
      ? (
        <Drawer
          width="200px"
          onChange={this.onChange}
          open={this.props.open}
          onMaskClick={this.props.onTouchEnd}
          iconChild={null}
          parent={null}
          level={null}>
          <TempMenu {...this.props}></TempMenu>
        </Drawer>
      )
      : <TempMenu {...this.props}></TempMenu>)
  }
}

export default SiderMenu;