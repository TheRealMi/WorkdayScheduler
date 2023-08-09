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
    var hour = $("#hour-" + i)
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
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  function saveEvent(event){
    var clickedButton = $(event.target);
    var textArea = clickedButton.siblings("textarea");
    var timeId = clickedButton.parent().attr("id");

    localStorage.setItem(timeId, textArea.val());
    
  }

  saveBtn.on("click", saveEvent) //this is the event listener

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
