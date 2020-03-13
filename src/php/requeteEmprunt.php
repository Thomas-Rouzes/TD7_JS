<?php
require_once('Model.php');

$tab = Model::afficheEmprunt();

echo (json_encode($tab));