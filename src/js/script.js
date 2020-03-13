//pour les adherents

function afficheAdherent(tab){
    let adherent = document.getElementById("listeAdherents");
    for (let i=0;i<tab.length;i++){
        let p = document.createElement('p');
        p.textContent = i+1+"-"+tab[i];
        adherent.appendChild(p);
    }
}
function callback(req){
    let json = JSON.parse(req.responseText);
    let tab = new Array();
    for (let i=0;i<json.length;i++){
        tab[i] = json[i].nomAdherent;
    }
    afficheAdherent(tab);
}
function requeteAjaxAdherent(){
    let url = "php/requeteAdherent.php";
    let req = new XMLHttpRequest();
    req.open("GET",url,true);
    req.addEventListener("load", function () {
        callback(req);
    });
    req.send(null);
}


// pour les livres dispo

function afficheLivre(tab){
    let livre = document.getElementById("listeLivresDisponibles");
    for (let i=0;i<tab.length;i++){
        let p = document.createElement('p');
        p.textContent = i+1+"-"+tab[i];
        livre.appendChild(p);
    }
}
function callback_livre(req){
    let json = JSON.parse(req.responseText);
    let tab = new Array();
    for (let i=0;i<json.length;i++){
        tab[i] = json[i].titreLivre;
    }
    afficheLivre(tab);
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
function afficheEmprunt(tab){
    let emprunt = document.getElementById("listeLivresEmpruntes");
    for (let i=0;i<tab.length;i++){
        let p = document.createElement('p');
        p.textContent = i+1+"-"+tab[i];
        emprunt.appendChild(p);
    }
}
function callback_emprunt(req){
    let json = JSON.parse(req.responseText);
    let tab = new Array();
    for (let i=0;i<json.length;i++){
        tab[i] = json[i].nomAdherent;
    }
    afficheEmprunt(tab);
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

