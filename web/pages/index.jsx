import React from "react";
import Head from "next/head";
import { Row, Col, Menu,Card } from "antd";
import Header from "../components/Header";
import "../static/style/pages/home.css";
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
      <Head>
        <title>计算机学科教学资源管理</title>
      </Head>
      <Header />
      <Row className="content" justify="spance-between">
        <Col className="container" span={4}>
          <Menu defaultSelectedKeys={["structures"]}>
            <Menu.Item key="structure">数据结构</Menu.Item>
            <Menu.Item key="principles">计算机组成原理</Menu.Item>
            <Menu.Item key="web">计算机网络</Menu.Item>
          </Menu>
        </Col>
        <Col className="container-right" span={17} offset={1}>
          <Card className="container-card" title="Card title">
            <p>Information</p>
          </Card>
          <Card className="container-card" title="Card title">
            <p>Information</p>
          </Card>
          <Card className="container-card" title="Card title">
            <p>Information</p>
          </Card>
          <Card className="container-card" title="Card title">
            <p>Information</p>
          </Card><Card className="container-card" title="Card title">
            <p>Information</p>
          </Card>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Home;
