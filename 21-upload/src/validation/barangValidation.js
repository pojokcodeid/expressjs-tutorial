import validator from "validator";

const sanitization = (data) => {
  return {
    nama_barang: validator.escape(validator.trim(data.nama_barang)),
    jumlah: validator.escape(validator.trim(data.jumlah)),
    harga_satuan: validator.escape(validator.trim(data.harga_satuan)),
    expire_date: validator.escape(validator.trim(data.kadaluarsa)),
  };
};

const barangValid = (dt) => {
  let message = [];
  let data = sanitization(dt);
  if (validator.isEmpty(data.nama_barang)) {
    message.push("Nama barang tidak boleh kosong");
  }
  if (validator.isEmpty(data.jumlah)) {
    message.push("Jumlah tidak boleh kosong");
  }
  if (validator.isEmpty(data.harga_satuan)) {
    message.push("Harga satuan tidak boleh kosong");
  }

  return { message, data };
};

export default barangValid;
