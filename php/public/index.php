<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json"); //Pour retourner une application/json
require_once "../config/config.php";
require_once "../../Traits/hydrate.php";
require_once "../model/CardManager.php";
require_once "../model/Card.php";

use Card\Card;
use Card\CardManager;

try {
    $pdo = new PDO(DB_TYPE . ':host=' . DB_HOST . ';dbname=' . DB_NAME . ';port=' . DB_PORT . ';charset=' . DB_CHARSET, DB_LOGIN, DB_PWD);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
if (isset($pdo)) {
    $cardManager = new CardManager(["pdo" => $pdo]);

    if (!empty($_GET["id"]) || !empty($_GET["name"])) {

        $post     = $_GET["id"] ?? (string) $_GET["name"];
        $tempCard = ctype_digit($post) ? $cardManager->getCard(id: (int) $post) : $cardManager->getCard(name: $post);

        if (is_array($tempCard)) {
            $newCard = new Card($tempCard);
        }
        echo json_encode($newCard ?? ["error" => "Result not found"]);
    }
    elseif (isset($_GET["all"])) {
        echo json_encode($cardManager->getAllCards());
    }
    if (isset($_POST["card"])) {
        $_POST["card"]["card_legendary_state"] = $_POST["card"]["card_legendary_state"] !== "false";
        $cardToInsert                          = new Card($_POST["card"]);
        if ($cardManager->insertOneCard($cardToInsert)) {
            echo json_encode(["result" => "success"]);
        }
        else {
            echo json_encode(["result" => "fail"]);
        }
    }
}