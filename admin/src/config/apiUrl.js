let ipUrl = "http://127.0.0.1:7001/admin/";

let servicePath = {
  checkLogin: ipUrl + "checkLogin", //  检查用户名密码是否正确
  getArticleType: ipUrl + "getArticleType", // 获得类别信息
  addArticle: ipUrl + "addArticle", //  添加文章
  updateArticle: ipUrl + "updateArticle", //  修改文章
  getArticleList: ipUrl + "getArticleList", //  资源列表
  delArticle: ipUrl + "delArticle/", //  删除文章
  getArticleById: ipUrl + "getArticleById/", //  根据ID获得文章详情
  getNodeList: ipUrl + "getNodeList", //获取节点列表
  delNodeList: ipUrl + "delNodeList/", //删除节点列表
  addNodeList: ipUrl + "addNodeList", //增加节点列表
  updateNodeList: ipUrl + "updateNodeList", // 更新节点
  getLinkList: ipUrl + "getLinkList", //获取关系列表
  delLinkList: ipUrl + "delLinkList/", //删除关系列表
  addLinkList: ipUrl + "addLinkList", //增加关系列表
  updateLinkList: ipUrl + "updateLinkList", //更新节点关系
};

export default servicePath;
