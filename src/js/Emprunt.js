class Emprunt {

    constructor(idL, idA, titre) {
        this.idLivre = idL;
        this.idAdherent = idA;
        this.titreLivre = titre;
    }

    AJAX(url, callback) {
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.addEventListener("load", function () {
            callback(requete);
        });
        requete.send(null);
    }

    afficher() {
        this.AJAX("php/RequeteEmprunt.php", this.callback)
    }

    callback(req) {
        let json = JSON.parse(req.responseText);
        console.log(json);
        let tab = [];
        for (let i = 0; i < json.length; i++) {
            tab.push(new Emprunt(json[i].idLivre, json[i].idAdherent, json[i].titreLivre));
        }
        Emprunt.majAffichage(tab);
    }

    static majAffichage(tab) {
        let el = document.getElementById("listeLivresEmpruntes");
        el.innerText = "";
        let liste = document.createElement("ul");
        el.appendChild(liste);

        for (let i=0;i<tab.length;i++){
            let li = document.createElement('li');
                li.textContent = tab[i].idLivre + " - " + tab[i].titreLivre;
            liste.appendChild(li);
        }
    }

    rendre() {
        let url = "php/requeteLivre.php?titreLivre=" + document.getElementById("titreLivre").value;
        this.AJAXSuppression(url);
        document.getElementById("titreLivre").value = "";
    }
    AJAXSuppression(url) {
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.send(null);
        this.afficher();
    }
//supprimer
    alerter (info) {
        let reponse = confirm("");
        let num = parseInt(reponse, 10);
        if ( ! (isNaN(num) || num == null) ) {
            let url = "php/requeteEmprunt.php?idAdherent=" + reponse + "&supprimer=true";
            //alert(url);
            this.AJAXAjout(url)
        }
    }
}