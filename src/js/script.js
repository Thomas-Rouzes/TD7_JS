let emprunt = new Emprunt(null, null, null);
let livre = new Livre(null, null);
let adherent = new Adherent(null, null);

function majAffichage () {
    emprunt.afficher();
    livre.afficher();
    adherent.afficher();
}
let affichage = document.addEventListener("DOMContentLoaded", majAffichage);

let ajoutAdherent = document.getElementById("ajouterAdherent").addEventListener("click", function () {
    adherent.ajouter();
    setTimeout(majAffichage, 100);
});
let ajoutLivre = document.getElementById("ajouterLivre").addEventListener("click", function () {
    livre.ajouter();
    setTimeout(majAffichage, 100);
});

let clickAdherent = document.getElementById("listeAdherents").addEventListener("click", function (e) {
    adherent.alerter(e.target.innerText);
});
let clickLivre = document.getElementById("listeLivresDisponibles").addEventListener("click", function (e) {
    livre.alerter(e.target.innerText);
    setTimeout(majAffichage, 100);
});
let clickEmprunt = document.getElementById("listeLivresEmpruntes").addEventListener("click", function (e) {
    emprunt.alerter(e.target.innerText);
    setTimeout(majAffichage, 100);
});