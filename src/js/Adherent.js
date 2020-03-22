class Adherent {
    constructor(id, nom, nbL) {
        this.id = id;
        this.nom = nom;
        this.nbLivreEmpruntes = nbL;
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
        this.AJAX("php/RequeteAdherent.php", this.callback)
    }

    callback(req) {
        let json = JSON.parse(req.responseText);
        console.log(json);
        let tab = [];
        for (let i = 0; i < json.length; i++) {
            tab.push(new Adherent(json[i].idAdherent, json[i].nomAdherent, json[i].nbLivre));
        }
        Adherent.majAffichage(tab);
    }

    static majAffichage(tab) {
        let el = document.getElementById("listeAdherents");
        el.innerText = "";
        let liste = document.createElement("ul");
        el.appendChild(liste);

        for (let i=0;i<tab.length;i++){
            let li = document.createElement('li');
            if (tab[i].nbLivreEmpruntes < 1)
                li.textContent = tab[i].id + " - " + tab[i].nom;
            else if (tab[i].nbLivreEmpruntes == 1)
                li.textContent = tab[i].id + " - " + tab[i].nom + " (" + tab[i].nbLivreEmpruntes +" emprunt)";
            else if (tab[i].nbLivreEmpruntes > 1)
                li.textContent = tab[i].id + " - " + tab[i].nom + " (" + tab[i].nbLivreEmpruntes +" emprunts)";
            liste.appendChild(li);
        }
    }

    ajouter() {
        let url = "php/requeteAdherent.php?nomAdherent=" + document.getElementById("nomAdherent").value;
        this.AJAX(url, function (R) {});
        document.getElementById("nomAdherent").value = "";
    }

    alerter (info) {
        let url = "php/requeteAdherent.php?idAdherent=" + info.split(" ")[0];
        this.AJAX(url, this.lancerAlerte)
    }

    lancerAlerte(req) {
        let json = JSON.parse(req.responseText);
        let texte = "";
        if (json[0].titreLivre == null)
            texte = json[0].nomAdherent + " n'a pas encore fait d'emprunt.";
        else if (json.length == 1)
            texte = json[0].nomAdherent + " a 1 emprunt en ce moment : \n" +
                "- " + json[0].titreLivre;
        else {
            texte = json[0].nomAdherent + " a " + json.length + " emprunts en ce moments : \n";
            for (let i = 0; i < json.length; i++)
                texte = texte + "- " + json[i].titreLivre + "\n";
        }
        alert(texte);
    }
}