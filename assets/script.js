// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //var for id "currentDay" using jQuery
  var currentDayEl = $("#currentDay");
  var currentDayTime = dayjs().format("dddd, MMMM D");
  var saveBtn = $(".saveBtn");

  //Set text to be current day
  currentDayEl.text(currentDayTime);

  //use Day.js to get current hour
  var currentHour = dayjs().hour();

  /*Loop through hours displayed on calendar (9am-5pm) (military time 5PM = 17)
  Loop checks if id is past present or future
  */
  for (let i = 9; i < 18; i++) {
    var hour = $("#hour-" + i);
    //grab user input from local storage
    var event = localStorage.getItem("hour-"+i);
    //populate textarea with user input from local storage
    hour.children("textarea").val(event);
    //apply present, past, or future classes to div where text goes for proper styling 
    if (i === currentHour) {
      hour.addClass("present");
    }
    else if (i < currentHour) {
      hour.addClass("past");
    }
    else if (i > currentHour) {
      hour.addClass("future");
    }
  }

  //save user input in textarea to local storage using parent-child relationships to grab elements 
  function saveEvent(event){
    var clickedButton = $(event.target);
    var textArea = clickedButton.siblings("textarea");
    var timeId = clickedButton.parent().attr("id");

    localStorage.setItem(timeId, textArea.val());
  }

  saveBtn.on("click", saveEvent) //this is the event listener for the save button

});
