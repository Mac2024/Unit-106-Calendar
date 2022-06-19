const nonImpIcon = "far fa-star";
const impIcon = "fas fa-star";
var isImportant = false;
var isVisible = true;

function toggleImportant() {
  console.log("Icon clicked!");

  if (isImportant) {
    $("#iImportant").removeClass(impIcon).addClass(nonImpIcon);
  } else {
    $("#iImportant").removeClass(nonImpIcon).addClass(impIcon);
    isImportant = true;
  }
}
function togglePanel() {
  if (isVisible) {
    $("#pnlForm").fadeOut();
    isVisible = false;
  } else {
    $("#pnlForm").fadeIn();
    isVisible = true;
  }
}

function saveTask() {
  console.log("Saving");
  let title = $("#txtTitle").val();
  let duration = $("#txtDuration").val();
  let deadline = $("#selDeadline").val();
  let location = $("#txtLocation").val();
  let status = $("#selStatus").val();
  let important = $("#iImportant").val();
  console.log(title, duration, deadline, location, status, important);

  let task = new Task(
    0,
    title,
    duration,
    deadline,
    location,
    status,
    isImportant
  );
  console.log(task);

  displayTask(task);
}
function displayTask(task) {
  let syntax = `<div class = 'task'>
        <h3>${task.title}</h3>
        <label>${task.location}</label>
        <div class = 'dates'>
            <label>${task.duration}</label>
            <label>${task.deadline}</label>
        </div>
    </div>`;

  $("#task-list").append(syntax);
}

function init() {
  //runTests();
  console.log("task manager");

  // load data

  // hook events
  $("#iImportant").click(toggleImportant);
  $("#btnShowHide").click(togglePanel);
  $("#btnSave").click(saveTask);
}

window.onload = init;
