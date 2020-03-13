<?php

require_once('Conf.php');

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données
            // le dernier argument sert à ce que toutes les chaines de charactères
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    public static function afficheAdherent(){
        try{
            $sql = "SELECT * FROM adherent";
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute();
            $req_prep->setFetchMode(PDO::FETCH_OBJ);
            $tab = $req_prep->fetchAll();
            return $tab;
        }catch(PDOException $e){
            echo $e->getMessage();
            die("Erreur lors de la recupereation des adherents");
        }
    }

    public static function afficheEmprunt(){
        try{
            $sql = "SELECT titreLivre FROM emprunt e JOIN livre l WHERE e.idLivre = l.idLivre";
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute();
            $req_prep->setFetchMode(PDO::FETCH_OBJ);
            $tab = $req_prep->fetchAll();
            return $tab;
        }catch(PDOException $e){
            echo $e->getMessage();
            die("Erreur lors de la recupereation des emprunts");
        }
    }

    public static function afficheLivre(){
        try{
            $sql = "SELECT * FROM livre";
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute();
            $req_prep->setFetchMode(PDO::FETCH_OBJ);
            $tab = $req_prep->fetchAll();
            return $tab;
        }catch(PDOException $e){
            echo $e->getMessage();
            die("Erreur lors de la recupereation des livres");
        }
    }

}

// on initialise la connexion $pdo
Model::init_pdo();

?>
