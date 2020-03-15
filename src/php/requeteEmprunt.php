<?php
require_once('Model.php');

$tab = Model::afficher("emprunt");
if (isset($_GET["idAdherent"]) && isset($_GET["idLivre"])) {
    $donnees = array(
        "idAdherent" => $_GET["idAdherent"],
        "idLivre" => $_GET["idLivre"]
    );
    $tab = Model::ajouter("emprunt", $donnees);
}

echo (json_encode($tab));