// Midlleware örneği, test fonksiyonundaki koşul sağlanması durumunda hata döndürür
// inde.js'de bir route'ye atanırsa route bu fonksiyona göre ya hata verir ya da 
// test fonksiyonundaki next() dönüşü ile çalışmaya devam eder.

let test = (req, res, next) => {
  if (2 === 1) {
    return res.send("You are not allowed, get out.");
  }

  next();
};

module.exports = test;
