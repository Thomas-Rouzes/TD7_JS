<?php
require_once 'Model.php';

$tab = Model::afficher("emprunt");
//idAdherent=" + reponse + "&idLivre

if (isset($_GET['idAdherent']) && isset($_GET['idLivre'])) {
    $tab = Model::ajouter("emprunt", array("idAdherent" => $_GET['idAdherent'], "idLivre" =>$_GET['idLivre']));
}

echo json_encode($tab);