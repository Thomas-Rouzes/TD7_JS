<?php
require_once('Model.php');

$tab = Model::afficher("livre");

echo (json_encode($tab));