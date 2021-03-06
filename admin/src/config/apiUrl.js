let ipUrl = "http://127.0.0.1:7001/admin/";

let servicePath = {
  checkLogin: ipUrl + "checkLogin", //  检查用户名密码是否正确
  getArticleType: ipUrl + "getArticleType", // 获得类别信息
  addArticle: ipUrl + "addArticle", //  添加文章
  updateArticle: ipUrl + "updateArticle", //  修改文章
  getArticleList: ipUrl + "getArticleList", //  资源列表
  delArticle: ipUrl + "delArticle/", //  删除文章
  getArticleById: ipUrl + "getArticleById/", //  根据ID获得文章详情
};

export default servicePath;
