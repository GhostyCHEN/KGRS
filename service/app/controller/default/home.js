"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  // async index() {
  //   // this.ctx.body = "api接口";
  //   let result = await this.app.mysql.get("article", {});

  //   this.ctx.body = result;
  // }

  async getArticleList() {
    let sql =
      "SELECT article.id as id, " +
      "article.title as title, " +
      // "article.type as type, " +
      "article.introduce as introduce, " +
      // "article.content as content, " +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime " +
      "from article";
    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }

  async getArticleById() {
    let id = this.ctx.params.id;
    let sql =
      "SELECT article.id as id, " +
      "article.title as title, " +
      "article.content as content " +
      "from article " +
      "where article.id=" +
      id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
