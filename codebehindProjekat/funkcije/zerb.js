const odigrajUtakmicu = require("./odigrajUtakmicu.js");

function eliminacionaFaza(grupe, timoviIzGrupa, formaTimova) {
  timoviIzGrupa.sort((a, b) => b.points - a.points);

  // Podela timova u sesire
  const sesiri = {
    D: timoviIzGrupa.slice(0, 2),
    E: timoviIzGrupa.slice(2, 4),
    F: timoviIzGrupa.slice(4, 6),
    G: timoviIzGrupa.slice(6, 8),
  };

  // Ispisivanje timova po sesirima
  console.log("sesir D:");
  sesiri.D.forEach((tim) => console.log(`- ${tim.Team}`));
  console.log("sesir E:");
  sesiri.E.forEach((tim) => console.log(`- ${tim.Team}`));
  console.log("sesir F:");
  sesiri.F.forEach((tim) => console.log(`- ${tim.Team}`));
  console.log("sesir G:");
  sesiri.G.forEach((tim) => console.log(`- ${tim.Team}`));

  // Formiranje parova cetvrtfinala
  const cetvrtfinale = [];

  function formirajParove(sesir1, sesir2) {
    sesir1.forEach((tim1) => {
      const moguciProtivnici = sesir2.filter((tim2) => {
        // Provera da li su timovi vec igrali jedan protiv drugog
        return !tim1.rezultati[tim2.ISOCode];
      });

      if (moguciProtivnici.length > 0) {
        const tim2 =
          moguciProtivnici[Math.floor(Math.random() * moguciProtivnici.length)];
        cetvrtfinale.push({ tim1, tim2 });
      } else {
        console.error(`Nema dostupnih protivnika za ${tim1.Team}`);
      }
    });
  }

  formirajParove(sesiri.D, sesiri.G);
  formirajParove(sesiri.E, sesiri.F);

  // Ispisivanje parova cetvrtfinala
  console.log();
  console.log("Parovi cetvrtfinala:");
  cetvrtfinale.forEach((par, index) => {
    console.log(`Par ${index + 1}: ${par.tim1.Team} vs ${par.tim2.Team}`);
  });

  // Simuliranje cetvrtfinala
  const polufinalisti = [];
  const gubitniciCetvrtfinala = [];

  cetvrtfinale.forEach((par) => {
    const rezultat = odigrajUtakmicu(par.tim1, par.tim2, formaTimova);
    console.log(
      `Rezultat: ${rezultat.tim1} vs ${rezultat.tim2}: ${rezultat.score1} - ${rezultat.score2}`
    );
    const pobednik = rezultat.score1 > rezultat.score2 ? par.tim1 : par.tim2;
    polufinalisti.push(pobednik);
    // Dodavanje gubitnika cetvrtfinala
    const gubitnik = rezultat.score1 < rezultat.score2 ? par.tim1 : par.tim2;
    gubitniciCetvrtfinala.push(gubitnik);
  });

  // Ispisivanje polufinalista
  /*console.log("Polufinalisti:");
  polufinalisti.forEach((tim) => console.log(tim.Team));*/
  // Formiranje parova za polufinale
  const polufinale = [];
  const formirajParovePolufinala = () => {
    const timovi = [...polufinalisti];
    // Nasumicno formiranje parova polufinala
    while (timovi.length > 1) {
      const tim1 = timovi.pop();
      const tim2 = timovi.pop();
      polufinale.push({ tim1, tim2 });
    }
  };
  formirajParovePolufinala();

  // Ispisivanje parova polufinala
  console.log();
  console.log("Parovi polufinala:");
  polufinale.forEach((par, index) => {
    console.log(`Par ${index + 1}: ${par.tim1.Team} vs ${par.tim2.Team}`);
  });

  // Simuliranje polufinala
  const finalisti = [];
  const gubitniciPolufinala = [];

  polufinale.forEach((par) => {
    const rezultat = odigrajUtakmicu(par.tim1, par.tim2, formaTimova);
    console.log(
      `Rezultat: ${rezultat.tim1} vs ${rezultat.tim2}: ${rezultat.score1} - ${rezultat.score2}`
    );
    const pobednik = rezultat.score1 > rezultat.score2 ? par.tim1 : par.tim2;
    finalisti.push(pobednik);
    // Dodavanje gubitnika polufinala za trece mesto
    const gubitnik = rezultat.score1 < rezultat.score2 ? par.tim1 : par.tim2;
    gubitniciPolufinala.push(gubitnik);
  });

  // Ispisivanje finalista
  /*console.log("Finalisti:");
  finalisti.forEach((tim) => console.log(tim.Team));*/

  // Formiranje parova za finale i utakmicu za trece mesto
  const finale = [finalisti[0], finalisti[1]];
  const treceMesto = [gubitniciPolufinala[0], gubitniciPolufinala[1]];

  console.log();
  console.log(`Finale: ${finale[0].Team} vs ${finale[1].Team}`);
  console.log(
    `Utakmica za trece mesto: ${treceMesto[0].Team} vs ${treceMesto[1].Team}`
  );

  // Simuliranje utakmica za trece mesto i finale
  const rezultatTreceMesto = odigrajUtakmicu(
    treceMesto[0],
    treceMesto[1],
    formaTimova
  );
  console.log(
    `Rezultat utakmice za trece mesto: ${rezultatTreceMesto.tim1} vs ${rezultatTreceMesto.tim2}: ${rezultatTreceMesto.score1} - ${rezultatTreceMesto.score2}`
  );
  const treceMestoPobednik =
    rezultatTreceMesto.score1 > rezultatTreceMesto.score2
      ? treceMesto[0]
      : treceMesto[1];

  //console.log(`Pobednik utakmice za trece mesto: ${treceMestoPobednik.Team}`);
  const rezultatFinale = odigrajUtakmicu(finale[0], finale[1], formaTimova);
  console.log(
    `Rezultat finala: ${rezultatFinale.tim1} vs ${rezultatFinale.tim2}: ${rezultatFinale.score1} - ${rezultatFinale.score2}`
  );
  const pobednikFinala =
    rezultatFinale.score1 > rezultatFinale.score2 ? finale[0] : finale[1];

  // Ispisivanje rezultata
  console.log(`Pobednik finala: ${pobednikFinala.Team}`);
}

module.exports = {
  eliminacionaFaza,
};
