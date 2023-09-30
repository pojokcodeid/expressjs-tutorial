import mongoose from "../utils/db.js";

const barangSchema = new mongoose.Schema({
  nama_barang: {
    type: String,
    required: true,
  },
  jumlah: {
    type: Number,
    required: true,
  },
  harga_satuan: {
    type: Number,
    required: true,
  },
  expire_date: {
    type: Date,
    required: false,
  },
});

const barangCollection = mongoose.model("barang", barangSchema);
export default barangCollection;
