import { mhs } from "../src/index.js";

test("Objek Test", () => {
  const mahasiswa = mhs();
  expect(mahasiswa).toEqual({
    id: 2,
    nama: "Pojok Code",
  });
});

test("Item Test", () => {
  const mahasisawa = mhs();
  expect(mahasisawa.nama).toBe("Pojok Code");
});
