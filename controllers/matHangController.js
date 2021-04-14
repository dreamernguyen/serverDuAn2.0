import MatHang from "../models/matHang.js";
import NguoiDung from "../models/nguoiDung.js";
import ThongBao from "../models/thongBao.js";
export async function themMatHang(req, res) {
  try {
    const matHang = new MatHang({
      tieuDe: req.body.tieuDe,
      giaBan: req.body.giaBan,
      hangMuc: req.body.hangMuc,
      diaChi: req.body.diaChi,
      moTa: req.body.moTa,
      linkAnh: req.body.linkAnh,
      idNguoiDung: req.params.id,
    });
    const nguoiDung = await NguoiDung.findById(req.params.id);
    if (nguoiDung) {
      try {
        await matHang.save();
        res.send({
          thongBao: "Đã đăng hàng thành công",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.send({
        thongBao: "Không tìm thấy người dùng",
      });
      console.log("Không tìm thấy người dùng");
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Lỗi thêm mặt hàng ! \nChi tiết lỗi : ${error}`);
  }
}
export async function xoaMatHang(req, res) {
  try {
    const matHang = await MatHang.findById(req.params.id);
    if (matHang) {
      await MatHang.updateOne(
        { _id: req.params.id },
        {
          $set: {
            daXoa: true,
          },
        }
      );
      res.send({
        thongBao: `Xóa mặt hàng thành công !`,
      });
    } else {
      res.send({ thongBao: "Không tìm thấy mặt hàng !" });
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Lỗi xóa mặt hàng \nChi tiết lỗi : ${error}`);
  }
}
export async function chinhSuaMatHang(req, res) {
  try {
    const matHang = await MatHang.findById(req.params.id);
    if (!matHang) {
      res.send({
        thongBao: "Mặt hàng không tồn tại",
      });
    } else {
      const matHang2 = {
        $set: {
          hangMuc: req.body.hangMuc,
          moTa: req.body.moTa,
          giaBan: req.body.giaBan,
          tieuDe: req.body.tieuDe,
          linkAnh: req.body.linkAnh,
        },
      };
      await MatHang.updateOne({ _id: req.params.id }, matHang2);
      res.send({
        thongBao: "Cập nhật mặt hàng thành công",
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Lỗi cập nhật mặt hàng ! \nChi tiết lỗi : ${error}`);
  }
}
export async function danhSachMatHang(req, res) {
  try {
    await MatHang.find({ duyetMatHang: true, daXoa: false })
      .populate("idNguoiDung nguoiQuanTam")
      .then((danhSachMatHang) => {
        res.send({
          danhSachMatHang: danhSachMatHang,
        });
        console.log(danhSachMatHang);
      });
  } catch (error) {
    console.log(error);
    throw new Error(`Lỗi load danh sách mặt hàng ! \nChi tiết lỗi : ${error}`);
  }

}
export async function matHangChiTiet(req, res) {
  try {
    const matHang = await MatHang.findById(req.params.id).populate(
      "idNguoiDung nguoiQuanTam"
    );
    if (!matHang) {
      res.send({
        thongBao: "Mặt hàng không tồn tại",
      });
    } else {
      res.send({
        matHang: matHang,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Lỗi load mặt hàng chi tiết! \nChi tiết lỗi : ${error}`);
  }
}
export async function timKiemHangMuc(req, res) {
  try {
    const hangMuc = req.params.tuKhoa;
    await MatHang.find({ hangMuc: hangMuc }).then((result) => {
      if (result.length <= 0) {
        res.send({
          thongBao: `Không tìm thấy kết quả tìm kiếm với mặt hàng ${hangMuc}`,
        });
      } else {
        res.send({
          thongBao: `Kết quả tìm kiếm của mặt hàng ${hangMuc}`,
          danhSachMatHang: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error(`Lỗi tìm kiếm ! \nChi tiết lỗi : ${error}`);
  }
}
export async function danhSachToiBan(req, res) {
  try {
    const danhSachMatHang = await MatHang.find({
      idNguoiDung: req.params.id,
    }).populate("idNguoiDung");
    res.send({
      danhSachMatHang: danhSachMatHang,
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Lỗi load danh sách ! \nChi tiết lỗi : ${error}`);
  }
}
export async function timKiemTieuDe(req, res) {
  try {
    const tieuDe = req.params.tieuDe;
    await MatHang.find({ tieuDe: { $regex: tieuDe, $options: "i" } }).then(
      (result) => {
        res.send({
          thongBao: `Kết quả tìm kiếm với từ khóa ${tieuDe}`,
          danhSachMatHang: result,
        });
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error(`Lỗi load danh sách ! \nChi tiết lỗi : ${error}`);
  }
}

export async function timKiem(req, res) {
  try {
    const hangMuc = req.body.hangMuc;
    const tieuDe = req.body.tieuDe;
    const diaChi = req.body.diaChi;
    const sapXepGiaBan = req.body.sapXepGiaBan;
    const sapXepThoiGian = req.body.sapXepThoiGian;

    console.log(hangMuc);
    console.log(tieuDe);
    console.log(diaChi);
    console.log(`sapXepGiaBan : ${sapXepGiaBan}`);
    console.log(`sapXepThoiGian : ${sapXepThoiGian}`);

    await MatHang.find({
      daXoa: false,
      // daDuyet:false,
      hangMuc: { $regex: hangMuc, $options: "i" },
      tieuDe: { $regex: tieuDe, $options: "i" },
      diaChi: { $regex: diaChi, $options: "i" },
    })
      .sort({ thoiGianTao: sapXepThoiGian })
      .populate("idNguoiDung")
      .then((result) => {
        if (sapXepGiaBan == 1) {
          result.sort(function name(a, b) {
            return a.giaBan - b.giaBan;
          });
        } else if (sapXepGiaBan == -1) {
          result.sort(function name(a, b) {
            return b.giaBan - a.giaBan;
          });
        }
        res.send({
          thongBao: `Kết quả tìm kiếm với hạng mục : ${hangMuc}, tiêu đề : ${tieuDe}, địa chỉ : ${diaChi} , sapXepGiaBan : ${sapXepGiaBan},sapXepThoiGian : ${sapXepThoiGian}`,
          danhSachMatHang: result,
        });
      });
  } catch (error) {
    console.log(error);
    throw new Error(`Lỗi load danh sách ! \nChi tiết lỗi : ${error}`);
  }
}

export async function quanTam(req, res) {
  try {
    const nguoiDung = await NguoiDung.findById(req.body.idNguoiDung);
    const matHang = await MatHang.findById(req.body.idMatHang);
    if (matHang) {
      if (nguoiDung) {
        await MatHang.updateOne(
          { _id: matHang._id },
          { $push: { nguoiQuanTam: nguoiDung } }
        )
          .exec()
          .then((bv) => {
            res.send({
              thongBao: `Quan tâm mặt hàng thành công !`,
            });
              const thongBaoMoi = new ThongBao({
                idNguoiDung: matHang.idNguoiDung,
                idTruyXuat: matHang._id,
                loaiThongBao: "MatHang",
                noiDung: `${nguoiDung.hoTen} quan tâm đến mặt hàng của bạn`,
              });
              thongBaoMoi.save();
            
          });
      } else {
        console.log("Không tìm thấy người dùng");
        res.send({ thongBao: "Không tìm thấy người dùng" });
      }
    } else {
      console.log("Không tìm thấy mặt hàng");
      res.send({ thongBao: "Không tìm thấy mặt hàng" });
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Quan tâm mặt hàng thất bại ! \nChi tiết lỗi : ${error}`);
  }
}
export async function danhSachQuanTam(req, res) {
  try {
    const nguoiDung = await NguoiDung.findById(req.params.id);
    console.log(req.params.id);
    if (nguoiDung) {
      const rs = await MatHang.find({
        nguoiQuanTam: { $all: nguoiDung._id },
        // daDuyet: true,
        // daXoa: false,
      }).populate("idNguoiDung nguoiQuanTam");
      console.log(rs);
      if (rs.length > 0) {
        res.send({ danhSachMatHang: rs });

      } else {
        res.send({
          thongBao: `Chưa quan tâm đến mặt hàng nào `,
          danhSachMatHang: [],
        });
      }
    } else {
      console.log("Không tìm thấy người dùng");
      res.send({ thongBao: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Lỗi lấy mặt hàng quan tâm ! \nChi tiết lỗi : ${error}`);
  }
}
export async function boQuanTam(req, res) {
  try {
    const nguoiDung = await NguoiDung.findById(req.body.idNguoiDung);
    const matHang = await MatHang.findById(req.body.idMatHang);
    if (matHang) {
      if (nguoiDung) {
        await MatHang.updateOne(
          { _id: matHang._id },
          { $pull: { nguoiQuanTam: nguoiDung._id } }
        )
          .exec()
          .then((bv) => {
            res.send({
              thongBao: `Bỏ quan tâm mặt hàng thành công`,
            });
          });
      } else {
        console.log("Không tìm thấy người dùng");
        res.send({ thongBao: "Không tìm thấy người dùng" });
      }
    } else {
      console.log("Không tìm thấy mặt hàng");
      res.send({ thongBao: "Không tìm thấy mặt hàng" });
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Bỏ quan tâm mặt hàng thất bại ! \nChi tiết lỗi : ${error}`);
  }
}
