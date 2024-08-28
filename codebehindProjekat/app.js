const fs = require("fs");
const odigrajUtakmicu = require("./funkcije/odigrajUtakmicu.js");
const sortTimova = require("./funkcije/sortiranjeGrupa.js");
const { ispisRezultata, ispisGrupa } = require("./funkcije/ispis.js");
const { izracunajPocetnuFormu } = require("./funkcije/formaTimova.js");
const { eliminacionaFaza } = require("./funkcije/zerb.js");

fs.readFile("groups.json", "utf8", (err, data) => {
  if (err) {
    console.error("Eror tokom citanja grupa", err);
    return;
  }

  fs.readFile("exibitions.json", "utf8", (err, exibitionData) => {
    if (err) {
      console.error("Eror tokom citanja prijateljskih utakmica:", err);
      return;
    }
    const exibitions = JSON.parse(exibitionData);

    const grupe = JSON.parse(data);

    const sviTimovi = [].concat(...Object.values(grupe));
    //Ucitavanje formi timova
    const formeTimova = izracunajPocetnuFormu(exibitions, sviTimovi);
    //console.log(grupe);

    //Prolazenje kroz sve grupe
    for (const grupa in grupe) {
      const timovi = grupe[grupa];

      //Stavljanje na 0 poena svim timovima na pocetku
      timovi.forEach((tim) => {
        tim.points = 0;
        tim.postignutih = 0;
        tim.primljenih = 0;
        tim.kosRaz = 0;
        tim.rezultati = {};
      });

      //raspored igranja po kolima
      const raspored = [
        [
          [0, 1],
          [2, 3],
        ],
        [
          [0, 2],
          [1, 3],
        ],
        [
          [0, 3],
          [1, 2],
        ],
      ];

      //logika za simuliranje grupe
      const kola = [];

      raspored.forEach((utakmice, roundIndex) => {
        const rezKola = [];
        utakmice.forEach((utakmica) => {
          const tim1 = timovi[utakmica[0]];
          const tim2 = timovi[utakmica[1]];
          const rezultat = odigrajUtakmicu(tim1, tim2, formeTimova);

          //cuvanje pojedinih utkmica
          tim1.rezultati[tim2.ISOCode] = rezultat.score1 - rezultat.score2;
          tim2.rezultati[tim1.ISOCode] = rezultat.score2 - rezultat.score1;

          rezKola.push(
            `${rezultat.tim1} vs ${rezultat.tim2}: ${rezultat.score1} - ${rezultat.score2}`
          );
        });
        kola.push(rezKola);
      });

      ispisRezultata(grupa, kola);

      sortTimova(timovi);

      ispisGrupa(grupa, timovi);
      //console.log(formeTimova);
    }
    const timoviIzGrupa = [].concat(...Object.values(grupe));
    eliminacionaFaza(grupe, timoviIzGrupa, formeTimova);
  });
});
