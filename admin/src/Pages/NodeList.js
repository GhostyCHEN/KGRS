import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { List, Row, Col, Modal, message, Button, Input } from "antd";
import servicePath from "../config/apiUrl";
import "../static/css/List.css";
const { confirm } = Modal;

function NodeList() {
  const [nodeList, setNodeList] = useState([]);
  const [name, setName] = useState(""); //知识点
  const [type, setType] = useState(""); //知识点类型

  const preValue = useRef();
  preValue.current = {
    name: name,
    type: type,
  };
  useEffect(() => {
    getNodeList();
  }, []);
  //获取节点列表
  const getNodeList = () => {
    axios({
      method: "get",
      url: servicePath.getNodeList,
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      setNodeList(res.data.data);
    });
  };

  //删除节点
  const delNodeList = (id) => {
    confirm({
      title: "确定删除此节点？",
      onOk() {
        axios(servicePath.delNodeList + id, { withCredentials: true }).then(
          (res) => {
            message.success(res.data.data);
            getNodeList();
          }
        );
      },
    });
  };

  //增加节点
  const addNodeList = () => {
    confirm({
      title: "添加知识点",
      content: (
        <div>
          <Input
            placeholder="请输入知识点"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            placeholder="请输入类型"
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
        </div>
      ),
      onOk() {
        if (preValue.current.name == "" || preValue.current.type == "") {
          message.error("请将知识点填写完整");
        } else {
          axios({
            method: "post",
            url: servicePath.addNodeList,
            data: preValue.current,
            withCredentials: true,
          }).then((res) => {
            if (res.data.data) {
              message.success(res.data.data);
              getNodeList();
            } else {
              message.error("添加失败");
            }
          });
        }
        setName("");
        setType("");
      },
    });
  };

  //修改节点
  const updateNodeList = (item) => {
    setName(item.name);
    setType(item.type);
    confirm({
      title: "修改知识点",
      content: (
        <div>
          <Input
            defaultValue={item.name}
            placeholder="请输入知识点"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            defaultValue={item.type}
            placeholder="请输入类型"
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
        </div>
      ),
      onOk() {
        preValue.current.id = item.id;
        axios({
          method: "post",
          url: servicePath.updateNodeList,
          data: preValue.current,
          withCredentials: true,
        }).then((res) => {
          if (res.data.data) {
            message.success(res.data.data);
            getNodeList();
          } else {
            message.error("修改失败");
          }
        });
      },
    });
  };

  return (
    <div>
      <div className="add-btn">
        <Button
          type="primary"
          onClick={() => {
            addNodeList();
          }}
        >
          添加知识点
        </Button>
      </div>
      <List
        header={
          <Row className="list">
            <Col span={2}>
              <b>ID</b>
            </Col>
            <Col span={10}>
              <b>知识点</b>
            </Col>
            <Col span={3}>
              <b>类型</b>
            </Col>
            <Col span={6}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={nodeList}
        renderItem={(item) => (
          <List.Item>
            <Row className="list">
              <Col span={1}>{item.id}</Col>
              <Col span={10}>{item.name}</Col>
              <Col span={3}>{item.type}</Col>
              <Col span={6}>
                <Button
                  type="primary"
                  onClick={() => {
                    updateNodeList(item);
                  }}
                >
                  修改
                </Button>
                &nbsp;&nbsp;
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    delNodeList(item.id);
                  }}
                >
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default NodeList;
