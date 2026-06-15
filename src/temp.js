/* 
skalaSatuan -> scaleUnits
penskalaan -> scaleNames
updateText -> convertNumberToText
numStr -> numberString
decimal -> decimalString
result -> digits
satuan, puluhan, ratusan -> ones, tens, hundreds
baca -> text
x -> index
skala -> scale
i -> currentIndex
belumAdaNama -> remainingNumber
validasi -> validationRegex
*/

const scaleUnits = [
  "",
  "satu",
  "dua",
  "tiga",
  "empat",
  "lima",
  "enam",
  "tujuh",
  "delapan",
  "sembilan",
];

const scaleNames = ["", "ribu", "juta", "miliar", "triliun"];

/**
 *
 * @param {string} numberString
 * @returns {Array<string>}
 * @description Memisahkan tiga angka dan membalikkan urutannya
 */
function splitNumber(numberString) {
  let temp = numberString;
  let arrayNumber = [];
  for (let i = numberString.length; i > 0; i -= 3) {
    arrayNumber.push(temp.slice(-3));
    temp = temp.slice(0, -3);
  }

  /* 
  * definisikan variable arrayNumber
  * temp = numberString
  * for
  *   i = numberString.length;
  *   i > 0
  *   i -= 3
  * 
  * tambah 3 digit terakhir ke arrayNumber
  * hapus tiga digit terakhir di string temp
  * end for
  * return arrayNumber
  */

  console.log(arrayNumber);
  return arrayNumber;
}

/**
 *
 * @param {array} array
 * @param {number} index
 * @returns {Array<string>}
 */
function readThreeDigits(array, index) {
  let digits = array[index];
  console.log(digits);
  let numberChar = digits.split("").reverse();
  console.table(numberChar);
  return numberChar;
}

function readDecimal(decimal) {
  return decimal
    .split("")
    .map((d) => getOnes(d, true))
    .join(" ");
}

function getOnes(digit, isDecimal = false) {
  if (digit == "0" && isDecimal) return "nol";
  return scaleUnits[digit];
}

/**
 * Fungsi untuk mengubah bilangan menjadi teks
 * @param {string} numberString - Bilangan asli
 * @param {string} decimalString - Bilangan koma
 */
function convertNumberToText(numberString, decimalString) {
  if (!numberString || (numberString == 0 && !decimalString)) return "Nol";

  // if (!validasi.test(numberString))
  //   throw new Error("Kesalahan");

  console.log(numberString, decimalString);

  // let numberString = "1100012"
  // Pisahkan setiap 3 angka dari belakang
  let arrNumber = splitNumber(numberString);

  let baca = "";

  for (let skala = 0; skala < arrNumber.length; skala++) {
    // Hentikan loop jika melebihi 5 kali!
    if (skala > 4) {
      console.log("loop melebihi 5 kali");
      break;
    }

    /*
    Ambil 3 digit terakhir, contoh: 123.456.789 --> 
    ratusan = 7
    puluhan = 8
    satuan = 9
    sisa = 123.456
    */

    let [ones, tens, hundreds] = readThreeDigits(arrNumber, skala);
    console.table({
      ratusan: hundreds,
      puluhan: tens,
      satuan: ones,
    });

    let pakaiSeratus, pakaiSepuluh, pakaiSeribu, belasan;

    // Cek bilangan yang memakai awalan se-
    if (hundreds == "1") pakaiSeratus = "seratus";
    if (tens == "1") pakaiSepuluh = "sepuluh";
    if (ones == "1" && skala == 1 && !pakaiSepuluh && !pakaiSeratus) {
      pakaiSeribu = "seribu";
    }

    // Cek bilangan belasan
    if (tens == "1" && ones != "0") {
      if (ones === "1") {
        belasan = "sebelas";
      } else {
        belasan = scaleUnits[ones] + " belas";
      }

      // Cegah ones mengambil angka dengan mengalihkan ke string kosong
      ones = "0";
    }
    // console.log(belasan);

    // Bentuk teks untuk ratusan (misalnya "seratus" atau "dua ratus")
    let teksRatusan;
    if (scaleUnits[hundreds]) {
      teksRatusan = pakaiSeratus || scaleUnits[hundreds] + " ratus";
    }

    // Bentuk teks untuk puluhan (misalnya "sepuluh", "dua puluh", atau belasan)
    let teksPuluhan;
    if (scaleUnits[tens]) {
      // Ambil yang memiliki nilai dan sesuaikan prioritasnya
      teksPuluhan = belasan || pakaiSepuluh || scaleUnits[tens] + " puluh";
    }

    // Bentuk teks untuk satuan (atau "seribu" jika kondisi terpenuhi)
    let teksSatuan = pakaiSeribu || scaleUnits[ones];

    // Bentuk teks untuk skala (ribu, juta, dll.) jika ada komponen sebelumnya dan bukan "seribu"
    let teksSkala;
    if ((teksRatusan || teksPuluhan || teksSatuan) && !pakaiSeribu) {
      teksSkala = scaleNames[skala];
    }

    // Gabungkan semua teks yang valid, pisahkan dengan spasi
    let teks = [teksRatusan, teksPuluhan, teksSatuan, teksSkala]
      .filter(Boolean)
      .join(" ");

    console.log(teks);
    baca = teks + " " + baca;
  }
  baca = baca.trim();

  /* ========================= Baca bilangan desimal ========================= */
  if (decimalString) {
    baca += " " + readDecimal(decimalString);
  }
  baca = baca.replace(/(^.)/, (x) => x.toUpperCase());
  return baca;
}

import readline from "readline/promises";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const setBilangan = await rl.question("Masukkan Bilangan: ");
const setDesimal = await rl.question("Masukkan Desimal: ");
rl.close();

console.log(convertNumberToText(setBilangan, setDesimal));

/* 
let tes = "0";
let desimal = "";
console.log(convertNumberToText(tes, desimal));
console.log(Intl.NumberFormat("id-ID").format(tes));
 */

// export default convertNumberToText;
