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
import axios from "axios";



const KgView = (props) => {
  
  const render = () => {
    
    var contentHook = function (item) {
      if (item.url) {
        window.open(
          item.url,
          "_blank",
          "scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes"
        );
      }
    }
    var data = {
      nodes: props.node,
      links: props.link
    }
    var config = {
      content:null,
      contentHook: contentHook,
      nodeColor: null,
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
      <div className="row" style={{ marginTop: '10px', display: 'flex' }}>
        <div className="col s12">
          <div className="card" >
            <div id="container" className="card-image container" style={{background:"aliceblue"}}>
              <span className="card-title" style={{ color: "#868181" }}>
                学习知识图谱推荐
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

//获取节点
const Node = async () => {
  return new Promise(resolve => {
    axios("http://127.0.0.1:7001/default/getNodeList").then(
      res => {
        var result = {};
        if (res.data.data) {
          for (const item of res.data.data) {
            result[item.id] = {
              name: item.name,
              type: item.type,
              url: item.url
            };
          }
         resolve(result)
        } else {
          resolve(result)
        }
      }
    )
  })
}
//获取关系
const Link = async () => {
  return new Promise(resolve => {
    axios("http://127.0.0.1:7001/default/getLinkList").then(
      res => {
        resolve(res.data.data)
      }
    )
  })
}


KgView.getInitialProps = async () => {
  const node = await Node()
  const link = await Link()
  return {node,link}
}

export default KgView;
