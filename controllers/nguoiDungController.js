import NguoiDung from "../models/nguoiDung.js";
import BaiViet from "../models/baiViet.js";

export async function dangKy(req, res) {
  const nguoiDungMoi = new NguoiDung(req.body);
  try {
    if (await NguoiDung.findOne({ soDienThoai: req.body.soDienThoai })) {
      res.send({
        thongBao: "Số điện thoại này đã được đăng ký",
      });
    } else {
      await nguoiDungMoi.save();
      res.send({
        thongBao: `Đăng ký thành công với số điện thoại ${req.body.soDienThoai}`,
      });
      const thongBaoMoi = new ThongBao({
        idNguoiDung: nguoiDungMoi._id,
        idTruyXuat: nguoiDungMoi._id,
        loaiThongBao: "NguoiDung",
        noiDung: "Chào mừng bạn đến với mạng xã hội Safaco",
      });
      thongBaoMoi.save();
      console.log(`Đăng ký thành công ! \nChi tiết : ${nguoiDungMoi}`);
    }
  } catch (err) {
    console.log(err);
    throw new Error(`Lỗi đăng ký ! \nChi tiết lỗi : ${err}`);
  }
}

export async function dangNhapBangSoDienThoai(req, res) {
  const { soDienThoai, matKhau } = req.body;
  try {
    const nguoiDung = await NguoiDung.findOne({ soDienThoai: soDienThoai });
    if (nguoiDung) {
      if (matKhau == nguoiDung.matKhau) {
        res.send({
          thongBao: "Đăng nhập thành công !",
          nguoiDung: nguoiDung,
        });
      } else if (matKhau != nguoiDung.matKhau) {
        res.send({
          thongBao: "Sai mật khẩu !",
        });
      }
    } else {
      res.send({
        thongBao: "Tài khoản không tồn tại !",
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error(`Đăng nhập thất bại ! \nChi tiết lỗi : ${err}`);
  }
}
export async function dangNhapBangGoogle(req, res) {
  const email = req.body.email;
  const nguoiDungMoi = new NguoiDung(req.body);
  try {
    const nguoiDung = await NguoiDung.findOne({ email: email });
    if (nguoiDung) {
      res.send({
        thongBao: "Email này đã được liên kết !",
        nguoiDung: nguoiDung,
      });
    } else {
      nguoiDungMoi.save();
      res.send({
        thongBao: "Email này chưa được liên kết !",
        nguoiDung: nguoiDungMoi,
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error(`Đăng nhập Google thất bại ! \nChi tiết lỗi : ${err}`);
  }
}
export async function danhSachNguoiDung(req, res) {
  await NguoiDung.find()
    .then((list) => {
      if (list) {
        res.send({ danhSachNguoiDung: list });
      } else {
        res.send({ thongBao: "Danh sách người dùng trống !" });
      }
    })
    .catch((err) => {
      console.log(err);
      throw new Error(`Lỗi lấy danh sách người dùng !\nChi tiết lỗi ${err}`);
    });
}
export async function xemTrangCaNhan(req, res) {
  try {
    const nguoiDung = await NguoiDung.findById(req.params.id);
    if (nguoiDung) {
      const danhSachBaiViet = await BaiViet.find({
        idNguoiDung: req.params.id,
        daAn: false,
        daXoa: false,
      }).populate("idNguoiDung luotThich");
      res.send({
        nguoiDung: nguoiDung,
        danhSachBaiViet: danhSachBaiViet,
      });
    } else {
      res.send({ thongBao: "Không tìm thấy người dùng" });
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Lỗi xem trang cá nhân !\nChi tiết lỗi ${error}`);
  }
}
export async function theoDoi(req, res) {
  try {
    const nguoiTheoDoi = await NguoiDung.findById(req.body.idNguoiTheoDoi);
    const nguoiDuocTheoDoi = await NguoiDung.findById(
      req.body.idNguoiDuocTheoDoi
    );
    if (nguoiTheoDoi) {
      console.log(`Người theo dõi :${nguoiTheoDoi.hoTen}`);
      if (nguoiDuocTheoDoi) {
        console.log(`Người theo dõi :${nguoiDuocTheoDoi.hoTen}`);
        await NguoiDung.updateOne(
          { _id: nguoiTheoDoi._id },
          { $push: { dangTheoDoi: nguoiDuocTheoDoi } }
        );
        await NguoiDung.updateOne(
          { _id: nguoiDuocTheoDoi._id },
          { $push: { duocTheoDoi: nguoiTheoDoi } }
        );
        res.send({ thongBao: `Theo dõi thành công ${nguoiDuocTheoDoi.hoTen}` });
      } else {
        console.log("Không tìm thấy người được theo dõi");
        res.send({ thongBao: "Không tìm thấy người được theo dõi" });
      }
    } else {
      console.log("Không tìm thấy người theo dõi");
      res.send({ thongBao: "Không tìm thấy người theo dõi" });
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Theo dõi thất bại !\nChi tiết lỗi ${error}`);
  }
}
export async function huyTheoDoi(req, res) {
  try {
    const nguoiTheoDoi = await NguoiDung.findById(req.body.idNguoiTheoDoi);
    const nguoiDuocTheoDoi = await NguoiDung.findById(
      req.body.idNguoiDuocTheoDoi
    );
    if (nguoiTheoDoi) {
      console.log(`Người theo dõi :${nguoiTheoDoi.dangTheoDoi}`);
      if (nguoiDuocTheoDoi) {
        console.log(`Người theo dõi :${nguoiDuocTheoDoi.hoTen}`);
        await NguoiDung.updateOne(
          { _id: nguoiTheoDoi._id },
          { $pull: { dangTheoDoi: nguoiDuocTheoDoi._id } }
        );
        await NguoiDung.updateOne(
          { _id: nguoiDuocTheoDoi._id },
          { $pull: { duocTheoDoi: nguoiTheoDoi._id } }
        );
        res.send({
          thongBao: `Hủy theo dõi thành công ${nguoiDuocTheoDoi.hoTen}`,
        });
      } else {
        console.log("Không tìm thấy người được theo dõi");
        res.send({ thongBao: "Không tìm thấy người được theo dõi" });
      }
    } else {
      console.log("Không tìm thấy người theo dõi");
      res.send({ thongBao: "Không tìm thấy người theo dõi" });
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Hủy theo dõi thất bại !\nChi tiết lỗi ${error}`);
  }
}
export async function chinhSuaThongTin(req, res) {
  try {
    const nguoiDung = await NguoiDung.findById(req.params.id);
    if (!nguoiDung) {
      res.send({
        thongBao: "Người dùng không tồn tại !",
      });
    } else {
      const capNhat = {
        $set: {
          hoTen: req.body.hoTen,
          tieuSu: req.body.tieuSu,
          ngaySinh: req.body.ngaySinh,
          gioiTinh: req.body.gioiTinh,
          diaChi: req.body.diaChi,
        },
      };
      await NguoiDung.updateOne({ _id: req.params.id }, capNhat);
      res.send({
        thongBao: "Cập nhật người dùng thành công !",
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Cập nhật người dùng thất bại ! \nChi tiết lỗi : ${error}`);
  }
}

export async function doiMatKhau(req, res) {
  try {
    const matKhauCu = req.body.matKhauCu;
    const matKhauMoi = req.body.matKhauMoi;
    const nguoiDung = await NguoiDung.findById(req.params.id);
    if (!nguoiDung) {
      res.send({
        thongBao: "Người dùng không tồn tại !",
      });
    } else {
      if(matKhauCu === nguoiDung.matKhau){
        await NguoiDung.updateOne(
          { _id: req.params.id },
          {
            $set: {
              matKhau: matKhauMoi,
            },
          }
        );
        res.send({
          thongBao: "Đổi mật khẩu thành công !",
        });
      }else{
        res.send({
          thongBao: "Mật khẩu cũ không trùng khớp !",
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Đổi mật khẩu thất bại ! \nChi tiết lỗi : ${error}`);
  }
}
