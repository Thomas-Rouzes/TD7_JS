let emprunt = new Emprunt(null, null, "test");
let livre = new Livre(null, null);
let adherent = new Adherent(null, null);

function majAffichage () {
    emprunt.afficher();
    livre.afficher();
    adherent.afficher();
    console.log("fin");
}
let affichage = document.addEventListener("DOMContentLoaded", majAffichage);

let ajoutAdherent = document.getElementById("ajouterAdherent").addEventListener("click", function () {
    adherent.ajouter();
    adherent.afficher();
});
let ajoutLivre = document.getElementById("ajouterLivre").addEventListener("click", function () {
    livre.ajouter();
    livre.afficher();
});

let clickAdherent = document.getElementById("listeAdherents").addEventListener("click", function (e) {
    adherent.alerter(e.target.innerText);
});
let clickLivre = document.getElementById("listeLivresDisponibles").addEventListener("click", function (e) {
    livre.alerter(e.target.innerText);
    setTimeout(majAffichage, 20)
});