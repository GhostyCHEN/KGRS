import React, { useState, useEffect } from "react";
import "../static/css/ArticleList.css";
import { List, Row, Col, Modal, message, Button, Switch } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
const { confirm } = Modal;

function ArticleList(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);
  //得到文章列表
  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getArticleList,
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      setList(res.data.data);
    });
  };
  //删除资源
  const delArticle = (id) => {
    confirm({
      title: "确定要删除此资源吗？",
      onOk() {
        axios(servicePath.delArticle + id, { withCredentials: true }).then(
          (res) => {
            message.success("删除成功");
            getList();
          }
        );
      },
    });
  };
  //修改资源
  const updateArticle = (id, checked) => {
    props.history.push("/index/add/" + id);
  };
  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={10}>
              <b>资源标题</b>
            </Col>
            {/* <Col span={8}>
              <b>内容简介</b>
            </Col> */}
            <Col span={3}>
              <b>类型</b>
            </Col>
            <Col span={5}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={10}>{item.title}</Col>
              {/* <Col span={8}>{item.introduce}</Col> */}
              <Col span={3}>{item.type}</Col>
              <Col span={5}>{item.addTime}</Col>
              <Col span={4}>
                <Button
                  type="primary"
                  onClick={() => {
                    updateArticle(item.id);
                  }}
                >
                  修改
                </Button>
                &nbsp;&nbsp;
                <Button
                  onClick={() => {
                    delArticle(item.id);
                  }}
                >
                  删除{" "}
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ArticleList;
