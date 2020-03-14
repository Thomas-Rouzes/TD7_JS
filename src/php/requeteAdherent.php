<?php

require_once('Model.php');

$tab = Model::afficher("adherent");

echo (json_encode($tab));
