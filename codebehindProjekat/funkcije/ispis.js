function ispisRezultata(grupa, kola) {
  //Rezultati utakmica u grupama po kolima
  console.log(`\nRezultati za grupe ${grupa}:`);
  kola.forEach((kolo, index) => {
    console.log(`\nKolo ${index + 1}:`);
    kolo.forEach((utakmica) => {
      console.log(utakmica);
    });
  });
}
function ispisGrupa(grupa, timovi) {
  //Ispis svih grupa
  console.log(`Group ${grupa} Standings:`);
  console.log("Pozicija | Drzava            | ISO | Poeni | FOR | AGT | -/+");
  console.log("-----------------------------------------");

  timovi.forEach((tim, index) => {
    console.log(
      `${(index + 1).toString().padEnd(8)}| ${tim.Team.padEnd(
        18
      )} | ${tim.ISOCode.padEnd(3)} | ${tim.points} | ${tim.postignutih} | ${
        tim.primljenih
      } | ${tim.kosRaz}`
    );
  });
  console.log("-----------------------------------------");
}
module.exports = {
  ispisRezultata,
  ispisGrupa,
};
