<?php

namespace Card;
use Traits\Hydrate;
use Exception;
use PDO;

class CardManager
{
    private PDO $pdo;

    use hydrate;

    public function __construct(array $datas){
        if(!empty($datas))$this->hydrate($datas);
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

    public function getCard(int $id = null,string $name = null):array|string{
        $sql = "SELECT * FROM `card` WHERE ";
        $sql .= ($id? "`card_id` =":"`card_name` =")." ?;";
        $prepare = $this->pdo->prepare($sql);
        try{
            $id!==null?$prepare->bindParam(1,$id,PDO::PARAM_INT):$prepare->bindParam(1,$name,PDO::PARAM_STR);
            $prepare->execute();
            $result = $prepare->fetch(PDO::FETCH_ASSOC);
            $prepare->closeCursor();
        }catch(Exception $e){
            $result = $e->getMessage();
        }
        return $result;
    }

}