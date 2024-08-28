function sortTimova(timovi) {
  timovi.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }

    //ako su poeni isti proverava se utakmica izmedju 2 tima
    const utakmica = a.rezultati[b.ISOCode];
    if (utakmica !== 0) {
      return utakmica;
    }

    //Ako im je medjusobna utakmica izjdnacena gleda se kos razlika
    return b.kosRaz - a.kosRaz;
  });

  //proverava se izjednacenje izmedju 3 tima
  for (let i = 0; i < timovi.length; i++) {
    let izjednaceni = [timovi[i]];
    while (i + 1 < timovi.length && timovi[i].points === timovi[i + 1].points) {
      izjednaceni.push(timovi[++i]);
    }
    if (izjednaceni.length > 2) {
      //Sortiraju se timovi po kos razlici izmedju njih
      izjednaceni.sort((a, b) => {
        let razlikaA = 0,
          razlikaB = 0;
        izjednaceni.forEach((tim) => {
          razlikaA += a.rezultati[tim.ISOCode] || 0;
          razlikaB += b.rezultati[tim.ISOCode] || 0;
        });
        return razlikaB - razlikaA;
      });

      //Sortirani timovi se vracaju u originalni niz
      timovi.splice(
        i - izjednaceni.length + 1,
        izjednaceni.length,
        ...izjednaceni
      );
    }
  }

  return timovi;
}

module.exports = sortTimova;
