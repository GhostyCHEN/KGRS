module.exports = (app) => {
  const { router, controller } = app;
  var adminauth = app.middleware.adminauth();

  router.post("/admin/checkLogin", controller.admin.main.checkLogin);
  router.get(
    "/admin/getArticleType",
    adminauth,
    controller.admin.main.getArticleType
  );
  router.post("/admin/addArticle", adminauth, controller.admin.main.addArticle);
  router.post(
    "/admin/updateArticle",
    adminauth,
    controller.admin.main.updateArticle
  );
  router.get(
    "/admin/getArticleList",
    adminauth,
    controller.admin.main.getArticleList
  );
  router.get(
    "/admin/delArticle/:id",
    adminauth,
    controller.admin.main.delArticle
  );
  router.get(
    "/admin/getArticleById/:id",
    adminauth,
    controller.admin.main.getArticleById
  );
  // 节点列表
  router.get(
    "/admin/getNodeList",
    adminauth,
    controller.admin.main.getNodeList
  );
  router.get(
    "/admin/delNodeList/:id",
    adminauth,
    controller.admin.main.delNodeList
  );
  router.post(
    "/admin/addNodeList",
    adminauth,
    controller.admin.main.addNodeList
  );
  router.post(
    "/admin/updateNodeList",
    adminauth,
    controller.admin.main.updateNodeList
  );
  // 节点关系列表
  router.get(
    "/admin/getLinkList",
    adminauth,
    controller.admin.main.getLinkList
  );
  router.get(
    "/admin/delLinkList/:id",
    adminauth,
    controller.admin.main.delLinkList
  );
  router.post(
    "/admin/addLinkList",
    adminauth,
    controller.admin.main.addLinkList
  );
  router.post(
    "/admin/updateLinkList",
    adminauth,
    controller.admin.main.updateLinkList
  );
};
