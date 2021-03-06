import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  DatePicker,
  message,
  Affix,
} from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([1]); // 文章类别信息
  const [selectedType, setSelectType] = useState("请选择类型"); //选择的文章类别

  useEffect(() => {
    getArticleType();
    //获得文章ID
    // let tmpId = props.match.params.id;
    // if (tmpId) {
    //   setArticleId(tmpId);
    //   getArticleById(tmpId);
    // }
  }, []);

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const getArticleType = () => {
    axios({
      method: "get",
      url: servicePath.getArticleType,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
      if (res.data.data == "没有登录") {
        localStorage.removeItem("openId");
        props.history.push("/");
      } else {
        let processed = unique(res.data.data);
        setTypeInfo(processed);
      }
    });
  };

  const selectTypeHandler = (value) => {
    setSelectType(value);
  };

  const saveArticle = () => {
    if (selectedType == "请选择类型") {
      message.error("必须选择资源类别");
      return false;
    } else if (!articleTitle) {
      message.error("资源标题不能为空");
      return false;
    } else if (!articleContent) {
      message.error("资源内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }
    let dataProps = {}; //传递到接口的参数
    dataProps.type = selectedType;
    dataProps.title = articleTitle;
    dataProps.content = articleContent;
    dataProps.introduce = introducemd;
    let datetext = showDate.replace("-", "/"); //把字符串转换成时间戳
    dataProps.addTime = new Date(datetext).getTime() / 1000;

    if (articleId == 0) {
      axios({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isScuccess) {
          message.success("资源保存成功");
        } else {
          message.error("资源保存失败");
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: "post",
        url: servicePath.updateArticle,
        header: { "Access-Control-Allow-Origin": "*" },
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isScuccess) {
          message.success("资源更新成功");
        } else {
          message.error("保存失败");
        }
      });
    }
  };

  const unique = (arr) => {
    let unique = {};
    arr.forEach(function (item) {
      unique[JSON.stringify(item)] = item; //键名不会重复
    });
    arr = Object.keys(unique).map(function (u) {
      //Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
      return JSON.parse(u);
    });
    return arr;
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="资源标题"
                size="large"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                value={selectedType}
                size="large"
                onChange={selectTypeHandler}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.type}>
                      {item.type}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                onChange={changeContent}
                onPressEnter={changeContent}
                className="markdown-content"
                rows={35}
                placeholder="资源内容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Affix offsetTop={20}>
            <Row>
              <Col span={24}>
                <Button size="large">暂存内容</Button>&nbsp;
                <Button type="primary" size="large" onClick={saveArticle}>
                  发布资源
                </Button>
                <br />
              </Col>
              <Col span={24}>
                <br />
                <TextArea
                  rows={4}
                  value={introducemd}
                  onChange={changeIntroduce}
                  onPressEnter={changeIntroduce}
                  placeholder="资源内容简介"
                />
              </Col>
              <Col span={12}>
                <div className="date-select">
                  <DatePicker
                    onChange={(date, dateString) => setShowDate(dateString)}
                    placeholder="发布日期"
                    size="large"
                  />
                </div>
              </Col>
            </Row>
          </Affix>
        </Col>
      </Row>
    </div>
  );
}
export default AddArticle;
