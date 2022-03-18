  document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key === "Enter") {
      event.preventDefault();
      let data = {
        id:null,
        name: document.querySelector("#post").value,
      };
      if (data.name.length) {
        $.post("http://magicajax-php/", data, () => {
        });
        $("#post").val("");
      }
    }
  });