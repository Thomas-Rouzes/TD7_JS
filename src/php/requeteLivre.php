<?php
require_once('Model.php');

$tab = Model::afficheLivre();

echo (json_encode($tab));