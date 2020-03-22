<?php
require_once 'Model.php';

$tab = Model::afficher("livre");

if (isset($_GET['titreLivre']))
    $tab = Model::ajouter("livre", array("titreLivre" => $_GET["titreLivre"]));

echo json_encode($tab);