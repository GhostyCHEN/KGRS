"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  //判断用户名密码是否正确
  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let password = this.ctx.request.body.password;

    const sql =
      " SELECT userName FROM user WHERE userName = '" +
      userName +
      "' AND password = '" +
      password +
      "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      //登录成功,进行session缓存
      let openId = new Date().getTime();
      this.ctx.session.openId = { openId: openId };
      this.ctx.body = { data: "登录成功", openId: openId };
    } else {
      this.ctx.body = { data: "登录失败" };
    }
  }

  async getArticleType() {
    const resType = await this.app.mysql.select("article", {
      columns: ["type"],
    });
    this.ctx.body = { data: resType };
  }

  //添加文章
  async addArticle() {
    let tmpArticle = this.ctx.request.body;
    // tmpArticle.
    const result = await this.app.mysql.insert("article", tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId: insertId,
    };
  }

  //修改文章
  async updateArticle() {
    let tmpArticle = this.ctx.request.body;

    const result = await this.app.mysql.update("article", tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    console.log(updateSuccess);
    this.ctx.body = {
      isScuccess: updateSuccess,
    };
  }

  // 获取资源列表
  async getArticleList() {
    let sql =
      "SELECT article.id as id, " +
      "article.title as title, " +
      "article.type as type, " +
      "article.introduce as introduce, " +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime " +
      "from article";
    const list = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: list,
    };
  }

  //删除资源
  async delArticle() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete("article", { id: id });
    this.ctx.body = { data: res };
  }

  //修改资源
  async getArticleById() {
    let id = this.ctx.params.id;

    let sql =
      "SELECT article.id as id, " +
      "article.title as title, " +
      "article.type as type, " +
      "article.content as content, " +
      "article.introduce as introduce, " +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime, " +
      "article.addTime as defaultTime " +
      "from article " +
      "WHERE article.id=" +
      id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
