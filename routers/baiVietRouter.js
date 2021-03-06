import express from "express";
import {
  dangBai,
  danhSachBaiViet,
  xoaBaiViet,
  anBaiViet,
  huyAnBaiViet,
  danhSachDangTheoDoi,
  chiTietBaiViet,
  chinhSuaBaiViet,
  thichBaiViet,
  boThichBaiViet,
  danhSachBaiVietYeuThich,
  anKhoiToi,
  baoCaoBaiViet,
} from "../controllers/baiVietController.js";

const router = express.Router();

router.get("/danhSach", danhSachBaiViet);
router.get("/chiTiet/:id", chiTietBaiViet);
router.post("/dangBai/:id", dangBai);
router.post("/capNhat/:id", chinhSuaBaiViet);
router.post("/xoa/:id", xoaBaiViet);
router.post("/an/:id", anBaiViet);
router.post("/anKhoiToi", anKhoiToi);
router.post("/baoCao", baoCaoBaiViet);
router.get("/dangTheoDoi/:id",danhSachDangTheoDoi);
router.post("/thich",thichBaiViet );
router.post("/boThich", boThichBaiViet);
router.get("/danhSachYeuThich/:id",danhSachBaiVietYeuThich)
router.post("/huyAn/:id", huyAnBaiViet);

export default router;
