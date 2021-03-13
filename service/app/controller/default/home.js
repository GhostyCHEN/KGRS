"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
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

  //获取节点列表
  async getNodeList() {
    let sql =
      "select node.id as id, " +
      "node.name as name, " +
      "node.url as url, " +
      "node.type as type " +
      "from node";
    const nodeList = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: nodeList,
    };
  }

  // 获取关系列表
  async getLinkList() {
    let sql =
      "select link.source as source, " +
      "link.id as id, " +
      "link.target as target,  " +
      "link.rela as rela " +
      "from link";
    const linkList = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: linkList,
    };
  }
}

module.exports = HomeController;
