import React, { useEffect, useState } from "react";
import axios from "axios";
import initKG from "../comm/kj";
import servicePath from "../config/apiUrl";
import "materialize-css/dist/css/materialize.css";
import "../static/css/KgView.css";

function KgView() {
  const [nodeList, setNodeList] = useState({});
  const [linkList, setLinkList] = useState([]);
  // const getData = () => {
  //   axios({
  //     method: "get",
  //     url: servicePath.getNodeList,
  //     withCredentials: true,
  //     headers: { "Access-Control-Allow-Origin": "*" },
  //   }).then((res) => {
  //     if (res.data.data) {
  //       var result = {};
  //       for (const item of res.data.data) {
  //         result[item.id] = {
  //           name: item.name,
  //           type: item.type,
  //         };
  //       }
  //       setNodeList(result);
  //     }
  //   });
  //   axios({
  //     method: "get",
  //     url: servicePath.getLinkList,
  //     withCredentials: true,
  //     headers: { "Access-Control-Allow-Origin": "*" },
  //   }).then((res) => {
  //     setLinkList(res.data.data);
  //   });
  // };

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
      linkList = res.data.data;
    });
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
