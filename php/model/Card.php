<?php

namespace Card;
use Traits\Hydrate;

class Card
{
    public int $card_id;
    public string $card_name;
    public string $card_cost;
    public string $card_color;
    public bool $card_legendary_state;
    public string $card_type;
    public string $card_subtype;
    public string $card_effect;
    public int $card_power;
    public int $card_toughness;
    public string $card_rarity;
    public string $card_edition;

    use hydrate;

    public function __construct(array $datas){
        if(!empty($datas))$this->hydrate($datas);
    }


    /**
     * @param int $carte_id
     *
     * @return Card
     */
    public function setCardId(int $carte_id) : Card
    {
        $this->carte_id = $carte_id;
        return $this;
    }

    /**
     * @param string $carte_name
     *
     * @return Card
     */
    public function setCardName(string $carte_name) : Card
    {
        $this->carte_name = $carte_name;
        return $this;
    }

    /**
     * @param string $carte_cost
     *
     * @return Card
     */
    public function setCardCost(string $carte_cost) : Card
    {
        $this->carte_cost = $carte_cost;
        return $this;
    }

    /**
     * @param string $carte_color
     *
     * @return Card
     */
    public function setCardColor(string $carte_color) : Card
    {
        $this->carte_color = $carte_color;
        return $this;
    }

    /**
     * @param bool $carte_legendary_state
     *
     * @return Card
     */
    public function setCardLegendaryState(bool $carte_legendary_state) : Card
    {
        $this->carte_legendary_state = $carte_legendary_state;
        return $this;
    }

    /**
     * @param string $carte_type
     *
     * @return Card
     */
    public function setCardType(string $carte_type) : Card
    {
        $this->carte_type = $carte_type;
        return $this;
    }

    /**
     * @param string $carte_subtype
     *
     * @return Card
     */
    public function setCardSubtype(string $carte_subtype) : Card
    {
        $this->carte_subtype = $carte_subtype;
        return $this;
    }

    /**
     * @param string $carte_effect
     *
     * @return Card
     */
    public function setCardEffect(string $carte_effect) : Card
    {
        $this->carte_effect = $carte_effect;
        return $this;
    }

    /**
     * @param int $carte_power
     *
     * @return Card
     */
    public function setCardPower(int $carte_power) : Card
    {
        $this->carte_power = $carte_power;
        return $this;
    }

    /**
     * @param int $carte_toughness
     *
     * @return Card
     */
    public function setCardToughness(int $carte_toughness) : Card
    {
        $this->carte_toughness = $carte_toughness;
        return $this;
    }

    /**
     * @param string $carte_rarity
     *
     * @return Card
     */
    public function setCardRarity(string $carte_rarity) : Card
    {
        $this->carte_rarity = $carte_rarity;
        return $this;
    }

    /**
     * @param string $carte_edition
     *
     * @return Card
     */
    public function setCardEdition(string $carte_edition) : Card
    {
        $this->carte_edition = $carte_edition;
        return $this;
    }

}