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

    public function insertOneCard(Card $card) : bool
    {
        $sql     = "";
        $prepare = $this->pdo->prepare($sql);
    }
}