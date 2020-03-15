<?php
require_once('Model.php');

$tab = Model::afficher("livre");
if (isset($_GET["titreLivre"])) {
    $donnees = array(
        "titreLivre" => $_GET["titreLivre"]
    );
    $tab = Model::ajouter("livre", $donnees);
}

echo (json_encode($tab));