class Card {
    constructor(name, cost=null, legendaryState=null, type, subType=null, effect, rarity, power=null, toughness=null) {
        this.name = name;
        this.cost = cost;
        this.legendaryState = legendaryState;
        this.type = type;
        this.subType = subType;
        this.effect = effect;
        this.rarity = rarity;
        this.power = power;
        this.toughness = toughness;
    }
    draw(){
        return `
        <div>
            <div class="nom">
                <p>${this.name}</p>
                <p>${this.cost}</p>
            </div>
            <div class="img">
               <img/>
            </div>
            <div class="type">`
               +(this.legendaryState?"<p>Legendary</p>":"")+
               `<p>${this.type}</p>`
               +(this.subType?`<p>${this.subType}</p>`:"")+`
            </div>
            <div class="text">
                <p>${this.effect}</p>
            </div>
            <div class="rarity">
                <p>${this.rarity}</p>`
               +(this.type.toLowerCase()==="creature"?`<div><p>${this.power}</p><p>|</p><p>${this.toughness}</p>`:"")+`
                </div>
            </div>
        </div>
        `;
    }
}