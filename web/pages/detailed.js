import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Row, Col, Affix } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import servicePath from "../config/apiUrl";
import marked from "marked";
import hljs from "highlight.js";
import Tocify from "../components/tocify.tsx";
import "highlight.js/styles/monokai-sublime.css";
import "../static/style/pages/detailed.css";

const Detailed = (props) => {
  const tocify = new Tocify();

  const renderer = new marked.Renderer();

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  let html = marked(props.content);

  return (
    <div>
      <Head>
        <title>文章详情</title>
      </Head>
      <Header />
      <div className="">
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <div className="detailed-title">{props.title}</div>
            <div
              className="detailed-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Affix offsetTop={60}>
              <div className="detailed-nav comm-box">
                <div className="nav-title">文章目录</div>
                <div className="toc-list">{tocify && tocify.render()}</div>
              </div>
            </Affix>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

Detailed.getInitialProps = async (context) => {
  let id = context.query.id;
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then((res) => {
      resolve(res.data.data[0]);
    });
  });

  return await promise;
};

export default Detailed;
