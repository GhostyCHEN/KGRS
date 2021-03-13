import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Icon } from "@ant-design/compatible";
import { Route, Router } from "react-router-dom";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
import LinkList from "./LinkList";
import NodeList from "./NodeList";
import KgView from "./KgView";
import "antd/dist/antd.css";
import "../static/css/AdminIndex.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">计算机资源管理后台</div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="1"
            onClick={() => {
              props.history.push("/index/add");
            }}
          >
            <Icon type="desktop" />
            <span>添加资源</span>
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => {
              props.history.push("/index/list");
            }}
          >
            <Icon type="file" />
            <span>资源列表</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="cluster" />
                <span>可视化管理</span>
              </span>
            }
          >
            <Menu.Item
              key="/node"
              onClick={() => {
                props.history.push("/index/nodelist");
              }}
            >
              节点列表
            </Menu.Item>
            <Menu.Item
              key="/link"
              onClick={() => {
                props.history.push("/index/linklist");
              }}
            >
              关系列表
            </Menu.Item>
            <Menu.Item
              key="/kgview"
              onClick={() => {
                props.history.push("/index/kgview");
              }}
            >
              可视化关系
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="3"
            onClick={() => {
              props.history.push("/index/kgview");
            }}
          >
            <Icon type="cluster" />
            <span>可视化管理</span>
          </Menu.Item>

          <Menu.Item key="9">
            <Icon type="user" />
            <span>用户管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <div>
                <Route path="/index/" exact component={AddArticle} />
                <Route path="/index/add/" exact component={AddArticle} />
                <Route path="/index/list/" exact component={ArticleList} />
                <Route path="/index/add/:id" exact component={AddArticle} />
                <Route path="/index/kgview" exact component={KgView} />
                <Route path="/index/nodelist" exact component={NodeList} />
                <Route path="/index/linklist" exact component={LinkList} />
              </div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>{`资源管理后台 (：`}</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
