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

    public static function afficher ($aAfficher) {
        if ($aAfficher == "adherent")
            $sql = "SELECT a.idAdherent, nomAdherent, COUNT(e.idAdherent) AS nbLivre FROM adherent a LEFT OUTER JOIN emprunt e ON e.idAdherent = a.idAdherent GROUP BY a.idAdherent ORDER BY a.idAdherent";
        else if ($aAfficher == "emprunt")
            $sql = "SELECT e.idLivre, idAdherent, titreLivre FROM emprunt e JOIN livre l WHERE e.idLivre = l.idLivre ORDER BY e.idLivre";
        else if ($aAfficher == "livre")
            $sql = "SELECT idLivre, titreLivre FROM Livre l WHERE NOT EXISTS ( SELECT idLivre FROM Emprunt e WHERE l.idLivre = e.idLivre) ORDER BY idLivre";
        else
            return false;
        try {
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute();
            $req_prep->setFetchMode(PDO::FETCH_OBJ);
            $tab = $req_prep->fetchAll();
            return $tab;
        }catch(PDOException $e){
            echo $e->getMessage();
            die("Erreur lors de la récupération des " . $aAfficher);
        }
    }


    public static function ajouter ($aAjouter, $donnee) {
        try {
            if ($aAjouter == "adherent") {
                $sql = "INSERT INTO `adherent`(`nomAdherent`) VALUES (:sql_nomA);";
                $donne = array(
                    "sql_nomA" => $donnee["nomAdherent"]
                );
            } else if ($aAjouter == "emprunt") {
                $sql = "INSERT INTO `emprunt`(`idAdherent`, `idLivre`) VALUES (:sql_idA, :sql_idL);";
                $donne = array(
                    "sql_idA" => $donnee["idAdherent"],
                    "sql_idL" => $donnee["idLivre"]
                );
            } else if ($aAjouter == "livre") {
                $sql = "INSERT INTO `livre`(`titreLivre`) VALUES (:sql_titreL);";
                $donne = array(
                    "sql_titreL" => $donnee["titreLivre"]
                );
            } else {
                return false;
            }
            $requete = self::$pdo->prepare($sql);
            $requete->execute($donne);
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
            return false;
        }
    }

    public static function selectionner ($table, $id) {
            if ($table == "adherent") {
                $sql = "SELECT a.idAdherent, nomAdherent, titreLivre FROM adherent a LEFT OUTER JOIN emprunt e ON e.idAdherent = a.idAdherent LEFT OUTER JOIN Livre l on e.idLivre = l.idLivre WHERE a.idAdherent = :sql_id";
            } else if ($table == "emprunt") {
                $sql = "SELECT nomAdherent, idLivre FROM adherent a JOIN emprunt e ON e.idAdherent = a.idAdherent WHERE idLivre = :sql_id";
            } else {
                return false;
            }
        try {
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute(array("sql_id" => $id));
            $req_prep->setFetchMode(PDO::FETCH_OBJ);
            return $req_prep->fetchAll();
        } catch(PDOException $e){
            echo $e->getMessage();
            die("Erreur lors de la récupération des Adhérents");
        }
    }

    public static function supprimer ($idLivre) {
        try {
            $sql = "DELETE FROM `emprunt` WHERE idLivre = :sql_id";
            $donnees = array(
                "sql_id" => $idLivre
            );
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($donnees);
            return true;
        } catch(PDOException $e){
            echo $e->getMessage();
            die("Erreur lors de la récupération des Adhérents");
        }
    }

}

// on initialise la connexion $pdo
Model::init_pdo();
