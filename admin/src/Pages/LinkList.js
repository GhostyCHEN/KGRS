import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { List, Row, Col, Modal, message, Button, Input } from "antd";
import servicePath from "../config/apiUrl";
import "../static/css/List.css";
const { confirm } = Modal;

function LinkList() {
  const [linkList, setLinkList] = useState([]);
  const [source, setSource] = useState(0); //源节点
  const [target, setTarget] = useState(0); // 目标节点
  const [rela, setRela] = useState(""); //关系

  const preValue = useRef();
  preValue.current = {
    source: source,
    target: target,
    rela: rela,
  };

  useEffect(() => {
    getLinkList();
  }, []);

  // 获取关系列表
  const getLinkList = () => {
    axios({
      method: "get",
      url: servicePath.getLinkList,
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      setLinkList(res.data.data);
    });
  };

  // 删除节点
  const delLinkList = (id) => {
    confirm({
      title: "确定要删除此关系吗",
      onOk() {
        axios(servicePath.delLinkList + id, { withCredentials: true }).then(
          (res) => {
            message.success(res.data.data);
            getLinkList();
          }
        );
      },
    });
  };

  // 增加节点
  const addLinkList = () => {
    confirm({
      title: "添加关系",
      content: (
        <div>
          <Input
            placeholder="请输入源节点ID"
            type="number"
            onChange={(e) => {
              setSource(e.target.value);
            }}
          />
          <Input
            placeholder="请输入目标节点ID"
            type="number"
            onChange={(e) => {
              setTarget(e.target.value);
            }}
          />
          <Input
            placeholder="请输入节点关系"
            onChange={(e) => {
              setRela(e.target.value);
            }}
          />
        </div>
      ),
      onOk() {
        if (
          preValue.current.source == 0 ||
          preValue.current.target == 0 ||
          preValue.current.rela == ""
        ) {
          message.error("请将关系输入完整");
        } else {
          axios({
            method: "post",
            url: servicePath.addLinkList,
            data: preValue.current,
            withCredentials: true,
          }).then((res) => {
            if (res.data.data) {
              message.success(res.data.data);
              getLinkList();
            } else {
              message.error("添加失败");
            }
          });
        }
        setSource(0);
        setTarget(0);
        setRela("");
      },
    });
  };

  //修改节点
  const updateNodeList = (item) => {
    setSource(item.source);
    setTarget(item.target);
    setRela(item.rela);
    confirm({
      title: "修改关系",
      content: (
        <div>
          <Input
            defaultValue={item.source}
            type="number"
            onChange={(e) => {
              setSource(e.target.value);
            }}
          />
          <Input
            defaultValue={item.target}
            type="number"
            onChange={(e) => {
              setTarget(e.target.value);
            }}
          />
          <Input
            defaultValue={item.rela}
            onChange={(e) => {
              setRela(e.target.value);
            }}
          />
        </div>
      ),
      onOk() {
        preValue.current.id = item.id;
        axios({
          method: "post",
          url: servicePath.updateLinkList,
          data: preValue.current,
          withCredentials: true,
        }).then((res) => {
          if (res.data.data) {
            message.success(res.data.data);
            getLinkList();
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
            addLinkList();
          }}
        >
          添加关系
        </Button>
      </div>
      <List
        header={
          <Row className="list">
            <Col span={2}>
              <b>ID</b>
            </Col>
            <Col span={4}>
              <b>Source</b>
            </Col>
            <Col span={4}>
              <b>Target</b>
            </Col>
            <Col span={4}>
              <b>关系</b>
            </Col>
            <Col span={6}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={linkList}
        renderItem={(item) => (
          <List.Item>
            <Row className="list">
              <Col span={2}>{item.id}</Col>
              <Col span={4}>{item.source}</Col>
              <Col span={4}>{item.target}</Col>
              <Col span={4}>{item.rela}</Col>
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
                    delLinkList(item.id);
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

export default LinkList;
