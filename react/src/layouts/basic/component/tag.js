import React from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import { CloseOutlined, DownOutlined } from '@ant-design/icons'
import style from './tag.module.scss'
import { Dropdown, Menu } from "antd";
import { CSSTransition } from 'react-transition-group';
class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsList: [{
        name: props.location.state ? props.location.state : props.route.title,
        path: props.location.pathname ? props.location.pathname : props.route.path,
        title: props.location.state ? props.location.state : props.route.title
      }],
      isHiddleTag: false,
    };
  }

  componentDidUpdate(prevProps) { // 如果props改变就调用
    const { location, route, history } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      try {
        this.setTags(this.filterRouters(route, location), location)
      } catch (error) {
        history.push('/404');
      }
    }
  }

  filterRouters = (route, location) => {
    let arr = null;
    if (route.routes) {
      arr = matchRoutes(route.routes, location.pathname)[0].route;
      if (arr.routes) {
        arr = this.filterRouters(arr, location);
      }
    } else {
      arr = route;
    }
    return arr;
  }

  setTags = (route, location) => { // 生成动态的路由tag
    const isExist = this.state.tagsList.some(item => {
      return item.path === route.path;
    })
    if (!isExist) {
      if (this.state.tagsList.length >= 8) {
        this.state.tagsList.shift();
      }
      if (route.path === '*' || route.path === '/404') {
        this.setState((state) => ({ tagsList: [] }));
        return false;
      }
      this.setState((state) => ({
        tagsList: [...state.tagsList, {
          name: location.state ? location.state : route.title,
          path: route.path,
          title: location.state ? location.state : route.title
        }]
      }))
    }
  }

  closeTags(index, path, e) { // 删除标签
    e.stopPropagation();
    this.setState((state) => ({
      tagsList: state.tagsList.filter((item, i) => i !== index)
    }), () => {
      const item = this.state.tagsList[index] ? this.state.tagsList[index] : this.state.tagsList[index - 1];
      if (item) {
        path === this.props.location.pathname && this.props.history.push(item.path);
      } else {
        this.props.history.push('/home');
      }
    })
  }

  menu = () => (
    <Menu onClick={this.tagOption}>
      <Menu.Item key="1">关闭其他</Menu.Item>
      <Menu.Item key="2">关闭标签</Menu.Item>
    </Menu>
  )

  tagOption = ({ key }) => {
    if (key === '1') {
      const tagsList = this.state.tagsList.filter(item => item.path === this.props.location.pathname);
      this.setState({ tagsList });
    } else {
      this.setState({ isHiddleTag: true });
    }
  }

  render() {
    const { location } = this.props;
    const { tagsList, isHiddleTag } = this.state;
    return (
      <>
        <CSSTransition in={!isHiddleTag} classNames="fade" timeout={100} unmountOnExit>
          <div className={style['tag-wrapper']}>
            <div className={style.slider}>
              {
                tagsList.length ? (<ul className={`${style["tags"]}`}>
                  {
                    tagsList.map((item, index) => {
                      return (
                        <li className={item.path === location.pathname ? `${style['tags-li']} ${style['selected']}` : `${style['tags-li']}`} key={index}>
                          <NavLink to={item.path} className={style['tags-li-title']} title={item.title}>
                            {item.title}
                          </NavLink>
                          {
                            this.state.tagsList.length > 1 && <CloseOutlined className={style['del']} onClick={(e) => this.closeTags(index, item.path, e)} />
                          }
                        </li>
                      )
                    })
                  }
                </ul>) : <p className={style["tags"]}>未匹配到相关的路径~</p>
              }
            </div>
            <div className={style.option}>
              <Dropdown overlay={this.menu} arrow trigger={['click']}>
                <a onClick={e => e.preventDefault()}>
                  <span className={style.title}>标签设置</span>
                  <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </div>
        </CSSTransition>
      </>
    );
  }
}

export default withRouter(Tag);
