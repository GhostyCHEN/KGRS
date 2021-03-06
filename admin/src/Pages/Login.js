import React, { useState, useEffect, createContext } from "react";
import { Card, Input, Button, Spin, message } from "antd";
import { Icon } from "@ant-design/compatible";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/css/Login.css";

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);
  const checkLogin = () => {
    setIsLoading(true);

    if (!userName) {
      message.error("用户名不能为空");
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    } else if (!password) {
      message.error("密码不能为空");
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    }
    let dataProps = {
      userName: userName,
      password: password,
    };
    axios({
      method: "post",
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      setIsLoading(false);
      if (res.data.data == "登录成功") {
        localStorage.setItem("openId", res.data.openId);
        props.history.push("/index");
      } else {
        message.error("用户名密码错误");
      }
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card
          title="计算机教学资源管理后台"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userName"
            size="large"
            placeholder="请输入用户名"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="请输入密码"
            prefix={<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            {" "}
            登陆{" "}
          </Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
