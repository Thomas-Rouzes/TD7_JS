<?php
require_once('Model.php');

$tab = Model::afficher("emprunt");

echo (json_encode($tab));