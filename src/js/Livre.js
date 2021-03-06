class Livre {

    constructor(id, titre) {
        this.id = id;
        this.titre = titre
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
        this.AJAX("php/RequeteLivre.php", this.callback)
    }

    callback(req) {
        let json = JSON.parse(req.responseText);
        let tab = [];
        for (let i = 0; i < json.length; i++) {
            tab.push(new Livre(json[i].idLivre, json[i].titreLivre));
        }
        Livre.majAffichage(tab);
    }

    static majAffichage(tab) {
        let el = document.getElementById("listeLivresDisponibles");
        el.innerText = "";
        let liste = document.createElement("ul");
        el.appendChild(liste);

        for (let i=0;i<tab.length;i++){
            let li = document.createElement('li');
            li.textContent = tab[i].id + " - " + tab[i].titre;
            liste.appendChild(li);
        }
    }
    AJAXAjout(url) {
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.send(null);
        this.afficher();
    }

    ajouter () {
        let url = "php/requeteLivre.php?titreLivre=" + document.getElementById("titreLivre").value;
        this.AJAXAjout(url);
        document.getElementById("titreLivre").value = "";
    }

    alerter (info) {
        let reponse = prompt("prêt de \"" + info.split("-")[1 ] + "\". \nn° de l'emprunteur ?");
        let num = parseInt(reponse, 10);
        if ( ! (isNaN(num) || num == null) ) {
            let url = "php/requeteEmprunt.php?idAdherent=" + reponse + "&idLivre=" + info.split("-")[0];
            this.AJAXAjout(url)
        }
    }
}