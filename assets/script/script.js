window.addEventListener("load", () => {
    $("#post").focus();
})
document.addEventListener("keydown", (event) => {
    let key = event.key;
    if ((key === "g" || key === "G") && !$(".writing").is(":focus")) {
        $(".validationPost").remove();
        $(".result").removeClass("validation");
        changeDisplay([{"#getAll": "none"}, {"#postOne": "none"}, {"#result": "flex"}, {"#getOne": "block"}]);
        setTimeout(() => {
            $("#post").focus();
            setTimeout(() => {
                $("#post").val("");
            }, 1)
        }, 1)
    }
    if ($("#getOne").css("display") === "block" && (key === "ArrowLeft" || key === "ArrowRight")) {
        let check = $("#post_id").is(":checked");
        $("#post_id").prop("checked", !(check));
        $("#post_name").prop("checked", check);
        $("#post").focus();
    }
    if ((key === "a" || key === "A") && !$(".writing").is(":focus")) {
        $(".validationPost").remove();
        $(".result").removeClass("validation");
        changeDisplay([{"#getAll": "flex"}, {"#postOne": "none"}, {"#result": "flex"}, {"#getOne": "none"}]);
        $("#post_All").focus();
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
    if ((key === "p" || key === "P") && !$(".writing").is(":focus")) {
        $(".validationPost").remove();
        $(".result").removeClass("validation");
        changeDisplay([{"#getAll": "none"}, {"#postOne": "flex"}, {"#result": "none"}, {"#getOne": "none"}]);
    }
    if (key === "Escape") {
        $(".writing").each((e, o) => {
            if (o === document.activeElement) {
                o.blur();
            }
        });
    }
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
            $.get("http://magicajax-php/", data, (json) => {
                //let json = JSON.parse(el);
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
    if ($("#post_All").is(":focus") && key === "Enter") {
        event.preventDefault();
        getAllCards();
    }
    if ($(".postOne").css("display") === "flex" && key === "Enter" && !$(".effect").is(":focus")) {
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
                    card_power          : $("#power").val() ? $("#power").val() : 0,
                    card_toughness      : $("#toughness").val() ? $("#toughness").val() : 0,
                    card_rarity         : $("#rarity").val(),
                    card_edition        : $("#edition").val(),
                }
                changeDisplay([{"#postOne": "none"}, {"#result": "flex"}]);
                $("#result").css("overflow-y", "inherit");
                $(".result").empty();
                setTimeout(() => {
                    $(".result").addClass("validation");
                    $(`<h2 class="validationPost">Appuyez sur Enter pour valider</h2>`).insertAfter("#result");
                }, 1000)

                let card = new Card(cardObject.card_name, cardObject.card_cost, cardObject.card_legendary_state, cardObject.card_type, cardObject.card_subtype, cardObject.card_effect, cardObject.card_rarity, cardObject.card_power, cardObject.card_toughness, cardObject.card_color);
                sessionStorage.setItem("customCard", JSON.stringify(cardObject));
                $("#result").append(card.draw());
            }
            else {
                alert("Une cr??ature doit avoir une force et une endurance!");
            }
        }
        else {
            alert("Un des champs obligatoire n'est pas rempli!");
        }
    }
    if ($("#result").is(".validation") && key === "Enter") {
        $(".validationPost").remove();
        let data = {card: JSON.parse(sessionStorage.getItem("customCard"))};
        $.post("http://magicajax-php/", data, (json) => {
            if (json.result === "success") {
                sessionStorage.removeItem("customCard");
                alert("La carte a bien ??t?? ins??r??e!")
            }
            else {
                alert("La carte n'a malheureusement pas pu ??tre ins??r??e, elle est peut ??tre d??j?? pr??sente!");
            }
            $(".result").removeClass("validation");
        });
    }
});

$(".effect").contextmenu(customMenu);
$("html").click((event) => {
    if (event.target.offsetParent !== document.querySelector("#context-menu")) {
        $("#context-menu").remove();
    }
    else {
        let caracterToAdd = "";
        switch (event.target.id) {
            case "#conMTap":
                caracterToAdd = "-_Tap_-";
                break;
            case "#conMInco":
                caracterToAdd = "-_X-N_-";
                break;
            case "#conMWhite":
                caracterToAdd = "-_X-W_-";
                break;
            case "#conMBlue":
                caracterToAdd = "-_X-Bu_-";
                break;
            case "#conMBlack":
                caracterToAdd = "-_X-B_-";
                break;
            case "#conMRed":
                caracterToAdd = "-_X-R_-";
                break;
            case "#conMGreen":
                caracterToAdd = "-_X-G_-";
                break;
        }
        let effect   = document.querySelector(".effect");
        effect.value = addString(effect.value, effect.selectionStart, caracterToAdd);
    }
})


function changeDisplay(arrayObj) {
    arrayObj.forEach((obj) => {
        let key = Object.keys(obj)[0];
        $(key).css("display", `${obj[key]}`);
    });
}

function getAllCards() {
    $("#result").css("overflow-y", "scroll");
    let data = {"all": true};
    $.get("http://magicajax-php/", data, (json) => {
        if (!json.error) {
            $("#result").empty();
            json.forEach(cardObject => {
                let card = new Card(cardObject.card_name, cardObject.card_cost, cardObject.card_legendary_state, cardObject.card_type, cardObject.card_subtype, cardObject.card_effect, cardObject.card_rarity, cardObject.card_power, cardObject.card_toughness, cardObject.card_color);
                $("#result").append(card.draw());
            });
        }
    });
}

$("#post_All").click((event) => {
    event.preventDefault();
    getAllCards();
})
let selectedType = $(".postOne select[id='type']");
selectedType.change(() => {
    let arraySelectorProperty = [];
    switch (selectedType.val()) {
        case "Land":
            arraySelectorProperty.push({".postOne .cost": "none"}, {".postOne .powtoughPost": "none"}, {".postOne .color": "flex"});
            break;
        case "Artifact":
        case "Creature":
            arraySelectorProperty.push({".postOne .cost": "flex"}, {".postOne .powtoughPost": "flex"}, {".postOne .color": "none"});
            break;
        default:
            arraySelectorProperty.push({".postOne .cost": "flex"}, {".postOne .powtoughPost": "none"}, {".postOne .color": "none"});
    }
    changeDisplay(arraySelectorProperty);
})

function customMenu(e) {
    e.preventDefault();
    let {clientX: mouseX, clientY: mouseY} = e;
    if ($("#context-menu").length) {
        $("#context-menu").remove();
    }
    $("body").append(`
        <div id="context-menu" style="top:${mouseY}px;left:${mouseX}px">
            <p>Add:</p>
            <div class="opt" id="#conMTap">Tap</div>
            <div class="opt" id="#conMInco">X Incolore</div>
            <div class="opt" id="#conMWhite">X Blanc</div>
            <div class="opt" id="#conMBlue">X Bleu</div>
            <div class="opt" id="#conMBlack">X Noir</div>
            <div class="opt" id="#conMRed">X Rouge</div>
            <div class="opt" id="#conMGreen">X Vert</div>
        </div>
    `);
}

function addString(str, index, stringToAdd) {
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}