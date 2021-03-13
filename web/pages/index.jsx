import React,{useState} from "react";
import Head from "next/head";
import Link from "next/link"
import { Row, Col, Menu,List, Card } from "antd";
import axios from 'axios'
import Header from "../components/Header";
import "../static/style/pages/home.css";
import Footer from '../components/Footer'
const Home = (list) => {
  
  const [mylist, setMylist] = useState(list.data);
  return (
    <div>
      <Head>
        <title>计算机学科教学资源管理</title>
      </Head>
      <Header />
      <Row className="content" >
        <Col className="container" span={4}>
          <Menu defaultSelectedKeys={["structures"]}>
            <Menu.Item key="structure">数据结构</Menu.Item>
            <Menu.Item key="principles">计算机组成原理</Menu.Item>
            <Menu.Item key="web">计算机网络</Menu.Item>
          </Menu>
        </Col>
        <Col className="container-right" span={17} offset={1}>
          <List
            grid={{ gutter: 10, column: 3 }}
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <Card className="container-card" title={item.title}>
                  <p className="container-card-content">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.introduce}</a>
                    </Link>
                  </p>
                  <p className="container-card-time">{item.addTime}</p>
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    axios('http://127.0.0.1:7001/default/getArticleList').then(
      res => {
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home;
