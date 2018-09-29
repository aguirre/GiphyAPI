var topics = [
  "Red Bull Rampage",
  "Snowboarding",
  "Nitro Circus",
  "Pikes Peak",
  "Group B"
];

// Add Buttons to gifBox
function addButton() {
  $("#buttonBox").empty();
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("gifButton btn-lg btn-info");
    newButton.attr("gifName", topics[i]);
    newButton.text(topics[i]);
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
    "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    topics.push(gif);
    addButton();
  });
});

// Function to display gifs
function displayGifs() {
  var gif = $(this).attr("gifName");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    gif +
    "&api_key=dc6zaTOxFJmzC&limit=9";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#gifBox").empty();
    for (var i = 0; i < response.data.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("col-md-4 imgDiv");
      newDiv.html(
        "<small class='topRight'>Rating: " +
          response.data[i].rating.toUpperCase() +
          "</small>"
      );
      var gifImg = $(
        "<img src='" + response.data[i].images.fixed_height_still.url + "'>"
      );
      gifImg.addClass("play");
      gifImg.attr("data-state", "still");
      gifImg.attr("data-name", gif);
      gifImg.attr("data-still", response.data[i].images.fixed_height_still.url);
      gifImg.attr("data-animate", response.data[i].images.fixed_height.url);

      $(newDiv).append(gifImg);
      $("#gifBox").append(newDiv);
    }
  });
}

// Function to Play and Pause Gifs
function playGif() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

// On Click for Buttons and Gifs
$(document).on("click", ".gifButton", displayGifs);
$(document).on("click", ".play", playGif);

addButton();
