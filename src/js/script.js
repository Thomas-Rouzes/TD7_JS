//Pour la gestion de l'affichage

function affiche (tab, id) {
    let el = document.getElementById(id);
    console.log(tab);
    console.log(id == "listeAdherents");
    for (let i=0;i<tab.length;i++){
        let p = document.createElement('p');
        if (id == "listeAdherents") {
            if (tab[i][1] == 0)
                p.textContent = i + 1 + " - " + tab[i][0];
            else if (tab[i][1] == 1)
                p.textContent = i + 1 + " - " + tab[i][0] + " (" + tab[i][1] + " emprunt)";
            else
                p.textContent = i + 1 + " - " + tab[i][0] + " (" + tab[i][1] + " emprunts)";
        } else
            p.textContent = i + 1 + " - " + tab[i];
        el.appendChild(p);
    }
}

//pour les adherents
function callback(req){
    let json = JSON.parse(req.responseText);
    let tab = [];
    console.log(json);
    for (let i=0;i<json.length;i++){
        tab[i] = [];
        tab[i][0] = json[i].nomAdherent;
        tab[i][1] = json[i].nbLivre;
    }
    affiche(tab, "listeAdherents");
}
function requeteAjaxAdherent () {
    let url = "php/requeteAdherent.php";
    let req = new XMLHttpRequest();
    req.open("GET",url,true);
    req.addEventListener("load", function () {
        callback(req);
    });
    req.send(null);
}


// pour les livres dispo
function callback_livre(req){
    let json = JSON.parse(req.responseText);
    let tab = [];
    for (let i=0;i<json.length;i++){
        tab[i] = json[i].titreLivre;
    }
    affiche(tab, "listeLivresDisponibles");
}
function requeteAjaxLivre(){
    let url = "php/requeteLivre.php";
    let req = new XMLHttpRequest();
    req.open("GET",url,true);
    req.addEventListener("load", function () {
        callback_livre(req);
    });
    req.send(null);
}

// pour les emprunts
function callback_emprunt(req){
    let json = JSON.parse(req.responseText);
    let tab = [];
    for (let i=0;i<json.length;i++){
        tab[i] = json[i].titreLivre ;
    }
    affiche(tab, "listeLivresEmpruntes");
}
function requeteAjaxEmprunt(){
    let url = "php/requeteEmprunt.php";
    let req = new XMLHttpRequest();
    req.open("GET",url,true);
    req.addEventListener("load", function () {
        callback_emprunt(req);
    });
    req.send(null);
}

function initialise () {
    requeteAjaxAdherent();
    requeteAjaxEmprunt();
    requeteAjaxLivre();
}

//event
let affichage = document.addEventListener("DOMContentLoaded", initialise);