import express from "express";
import { dangKy, dangNhapBangGoogle, dangNhapBangSoDienThoai, danhSachNguoiDung, huyTheoDoi, theoDoi, xemTrangCaNhan } from "../controllers/nguoiDungController.js";

const router = express.Router();

router.post("/dangKy", dangKy);
router.post("/dangNhap", dangNhapBangSoDienThoai);
router.post("/dangNhapGG", dangNhapBangGoogle);
router.get("/danhSach",danhSachNguoiDung);
router.get("/xemTrangCaNhan/:id",xemTrangCaNhan);
router.post("/theoDoi", theoDoi);
router.post("/huyTheoDoi", huyTheoDoi);


export default router;
