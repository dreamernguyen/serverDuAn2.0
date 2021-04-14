import express from "express";
import {
  themMatHang,
  xoaMatHang,
  chinhSuaMatHang,
  danhSachMatHang,
  matHangChiTiet,
  timKiemHangMuc,
  danhSachToiBan,
  timKiemTieuDe,
  timKiem,
  quanTam,
  boQuanTam,
  danhSachQuanTam,
} from '../controllers/matHangController.js';

const router = express.Router();

router.post('/dangMatHang/:id', themMatHang);
router.post('/xoa/:id', xoaMatHang);
router.post('/chinhSua/:id', chinhSuaMatHang);
router.get('/danhSach', danhSachMatHang);
router.post('/chiTiet/:id', matHangChiTiet);
router.post('/timKiemHangMuc/:tuKhoa', timKiemHangMuc);
router.get('/danhSachToiBan/:id', danhSachToiBan)
router.post('/timKiemTieuDe/:tieuDe', timKiemTieuDe);
router.post('/timKiem', timKiem);
router.post("/quanTam",quanTam );
router.post("/boQuanTam", boQuanTam);
router.get("/danhSachQuanTam/:id",danhSachQuanTam)
export default router;
