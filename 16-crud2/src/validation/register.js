import validator from "validator";

const sanitization = (data) => {
  return {
    nama: validator.escape(validator.trim(data.nama)),
    email: validator.escape(validator.trim(data.email)),
    password: validator.trim(data.password),
  };
};

const regValid = (dt) => {
  let messsage = [];
  let data = sanitization(dt);
  if (validator.isEmpty(data.nama)) {
    messsage.push("Nama tidak boleh kosong");
  }
  if (validator.isEmpty(data.email)) {
    messsage.push("Email tidak boleh kosong");
  }
  if (!validator.isEmail(data.email)) {
    messsage.push("Email tidak valid");
  }
  if (validator.isEmpty(data.password)) {
    messsage.push("Password tidak boleh kosong");
  }
  if (!validator.isStrongPassword(data.password)) {
    messsage.push(
      "Password harus terdiri dari 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 simbol"
    );
  }
  return { messsage, data };
};

export default regValid;
