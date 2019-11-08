// https://jp.vuejs.org/v2/examples/todomvc.html
let STORAGE_KEY = 'simple-todo-list'
let todoStorage = {
  fetch: function() {
    let todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

let app = new Vue({
  el: "#app",
  data: {
    todos: []
  },
  methods: {
    doAdd: function(event, value){
      let comment = this.$refs.comment;

      //no input
      if (!comment.value.length){
        return ;
      }

      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      });

      comment.value ="";
    },

    doChangeState: function(item){
      item.state = item.state ? 0 : 1;
    },

    doRemove: function(item){
      let index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
    }
  },
  watch: {
    todos: {
      handler: function(todos){
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  created(){
    this.todos = todoStorage.fetch();
  }
});


