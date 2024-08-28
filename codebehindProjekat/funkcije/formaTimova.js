const fs = require("fs");

//Racunanje pocetne forme posle prijateljskih utakmica
function izracunajPocetnuFormu(exibitionsData, timovi) {
  const formeTimova = {};

  //Mapiranje imena timova sa iso kodovima
  const teamMap = {};
  timovi.forEach((tim) => {
    teamMap[tim.ISOCode] = {
      FIBARanking: tim.FIBARanking,
    };
  });

  for (const timISO in exibitionsData) {
    const utakmice = exibitionsData[timISO];
    let ukupnaForma = 0;
    utakmice.forEach((utakmica) => {
      const [score1, score2] = utakmica.Result.split("-").map(Number);
      const kosRaz = score1 - score2;

      //Dobijanje protivnikovih statistika ISO kodom
      const protivnik = teamMap[utakmica.Opponent];
      if (protivnik) {
        const protivnikFIBA = protivnik.FIBARanking;

        //Racunanje forme u odnosu na razluku poena i protivnikovu jacinu
        ukupnaForma += kosRaz / protivnikFIBA;
      } else {
        console.error(` ${utakmica.Opponent} nije nadjen`);
      }
    });

    if (teamMap[timISO]) {
      formeTimova[timISO] = ukupnaForma / utakmice.length;
    } else {
      console.error(`Tim ${timISO} nije nadjen`);
    }
  }

  return formeTimova;
}

//Funkcija za azuriranje forme timova posle svake utakmice
function azurirajFormu(formeTimova, tim1, tim2, score1, score2) {
  const kosRaz = score1 - score2;

  formeTimova[tim1.ISOCode] += kosRaz / tim2.FIBARanking;
  formeTimova[tim2.ISOCode] -= kosRaz / tim1.FIBARanking;
}

module.exports = {
  izracunajPocetnuFormu,
  azurirajFormu,
};
