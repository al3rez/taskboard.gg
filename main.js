$(function () {
  // Initialize the TaskManager
  var taskManager = new TaskManager();

  // Load tasks from storage
  taskManager.tasks.forEach(function (task) {
    addTaskToList(task);
  });

  // Add Task button click event
  $("#add-task-button").on("click", function () {
    $("#add-task-dialog").dialog("open");
  });

  // Add Task dialog
  $("#add-task-dialog").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
      "Add Task": function () {
        var taskName = $("#task-name").val();
        var taskCategory = $("#task-category").val();
        var taskTags = $("#task-tags").val().split(",");
        var taskPriority = $("#task-priority").val();
        var taskDueDate = $("#task-due-date").val();

        var task = {
          name: taskName,
          category: taskCategory,
          tags: taskTags,
          priority: taskPriority,
          dueDate: taskDueDate,
        };

        addTaskToList(task);
        taskManager.addTask(task);

        $(this).dialog("close");
        clearAddTaskForm();
      },
      Cancel: function () {
        $(this).dialog("close");
        clearAddTaskForm();
      },
    },
  });

  // Helper function to add a task to the appropriate task list
  function addTaskToList(task) {
    var taskListId = "#" + task.category + "-tasks";
    var taskItem = createTaskListItem(task);
    $(taskListId).append(taskItem);
  }

  // Helper function to create a task list item with due date color
  function createTaskListItem(task) {
    var dueDateColor = getDueDateColor(task.dueDate);
    var dueDateText = getDueDateText(task.dueDate);

    var taskListItem = $("<li>")
      .text(task.name + " (due: ")
      .append(
        $("<span>").text(dueDateText.toLowerCase()).css("color", dueDateColor)
      )
      .append(")")
      .attr("data-category", task.category)
      .attr("data-tags", task.tags.join(","))
      .attr("data-priority", task.priority)
      .attr("data-due-date", task.dueDate)
      .appendTo("#" + task.category + "-tasks");

    return taskListItem;
  }

  // Helper function to get the due date color based on the time remaining
  function getDueDateColor(dueDate) {
    var dueDateObj = new Date(dueDate);
    var today = new Date();
    var timeRemaining = dueDateObj.getTime() - today.getTime();
    var oneDay = 24 * 60 * 60 * 1000;
    var oneWeek = 7 * oneDay;

    if (timeRemaining < 0) {
      return "red"; // Due date has passed
    } else if (timeRemaining <= oneDay) {
      return "orange"; // Less than or equal to one day remaining
    } else if (timeRemaining <= oneWeek) {
      return "green"; // Less than or equal to one week remaining
    } else {
      return "inherit"; // Default color
    }
  }

  // Helper function to get the formatted due date text
  function getDueDateText(dueDate) {
    var dueDateObj = new Date(dueDate);
    var today = new Date();
    var timeRemaining = dueDateObj.getTime() - today.getTime();
    var oneDay = 24 * 60 * 60 * 1000;
    var daysRemaining = Math.ceil(timeRemaining / oneDay);

    if (timeRemaining < 0) {
      return "Overdue";
    } else if (timeRemaining < oneDay) {
      return "Today";
    } else if (timeRemaining < 2 * oneDay) {
      return "Tomorrow";
    } else if (timeRemaining < 7 * oneDay) {
      return "in " + daysRemaining + " days";
    } else {
      return "in more than a week";
    }
  }

  // Helper function to clear the Add Task form
  function clearAddTaskForm() {
    $("#task-name").val("");
    $("#task-category").val("process");
    $("#task-tags").val("");
    $("#task-priority").val("low");
    $("#task-due-date").val("");
  }
});
