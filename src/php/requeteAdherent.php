<?php

require_once('Model.php');

$tab = Model::afficheAdherent();

echo (json_encode($tab));
