<?php
header("Access-Control-Allow-Origin: *");
require_once "../config/config.php";
require_once "../../Traits/hydrate.php";
require_once "../model/CardManager.php";
require_once "../model/Card.php";

use Card\CardManager;
use Card\Card;

$pdo = new PDO(DB_TYPE . ':host=' . DB_HOST . ';dbname=' . DB_NAME . ';port=' . DB_PORT . ';charset=' . DB_CHARSET, DB_LOGIN, DB_PWD);

$carteManager = new CardManager(["pdo"=>$pdo]);

if(!empty($_POST["id"])||!empty($_POST["name"])){
    $post = (int) $_POST["id"]?: (string) $_POST["name"];
    $tempCard = is_int($post)? $carteManager->getCard(id:$post):$carteManager->getCard(name:$post);
    if(is_array($tempCard)){$newCard = new Card($tempCard);}
}

echo json_encode($newCard ?? ["error"=>"Result not found"]);
