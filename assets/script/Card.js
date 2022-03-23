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
        this.effect         = this.costInEffect(this.effect);
        this.checkColor();
    }

    checkColor() {
        if (this.color.split("-").length > 1) {
            this.cardboard_color = "mul";
        }
        else {
            this.cardboard_color = this.color.toLowerCase();
        }
    }

    costDisplay(el) {
        let costs = el.split("_");
        let str   = "";
        costs.forEach((cost) => {
            cost = cost.split("-");

            if (cost[1] !== "N") {
                str += `<img class="ico" src="./assets/images/ico/${cost[1]}.png" alt="ico">`.repeat(cost[0]);
            }
            else {
                str += `<span class="unco">${cost[0]}</span>`;
            }
            if (cost[0] === "Tap") {
                str += `<img class="ico" src="./assets/images/ico/${cost[0]}.png" alt="ico">`;
            }
        });
        return str;
    }

    brtxt(text) {
        return text.replaceAll("\n", "<br/>");
    }

    costInEffect(text) {
        [...text.matchAll(/(?<=-_)(.*?)(?=_-)/g)].forEach(match => {
            text = text.replaceAll(`-_${match[0].toString()}_-`, this.costDisplay(match[0].toString()));
        });
        return text;
    }

    draw() {
        return `
        <div class="card ${this.cardboard_color}">
            <div class="nom ${this.cardboard_color}">
                <p>${this.name}</p>
                <div>${this.costDisplay(this.cost)}</div>
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
                <p>${this.brtxt(this.effect)}</p>
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