const userRouter = require("./user");
const tintucRouter = require("./tintuc");
const duanthuchhienRouter = require("./duanthuchien");
const sanphamRouter = require("./sanpham");
const loaisanphamRouter = require("./loaisanpham");
const khachhangRouter = require("./khachhang");
const nhaphanphoiRouter = require("./nhaphanphoi");
const taikhoanRouter = require("./taikhoan");
const loaitaikhoanRouter = require("./loaitaikhoan");
const cartRouter = require("./cart");
const hoadonbanRouter = require("./hoadonban");
const hoadonnhapRouter = require("./hoadonnhap");
const chitiethoadonbanRouter = require("./chitiethoadonban");
const chitiethoadonnhapRouter = require("./chitiethoadonnhap");

const routes = (app) => {
  app.use("/users", userRouter);
  app.use("/tintucs", tintucRouter);
  app.use("/duanthuchiens", duanthuchhienRouter);
  app.use("/sanphams", sanphamRouter);
  app.use("/loaisanphams", loaisanphamRouter);
  app.use("/khachhangs", khachhangRouter);
  app.use("/nhaphanphois", nhaphanphoiRouter);
  app.use("/taikhoans", taikhoanRouter);
  app.use("/loaitaikhoans", loaitaikhoanRouter);
  app.use("/carts", cartRouter);
  app.use("/hoadonbans", hoadonbanRouter);
  app.use("/hoadonnhaps", hoadonnhapRouter);
  app.use("/chitiethoadonbans", chitiethoadonbanRouter);
  app.use("/chitiethoadonnhaps", chitiethoadonnhapRouter);
};

module.exports = routes;
