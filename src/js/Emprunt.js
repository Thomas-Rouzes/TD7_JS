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

    static AJAXSuppression(url) {
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.send(null);
    }
//supprimer
    alerter (info) {
        let url = "php/requeteEmprunt.php?idLivre=" + info.split(" ")[0] + "&selectionner=true";
        this.AJAX(url, this.lancerAlerte);
    }

    lancerAlerte (req) {
        let info = JSON.parse(req.responseText);//idLivre
        let reponse = confirm("Livre prêté à " + info[0].nomAdherent + "\nRetour de ce livre ?");
        if (reponse) {
            let url = "php/requeteEmprunt.php?idLivre=" + info[0].idLivre + "&supprimer=true";
            Emprunt.AJAXSuppression(url);
        }
    }
}