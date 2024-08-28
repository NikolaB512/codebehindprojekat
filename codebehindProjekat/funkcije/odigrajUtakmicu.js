const { azurirajFormu } = require("./formaTimova");

function odigrajUtakmicu(tim1, tim2, formaTimova) {
  const uticajFibe = 0.04; //uticaj fiba rangiranja
  const uticajRandom = 0.94; //uticaj random-a
  const uticajForme = 0.02; //uticaj forme na ishod

  const randomFaktor1 = Math.random();
  const randomFaktor2 = Math.random();

  //Racunanje sansi za timove ukljucujuci random uticaj i uticaj fiba rangiranja
  const rankTim1 =
    tim1.FIBARanking * uticajFibe +
    randomFaktor1 * uticajRandom +
    uticajForme * formaTimova[tim1.ISOCode];
  const rankTim2 =
    tim2.FIBARanking * uticajFibe +
    randomFaktor2 * uticajRandom +
    uticajForme * formaTimova[tim2.ISOCode];

  const maxPoena = 110;
  const minPoena = 85;

  const poeniTim1 = maxPoena - Math.round(rankTim1 * (maxPoena - minPoena));
  const poeniTim2 = maxPoena - Math.round(rankTim2 * (maxPoena - minPoena));

  //cuvanje statistike timova posle utakmice
  tim1.postignutih += poeniTim1;
  tim1.primljenih += poeniTim2;
  tim2.postignutih += poeniTim2;
  tim2.primljenih += poeniTim1;

  tim1.kosRaz = tim1.postignutih - tim1.primljenih;
  tim2.kosRaz = tim2.postignutih - tim2.primljenih;

  if (rankTim1 < rankTim2) {
    //Tim 1
    tim1.points += 2;
    tim2.points += 1;
  } else if (rankTim2 < rankTim1) {
    //Tim 2
    tim2.points += 2;
    tim1.points += 1;
  } else {
    //Predaja
    tim1.points += 2;
    tim2.points += 0;
  }
  azurirajFormu(formaTimova, tim1, tim2, poeniTim1, poeniTim2);
  return {
    tim1: tim1.Team,
    tim2: tim2.Team,
    score1: poeniTim1,
    score2: poeniTim2,
  };
}

module.exports = odigrajUtakmicu;
