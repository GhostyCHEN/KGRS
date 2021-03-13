module.exports = (app) => {
  const { router, controller } = app;
  // router.get("/default/index", controller.default.home.index);
  router.get("/default/getArticleList", controller.default.home.getArticleList);
  router.get(
    "/default/getArticleById/:id",
    controller.default.home.getArticleById
  );
  router.get("/default/getNodeList", controller.default.home.getNodeList);
  router.get("/default/getLinkList", controller.default.home.getLinkList);
};
