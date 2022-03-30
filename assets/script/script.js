window.addEventListener("load", () => {
    $("#post").focus();
})
document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key === "Enter" && $("#post").is(":focus")) {
        event.preventDefault();
        $("#result").css("overflow-y", "auto");
        let postValue = document.querySelector("#post").value;
        let data      = {};
        if ($("#post_id").is(":checked")) {
            data["id"] = parseInt(postValue);
        }
        else {
            data["name"] = postValue;
        }
        $("#post").val("");
        if (data.id || (data.name && data.name.length && data.name.match(/^[0-9]+$/) === null)) {
            $.get("http://magicajax-php/", data, (el) => {
                let json = JSON.parse(el);
                if (!json.error) {
                    let card = new Card(json.card_name, json.card_cost, json.card_legendary_state, json.card_type, json.card_subtype, json.card_effect, json.card_rarity, json.card_power, json.card_toughness, json.card_color);
                    $("#result").empty().append(card.draw());
                }
            });
        }
        else {
            $("#result").empty().append("Cette ID n'existe pas!");
        }
        $("#post").focus();
    }
    if ($("#getOne").css("display") === "block" && (key === "ArrowLeft" || key === "ArrowRight")) {
        let check = $("#post_id").is(":checked");
        $("#post_id").prop("checked", !(check));
        $("#post_name").prop("checked", check);
        $("#post").focus();
    }
    if (key === "Escape") {
        $("#post").blur();
    }
    if (key === "g" && !$("#post").is(":focus")) {
        $("#getAll").css("display", "none");
        $("#getOne").css("display", "block");
        $("#post").focus();
        setTimeout(() => {
            $("#post").val("");
        }, 1)
    }
    if (key === "a" && !$("#post").is(":focus")) {
        $("#getOne").css("display", "none");
        $("#getAll").css("display", "flex");
        $("#post_All").focus();
    }
    if ($("#post_All").is(":focus") && key === "Enter") {
        event.preventDefault();
        getAllCards();
    }
});
$("#post_All").click((event) => {
    event.preventDefault();
    let data = {"all": true};
    $.get("http://magicajax-php/", data, (el) => {
        let json = JSON.parse(el);
        getAllCards();
    });
})

function getAllCards() {
    $("#result").css("overflow-y", "scroll");
    let data = {"all": true};
    $.get("http://magicajax-php/", data, (el) => {
        let json = JSON.parse(el);
        if (!json.error) {
            $("#result").empty();
            json.forEach(cardObject => {
                let card = new Card(cardObject.card_name, cardObject.card_cost, cardObject.card_legendary_state, cardObject.card_type, cardObject.card_subtype, cardObject.card_effect, cardObject.card_rarity, cardObject.card_power, cardObject.card_toughness, cardObject.card_color);
                $("#result").append(card.draw());
            });
        }
    });
}