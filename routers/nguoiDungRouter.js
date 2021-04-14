import express from "express";
import { chinhSuaThongTin, dangKy, dangNhapBangGoogle, dangNhapBangSoDienThoai, danhSachNguoiDung, doiMatKhau, huyTheoDoi, theoDoi, xemTrangCaNhan } from "../controllers/nguoiDungController.js";

const router = express.Router();

router.post("/dangKy", dangKy);
router.post("/dangNhap", dangNhapBangSoDienThoai);
router.post("/dangNhapGG", dangNhapBangGoogle);
router.get("/danhSach",danhSachNguoiDung);
router.get("/xemTrangCaNhan/:id",xemTrangCaNhan);
router.post("/theoDoi", theoDoi);
router.post("/huyTheoDoi", huyTheoDoi);
router.post("/chinhSuaThongTin/:id",chinhSuaThongTin);
router.post("/doiMatKhau/:id",doiMatKhau)

export default router;
