  document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key === "Enter") {
      event.preventDefault();
      let postValue = document.querySelector("#post").value;
      let [id, name] = $("#post_id").is(":checked") ? [postValue, null] : ["", postValue];
      let data = {id, name};
      if (data.id || data.name.length) {
        $.post("http://magicajax-php/", data, () => {
        });
        $("#post").val("");
      }
    }
   /*if(key === "")*/
  });