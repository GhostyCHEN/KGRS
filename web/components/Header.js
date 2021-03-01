import React from "react";
import { Icon } from "@ant-design/compatible";
import { Row, Col, Menu } from "antd";
import "../static/style/components/header.css";
const Header = () => (
  <div className="header">
    <Row type="flex" justify="center">
      <Col xs={24} sm={24} md={10} lg={10} xl={10}>
        <span className="header-logo">华师计算机学院智能推荐</span>
      </Col>

      <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Icon type="home" />
            首页
          </Menu.Item>
          <Menu.Item key="video">
            <Icon type="apartment" />
            计科教学可视化图谱
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
);

export default Header;
