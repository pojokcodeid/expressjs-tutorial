import validator from "validator";

const sanitization = (data) => {
  return {
    email: validator.escape(validator.trim(data.email)),
    password: validator.trim(data.password),
  };
};

const loginValid = (dt) => {
  let messsage = [];
  let data = sanitization(dt);
  if (validator.isEmpty(data.email)) {
    messsage.push("Email tidak boleh kosong");
  }
  if (!validator.isEmail(data.email)) {
    messsage.push("Email tidak valid");
  }
  if (validator.isEmpty(data.password)) {
    messsage.push("Password tidak boleh kosong");
  }
  return { messsage, data };
};

export default loginValid;
