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
     * @param int $card_id
     *
     * @return Card
     */
    public function setCardId(int $card_id) : Card
    {
        $this->card_id = $card_id;
        return $this;
    }

    /**
     * @param string $card_name
     *
     * @return Card
     */
    public function setCardName(string $card_name) : Card
    {
        $this->card_name = $card_name;
        return $this;
    }

    /**
     * @param string $card_cost
     *
     * @return Card
     */
    public function setCardCost(string $card_cost) : Card
    {
        $this->card_cost = $card_cost;
        return $this;
    }

    /**
     * @param string $card_color
     *
     * @return Card
     */
    public function setCardColor(string $card_color) : Card
    {
        $this->card_color = $card_color;
        return $this;
    }

    /**
     * @param bool $card_legendary_state
     *
     * @return Card
     */
    public function setCardLegendaryState(bool $card_legendary_state) : Card
    {
        $this->card_legendary_state = $card_legendary_state;
        return $this;
    }

    /**
     * @param string $card_type
     *
     * @return Card
     */
    public function setCardType(string $card_type) : Card
    {
        $this->card_type = $card_type;
        return $this;
    }

    /**
     * @param string $card_subtype
     *
     * @return Card
     */
    public function setCardSubtype(string $card_subtype) : Card
    {
        $this->card_subtype = $card_subtype;
        return $this;
    }

    /**
     * @param string $card_effect
     *
     * @return Card
     */
    public function setCardEffect(string $card_effect) : Card
    {
        $this->card_effect = $card_effect;
        return $this;
    }

    /**
     * @param int $card_power
     *
     * @return Card
     */
    public function setCardPower(int $card_power) : Card
    {
        $this->card_power = $card_power;
        return $this;
    }

    /**
     * @param int $card_toughness
     *
     * @return Card
     */
    public function setCardToughness(int $card_toughness) : Card
    {
        $this->card_toughness = $card_toughness;
        return $this;
    }

    /**
     * @param string $card_rarity
     *
     * @return Card
     */
    public function setCardRarity(string $card_rarity) : Card
    {
        $this->card_rarity = $card_rarity;
        return $this;
    }

    /**
     * @param string $card_edition
     *
     * @return Card
     */
    public function setCardEdition(string $card_edition) : Card
    {
        $this->card_edition = $card_edition;
        return $this;
    }

}