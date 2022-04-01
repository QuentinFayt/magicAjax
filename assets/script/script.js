window.addEventListener("load", () => {
    $("#post").focus();
})
document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key === "Enter" && $("#post").is(":focus")) {
        event.preventDefault();
        $("#result").css("overflow-y", "inherit");
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
                else {
                    $("#result").empty().append("Cette ID n'existe pas!");
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
        $(".writing").each((e, o) => {
            if (o === document.activeElement) {
                o.blur();
            }
        });
    }
    if (key === "g" && !$(".writing").is(":focus")) {
        $(".validationPost").remove();
        $(".result").removeClass("validation");
        $("#getAll").css("display", "none");
        $("#postOne").css("display", "none");
        $("#result").css("display", "flex");
        $("#getOne").css("display", "block");
        setTimeout(() => {
            $("#post").focus();
            setTimeout(() => {
                $("#post").val("");
            }, 1)
        }, 1)
    }
    if (key === "a" && !$(".writing").is(":focus")) {
        $(".validationPost").remove();
        $(".result").removeClass("validation");
        $("#getOne").css("display", "none");
        $("#postOne").css("display", "none");
        $("#result").css("display", "flex");
        $("#getAll").css("display", "flex");
        $("#post_All").focus();
    }
    if (key === "p" && !$(".writing").is(":focus")) {
        $(".validationPost").remove();
        $(".result").removeClass("validation");
        $("#getOne").css("display", "none");
        $("#getAll").css("display", "none");
        $("#result").css("display", "none");
        $("#postOne").css("display", "flex");
    }
    if ($("#post_All").is(":focus") && key === "Enter") {
        event.preventDefault();
        getAllCards();
    }
    if ($("#getAll").css("display") === "flex" && (key === "ArrowDown" || key === "ArrowUp")) {
        let scrollWindow = document.querySelector("#result");
        let pos          = scrollWindow.scrollTop;
        if (key === "ArrowDown") {
            pos += 560;
            scrollWindow.scroll(0, pos)
        }
        if (key === "ArrowUp") {
            pos -= 560;
            scrollWindow.scroll(0, pos)
        }
    }
    if ($(".postOne").css("display") === "flex" && key === "Enter") {
        event.preventDefault();
        if ($("#card_name").val() !== "" &&
            ($("#legendaryStatePostTrue").is(":checked") ||
             $("#legendaryStatePostFalse").is(":checked")) &&
            $("#type") &&
            $("#effect").val() !== "" &&
            $("#rarity") &&
            $("#edition") !== "") {

            let cost   = {
                N : parseInt($("input[name='cost'][id='inCoCost']").val(), 10),
                W : parseInt($("input[name='cost'][id='whiteCost']").val(), 10),
                Bu: parseInt($("input[name='cost'][id='blueCost']").val(), 10),
                B : parseInt($("input[name='cost'][id='blackCost']").val(), 10),
                R : parseInt($("input[name='cost'][id='redCost']").val(), 10),
                G : parseInt($("input[name='cost'][id='greenCost']").val(), 10),
            };
            let colors = [];
            if (cost.W > 0 || cost.Bu > 0 || cost.B > 0 || cost.R > 0 || cost.G > 0) {
                for (let [color, amount] of Object.entries(cost)) {
                    if (amount) {
                        let colorName = "";
                        switch (color) {
                            case "W":
                                colorName = "White";
                                break;
                            case "Bu":
                                colorName = "Blue";
                                break;
                            case "B":
                                colorName = "Black";
                                break;
                            case "R":
                                colorName = "Red";
                                break;
                            case "G":
                                colorName = "Green";
                                break;
                        }
                        if (colorName) {
                            colors.push(colorName);
                        }
                    }
                }
            }
            else {
                $("input[name='color']:checked").serializeArray().forEach((el) => {
                    colors.push(el.value);
                })
            }
            if (($("#type").val() === "Creature" &&
                 $("#power").val() !== ""
                 && $("#toughness").val() !== ""
                 && $("#power").val() >= 0
                 && $("#toughness").val() >= 0)
                || $("#type").val() !== "Creature") {


                let cardObject = {
                    card_name           : $("#card_name").val(),
                    card_cost           : `${cost.N ? cost.N + "-N_" : ""}${cost.W ? cost.W + "-W_" : ""}${cost.Bu ? cost.Bu + "-Bu_" : ""}${cost.B ? cost.B + "-B_" : ""}${cost.R ? cost.R + "-R_" : ""}${cost.G ? cost.G + "-G_" : ""}`.slice(0, -1),
                    card_legendary_state: $("#legendaryStatePostTrue").is(":checked"),
                    card_type           : $("#type").val(),
                    card_subtype        : $("#subtype").val(),
                    card_color          : colors.length ? colors.join("-") : "ColorLess",
                    card_effect         : $("#effect").val(),
                    card_power          : $("#power").val(),
                    card_toughness      : $("#toughness").val(),
                    card_rarity         : $("#rarity").val(),
                    card_edition        : $("#edition").val(),
                }
                $(".postOne").css("display", "none")
                $("#result").css("overflow-y", "inherit");
                $(".result").empty();
                setTimeout(() => {
                    $(".result").addClass("validation");
                    $(`<h2 class="validationPost">Appuyez sur Enter pour valider</h2>`).insertAfter("#result");
                }, 1000)
                $(".result").css("display", "flex");

                let card = new Card(cardObject.card_name, cardObject.card_cost, cardObject.card_legendary_state, cardObject.card_type, cardObject.card_subtype, cardObject.card_effect, cardObject.card_rarity, cardObject.card_power, cardObject.card_toughness, cardObject.card_color);
                sessionStorage.setItem("customCard", JSON.stringify(cardObject));
                $("#result").append(card.draw());
            }
            else {
                alert("Une créature doit avoir une force et une endurance!");
            }
        }
        else {
            alert("Un des champs obligatoire n'est pas rempli!");
        }
    }
    if ($("#result").is(".validation") && key === "Enter") {
        $(".validationPost").remove();
        let data = {card: JSON.parse(sessionStorage.getItem("customCard"))};
        $.post("http://magicajax-php/", data, (el) => {
            sessionStorage.removeItem("customCard");
            $(".result").removeClass("validation");
        });
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

let selectedType = $(".postOne select[id='type']");
selectedType.change(() => {
    switch (selectedType.val()) {
        case "Land":
            $(".postOne .cost").css("display", "none");
            $(".postOne .powtoughPost").css("display", "none");
            $(".postOne .color").css("display", "flex");
            break;
        case "Artifact":
        case "Creature":
            $(".postOne .color").css("display", "none");
            $(".postOne .powtoughPost").css("display", "flex");
            $(".postOne .cost").css("display", "flex");
            break;
        default:
            $(".postOne .cost").css("display", "flex");
            $(".postOne .powtoughPost").css("display", "none");
            $(".postOne .color").css("display", "none");
    }
})