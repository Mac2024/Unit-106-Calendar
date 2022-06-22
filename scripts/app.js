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
  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    type: "POST",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (response) {
      let savedTask = JSON.parse(response); // parse json response into js opbject
      displayTask(savedTask);
    },
    error: function (details) {
      console.log("Error saving", details);
    },
  });
}
function getStatusText(status) {
  switch (status) {
    case 0:
      return "New";
    case 1:
      return "In Progress";
    case 3:
      return "Blocked";
    case 6:
      return "Completed";
    case 9:
      return "Removed";
    default:
      return "missing";
  }
}

function displayTask(task) {
  let syntax = `<div class = 'task status-${task.status}'>
        <h3>${task.title}</h3>
        <label>${task.location}</label>
        <div class = 'dates'>
            <label>${task.duration}</label>
            <label>${task.deadline}</label>
            <label>${getStatusText(task.status)}</label>
        </div>
    </div>`;

  $("#task-list").append(syntax);
}

function fetchTasks() {
  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    type: "GET",
    contentType: "",
    success: function (response) {
      let tasks = JSON.parse(response); //array of tasks
      for (let i = 0; i < tasks.length; i++) {
        let item = tasks[i];
        if (item.name == "Mario") {
          displayTask(item);
        }
      }

      // for loop, get every object and send it to displayTask
    },
    error: function (dets) {
      console.log("Error fetching tasks", dets);
    },
  });
}
function clearAllTasks() {
  $.ajax({
    type: "DELETE",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Mario",
    success: function () {
      $("#task-list").html("");
    },
    error: function (err) {
      console.error(err);
    },
  });
}
function init() {
  //runTests();
  console.log("task manager");

  // load data
  fetchTasks();

  // hook events
  $("#iImportant").click(toggleImportant);
  $("#btnShowHide").click(togglePanel);
  $("#btnSave").click(saveTask);
  $("#delBtn").click(clearAllTasks);
}

window.onload = init;
