var gifList = [
  "Red Bull Rampage",
  "Snowboarding",
  "Nitro Circus",
  "Pikes Peak",
  "Group B"
];

// Add Buttons to gifBox
function addButton() {
  $("#buttonBox").empty();
  for (var i = 0; i < gifList.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("btn-lg btn-info");
    newButton.attr("gifName", gifList[i]);
    newButton.text(gifList[i]);
    $("#buttonBox").append(newButton);
  }
}

// Click Function for Submit Button
$("#addGifs").on("click", function(e) {
  event.preventDefault();
  var gif = $("#addSearch")
    .val()
    .toLowerCase()
    .trim();
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    gif +
    "&api_key=dc6zaTOxFJmzC&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    gifList.push(gif);
    addButton();
  });
});

addButton();
