import React from "react";
import Router from "next/router";
import { HomeOutlined, ApartmentOutlined } from "@ant-design/icons";
import { Row, Col, Menu } from "antd";
import "../static/style/components/header.css";
const Header = () => {
  const handleClick = (e) => {
    Router.push(e.key);
  };
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">计算机学科教学资源管理</span>
        </Col>

        <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="/">
              <HomeOutlined />
              首页
            </Menu.Item>
            <Menu.Item key="kgview">
              <ApartmentOutlined />
              计科教学可视化图谱
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
