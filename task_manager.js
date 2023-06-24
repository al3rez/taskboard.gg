class TaskManager {
  constructor() {
    this.tasks = this.fetchTasksFromStorage() || [];
  }

  addTask(task) {
    task.id = this.generateTaskId(); // Generate unique task ID
    this.tasks.push(task);
    this.saveTasksToStorage();
  }

  removeTask(task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasksToStorage();
    }
  }

  moveTask(task, category) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index].category = category;
      this.saveTasksToStorage();
    }
  }

  getTasksByCategory(category) {
    return this.tasks.filter((task) => task.category === category);
  }

  getTasksByTag(tag) {
    return this.tasks.filter((task) => task.tags.includes(tag));
  }

  getTasksByPriority(priority) {
    return this.tasks.filter((task) => task.priority === priority);
  }

  getTasksByDueDate(dueDate) {
    return this.tasks.filter((task) => task.dueDate === dueDate);
  }

  saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  fetchTasksFromStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : null;
  }

  generateTaskId() {
    return "task-" + Date.now();
  }
}
