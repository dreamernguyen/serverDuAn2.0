import mongoose from "mongoose";

const nguoiDungSchema = mongoose.Schema(
  {
    soDienThoai: { type: Number, trim: true },
    hoTen: { type: String, required: true, trim: true },
    matKhau: { type: String, trim: true },
    email: { type: String, trim: true },
    diaChi: { type: String },
    avatar: { type: String },
    tieuSu: { type: String },
    ngaySinh: { type: String },
    gioiTinh: { type: Boolean },
    dangTheoDoi: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NguoiDung",
      },
    ],
    duocTheoDoi: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NguoiDung",
      },
    ],
    baoCao: { type: Number },
  },
  {
    timestamps: {
      createdAt: "thoiGianTao",
      updatedAt: "thoiGianCapNhat",
    },
  }
);

const NguoiDung = mongoose.model("NguoiDung", nguoiDungSchema, "nguoiDung");

export default NguoiDung;
