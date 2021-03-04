import React from "react";
import { useEffect } from 'react';
import Head from "next/head";
import * as d3 from "d3";
import  $ from 'jquery'
import Header from "../components/Header";
import Footer from "../components/Footer";
import  initKG from '../static/func/kj'
import "materialize-css/dist/css/materialize.css";
import "../static/style/pages/kjview.css";



const KgView = () => {
  const t1 = '{' +
    '"1": {"name": "数据结构","type": "学科"},\n' +
    '"2": { "name": "二叉树", "type": "知识点"},\n' +
    '"3": {"name": "链表","type": "知识点"},\n' +
    '"4": {"name": "平衡二叉树","type": "知识点"},\n' +
    '"5": {"name": "二叉树的结构讲解","url": "www.mooc.com/15.html",\n' +
    '"type": "视频资源"},\n' +
    '"6": {"name": "链表的反转",\n' +
    '"url": "www.mooc.com/1.ppt",\n' +
    '"type": "ppt资源"\n' +
    '},\n' +
    '"7": {"name": "闲节点","type": "闲"},\n' +
    '"8": {"name": "闲节点2","type": "闲"},\n' +
    '"9": {"name": "闲节点3","type": "闲"},\n' +
    '"10": {"name": "芳芳老师","type": "老师"},\n' +
    '"11": {"name": "月老师","type": "老师"}\n' +
    "}";
  const t2 = "[\n" +
    '{ "source": 1, "target": 2, "rela": "包含", "type": "包含关系" },\n' +
    '{ "source": 1, "target": 3, "rela": "包含", "type": "包含关系" },\n' +
    '{ "source": 1, "target": 4, "rela": "包含", "type": "包含关系" },\n' +
    '{ "source": 2, "target": 5, "rela": "视频课程", "type": "资源" },\n' +
    '{ "source": 3, "target": 6, "rela": "ppt教程", "type": "资源" },\n' +
    '{ "source": 3, "target": 7, "rela": "没关系" },\n' +
    '{ "source": 8, "target": 9, "rela": "没关系" },\n' +
    '{ "source": 10, "target": 5, "rela": "授课", "type": "行为" },\n' +
    '{ "source": 11, "target": 6, "rela": "授课", "type": "行为" }\n' +
    "]";
  
  const render = () => {
    
      
      var data = {}
      data.nodes = JSON.parse(t1);
      data.links = JSON.parse(t2);
      var config = {
          //鼠标mouseover后的弹窗
          content:null,
          contentHook: null,
          //节点配色方案（可为空)
          nodeColor: null,
          //连接线配色方案（可为空）
          linkColor: null,
          width: document.getElementById("container").clientWidth,
          height: 600
      }
      
      initKG(data, config, "#container")
  
  }
  
  useEffect(() => {
    render();
  }, []);

  return (
    <div>
      <Head>
        <title>可视化图谱</title>
      </Head>
      <Header />
      <div className="row" style={{marginTop:'10px',display:'flex'}}>
        <ul className="collapsible" style={{ marginLeft:"4rem",width:"20rem"}}>
          <li className="active">
            <div class="collapsible-header">数据结构</div>
          </li>
          <li className="active">
            <div class="collapsible-header">计算机网络</div>
          </li>
          <li className="active">
            <div class="collapsible-header">计算机组成原理</div>
          </li>
        </ul>
        <div className="col s12">
          <div className="card" >
            <div id="container" className="card-image container" style={{background:"aliceblue"}}>
              <span className="card-title" style={{ color: "#868181" }}>
                学科知识图谱推荐
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default KgView;
