<?php
require_once 'Model.php';

$tab = Model::afficher("adherent");

if (isset($_GET["nomAdherent"]))
    $tab = Model::ajouter("adherent", array("nomAdherent" => $_GET["nomAdherent"]));
else if (isset($_GET["idAdherent"]))
    $tab = Model::selectionner("adherent", array("idAdherent" => $_GET["idAdherent"]));

echo json_encode($tab);