<?php

require_once('Model.php');

$tab = Model::afficher("adherent");

if (isset($_GET["nomAdherent"])) {
    echo "<script>alert('la');</script>";
    $donnees = array(
        "nomAdherent" => $_GET["nomAdherent"]
    );
    $tab = Model::ajouter("adherent", $donnees);
}

echo (json_encode($tab));
