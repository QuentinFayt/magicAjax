document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key === "Enter") {
      event.preventDefault();
      let postValue = document.querySelector("#post").value;
      let [id, name] = $("#post_id").is(":checked") ? [parseInt(postValue), ""] : [null, postValue];
      let data = {id, name};
       $("#post").val("");
      if (data.id || data.name.length) {
        $.post("http://magicajax-php/", data, (el) => {
            let json = JSON.parse(el);
            let card = new Card(json.card_name,json.card_cost,json.card_legendary_state,json.card_type,json.card_subtype,json.card_effect,json.card_rarity,json.card_power,json.card_toughness);
            $("#result").empty().append(card.draw());
        });
      }else{
           $("#result").empty().append("Cette ID n'existe pas!");
      }
      $("#post").focus();
    }
   if(key === "ArrowLeft" || key === "ArrowRight"){
       let check = $("#post_id").is(":checked")
       $("#post_id").prop("checked",!(check));
       $("#post_name").prop("checked",check);
       $("#post").focus();
   }
  });