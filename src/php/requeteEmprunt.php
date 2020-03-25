<?php
require_once 'Model.php';

$tab = Model::afficher("emprunt");
//idAdherent=" + reponse + "&idLivre

if (isset($_GET['idAdherent']) && isset($_GET['idLivre']))
    $tab = Model::ajouter("emprunt", array("idAdherent" => $_GET['idAdherent'], "idLivre" =>$_GET['idLivre']));
else if (isset($_GET['idLivre']) && isset($_GET["supprimer"]))
    $tab = Model::supprimer($_GET['idLivre']);

echo json_encode($tab);