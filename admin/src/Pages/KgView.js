import React, { useEffect, useState } from "react";
import axios from "axios";
import initKG from "../comm/kj";
import servicePath from "../config/apiUrl";
import "materialize-css/dist/css/materialize.css";
import "../static/css/KgView.css";

function KgView() {
  const [nodeList, setNodeList] = useState({});
  const [linkList, setLinkList] = useState([]);
  const getData = () => {
    axios({
      method: "get",
      url: servicePath.getNodeList,
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      if (res.data.data) {
        var result = {};
        for (const item of res.data.data) {
          result[item.id] = {
            name: item.name,
            type: item.type,
          };
        }
        setNodeList(result);
      }
    });
    axios({
      method: "get",
      url: servicePath.getLinkList,
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      setLinkList(res.data.data);
    });
  };
  // useEffect(() => {
  //   getData();
  // }, []);
  // const t1 =
  //   "{" +
  //   '"1": {"name": "计算机组成原理","type": "学科"},\n' +
  //   '"2": { "name": "计算机系统概论", "type": "章节"},\n' +
  //   '"3": {"name": "计算机的发展与应用","type": "章节"},\n' +
  //   '"4": {"name": "运算方法和运算部件","type": "章节"},\n' +
  //   '"5": {"name": "指令系统","type": "章节"},\n' +
  //   '"6": {"name": "主存储器","type":"章节"},\n' +
  //   '"7": {"name": "中央处理器","type": "章节"},\n' +
  //   '"8": {"name": "辅助存储器","type": "章节"},\n' +
  //   '"9": {"name": "I/O系统","type": "章节"}\n' +
  //   "}";
  // const t2 =
  //   "[\n" +
  //   '{ "source": 1, "target": 2, "rela": "章节"},\n' +
  //   '{ "source": 1, "target": 3, "rela": "章节"},\n' +
  //   '{ "source": 1, "target": 4, "rela": "章节" },\n' +
  //   '{ "source": 1, "target": 5, "rela": "章节" },\n' +
  //   '{ "source": 1, "target": 6, "rela": "章节" },\n' +
  //   '{ "source": 1, "target": 7, "rela": "章节" },\n' +
  //   '{ "source": 1, "target": 8, "rela": "章节" },\n' +
  //   '{ "source": 1, "target": 9, "rela": "章节" }\n' +
  //   "]";

  const render = async () => {
    var contentHook = function (item) {};
    var nodeList;
    var linkList;
    await axios({
      method: "get",
      url: servicePath.getNodeList,
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      if (res.data.data) {
        var result = {};
        for (const item of res.data.data) {
          result[item.id] = {
            name: item.name,
            type: item.type,
          };
        }
        nodeList = result;
      }
    });
    await axios({
      method: "get",
      url: servicePath.getLinkList,
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      console.log(res.data);
      linkList = res.data.data;
    });
    // console.log(nodeList, linkList);
    var data = {};
    data.nodes = nodeList;
    data.links = linkList;
    var config = {
      //鼠标mouseover后的弹窗
      content: null,
      contentHook: contentHook,
      //节点配色方案（可为空)
      nodeColor: null,
      //连接线配色方案（可为空）
      linkColor: null,
      width: document.getElementById("container").clientWidth,
      height: 600,
    };

    initKG(data, config, "#container");
  };

  useEffect(() => {
    // getData();
    render();
  }, []);
  return (
    <div className="row" style={{ marginTop: "10px", display: "flex" }}>
      <div className="col s12">
        <div className="card">
          <div
            id="container"
            className="card-image container"
            style={{ background: "aliceblue" }}
          >
            <span className="card-title" style={{ color: "#868181" }}>
              学科知识图谱推荐
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KgView;
