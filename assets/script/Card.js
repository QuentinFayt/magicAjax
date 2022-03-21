class Card {
    cardboard_color;

    constructor(name, cost = null, legendaryState = null, type, subType = null, effect, rarity, power = null, toughness = null, color = null) {
        this.name           = name;
        this.cost           = cost;
        this.legendaryState = legendaryState;
        this.type           = type;
        this.subType        = subType;
        this.effect         = effect;
        this.rarity         = rarity;
        this.power          = power;
        this.toughness      = toughness;
        this.color          = color;
        this.checkColor();
    }

    checkColor() {
        if (this.color.split("-").length > 1) {
            this.cardboard_color = "mul";
        }
        else {
            this.cardboard_color = "bl";
        }
    }

    draw() {
        return `
        <div class="card ${this.cardboard_color}">
            <div class="nom ${this.cardboard_color}">
                <p>${this.name}</p>
                <p>${this.cost}</p>
            </div>
            <div class="img">
               <img src="./assets/images/${this.name}.jpg" alt="pic"/>
            </div>
            <div class="type ${this.cardboard_color}">`
               + (this.legendaryState ? "<p>Legendary</p>" : "") +
               `<p>${this.type}</p>`
               + (this.subType ? `<p>${this.subType}</p>` : "") + `
            </div>
            <div class="text ${this.cardboard_color}">
                <p>${this.effect}</p>
            </div>
            <div class="rarity">
                <p>${this.rarity}</p>`
               + (this.type.toLowerCase() === "creature" ? `<div class="powtough ${this.cardboard_color}"><p>${this.power}</p><p>|</p><p>${this.toughness}</p>` : "") + `
                </div>
            </div>
        </div>
        `;
    }
}