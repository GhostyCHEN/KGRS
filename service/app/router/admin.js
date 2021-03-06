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
};
