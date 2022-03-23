<?php
header("Access-Control-Allow-Origin: *");
require_once "../config/config.php";
require_once "../../Traits/hydrate.php";
require_once "../model/CardManager.php";
require_once "../model/Card.php";

use Card\Card;
use Card\CardManager;

try {
    $pdo = new PDO(DB_TYPE . ':host=' . DB_HOST . ';dbname=' . DB_NAME . ';port=' . DB_PORT . ';charset=' . DB_CHARSET, DB_LOGIN, DB_PWD);
} catch (Exception $e) {
    echo $e->getMessage();
}
if (isset($pdo)) {
    $carteManager = new CardManager(["pdo" => $pdo]);

    if (!empty($_GET["id"]) || !empty($_GET["name"])) {
        $post     = $_GET["id"] ?? (string) $_GET["name"];
        $tempCard = ctype_digit($post) ? $carteManager->getCard(id: (int) $post) : $carteManager->getCard(name: $post);

        if (is_array($tempCard)) {
            $newCard = new Card($tempCard);
        }
    }

    echo json_encode($newCard ?? ["error" => "Result not found"]);
}