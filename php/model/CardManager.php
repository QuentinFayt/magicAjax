<?php

namespace Card;

use Exception;
use PDO;
use Traits\Hydrate;

class CardManager
{
    private PDO $pdo;

    use hydrate;

    public function __construct(array $datas)
    {
        if (!empty($datas)) {
            $this->hydrate($datas);
        }
    }

    /**
     * @param PDO $pdo
     *
     * @return CardManager
     */
    public function setPdo(PDO $pdo) : CardManager
    {
        $this->pdo = $pdo;
        return $this;
    }

    public function getCard(int $id = null, string $name = null) : array|string
    {
        $sql     = "SELECT * FROM `card` WHERE ";
        $sql     .= ($id ? "`card_id` =" : "`card_name` LIKE") . " ?;";
        $name    = "%$name%";
        $prepare = $this->pdo->prepare($sql);
        try {
            $id !== null ? $prepare->bindParam(1, $id, PDO::PARAM_INT) : $prepare->bindParam(1, $name, PDO::PARAM_STR);
            $prepare->execute();
            $result = $prepare->fetch(PDO::FETCH_ASSOC);
            $prepare->closeCursor();
        } catch (Exception $e) {
            $result = $e->getCode();
        }
        return $result;
    }

    public function getAllCards() : array|string
    {
        $sql     = "SELECT * FROM `card`;";
        $prepare = $this->pdo->prepare($sql);
        try {
            $prepare->execute();
            $result = $prepare->fetchAll(PDO::FETCH_ASSOC);
            $prepare->closeCursor();
        } catch (Exception $e) {
            $result = $e->getCode();
        }
        return $result;
    }

    public function insertOneCard(Card $card) : bool|string
    {
        $sql     = "INSERT INTO `card`
                    (`card_name`, `card_cost`, `card_color`, `card_legendary_state`, `card_type`, `card_subtype`, `card_effect`, `card_power`, `card_toughness`, `card_rarity`, `card_edition`) 
                    VALUES 
                    (?,?,?,?,?,?,?,?,?,?,?)";
        $prepare = $this->pdo->prepare($sql);
        try {
            $prepare->bindValue(1, $card->getCardName(), PDO::PARAM_STR);
            $prepare->bindValue(2, $card->getCardCost(), PDO::PARAM_STR);
            $prepare->bindValue(3, $card->getCardColor(), PDO::PARAM_STR);
            $prepare->bindValue(4, $card->getCardLegendaryState(), PDO::PARAM_BOOL);
            $prepare->bindValue(5, $card->getCardType(), PDO::PARAM_STR);
            $prepare->bindValue(6, $card->getCardSubtype(), PDO::PARAM_STR);
            $prepare->bindValue(7, $card->getCardEffect(), PDO::PARAM_STR);
            $prepare->bindValue(8, $card->getCardPower(), PDO::PARAM_INT);
            $prepare->bindValue(9, $card->getCardToughness(), PDO::PARAM_INT);
            $prepare->bindValue(10, $card->getCardRarity(), PDO::PARAM_STR);
            $prepare->bindValue(11, $card->getCardEdition(), PDO::PARAM_STR);
            $prepare->execute();
            $result = true;
        } catch (Exception $e) {
            $result = false;
        }
        return $result;
    }
}