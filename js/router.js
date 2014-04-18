/*global Ember, Todos */
(function () {
  'use strict';

  Todos.Router.map(function () {
    this.resource('todos', { path: '/' }, function () {
      this.route('active');
      this.route('completed');
      this.route('must', { path: '/must/:completed' });
      this.route('should', { path: '/should/:completed' });
      this.route('could', { path: '/could/:completed' });
    });
  });

  Todos.TodosRoute = Ember.Route.extend({
    model: function () {
      return this.store.find('todo');
    }
  });

  Todos.TodosIndexRoute = Ember.Route.extend({
    setupController: function () {
      this.controllerFor('todos').set('filteredTodos', this.modelFor('todos'));
      Ember.set('Todos.TodosController.typeForState', ALL_TYPES);
    }
  });

  // states
  Todos.TodosActiveRoute = Ember.Route.extend({
    setupController: function () {
      var todos = this.store.filter('todo', filterActive);
      this.controllerFor('todos').set('filteredTodos', todos);
      Ember.set('Todos.TodosController.typeForState', "false");
    }
  });

  Todos.TodosCompletedRoute = Ember.Route.extend({
    setupController: function () {
      var todos = this.store.filter('todo', filterCompleted);
      this.controllerFor('todos').set('filteredTodos', todos);
      Ember.set('Todos.TodosController.typeForState', "true");
    }
  });

  // utils functions 
  function filterCompleted(obj) { 
    return obj.get('isCompleted'); // in fact data in obj._data.isCompleted
  }

  function filterActive(obj) {
    return !obj.get('isCompleted');
  }

  function doFilterForState(todos, prm) {
    // if (prm.completed !== ALL_TYPES) { // c prm.completed получилась фигня шаблон страницы не обновился и параметр всегда prm.completed === ALL_TYPES
    // return todos.filter('todo', new Boolean(prm.completed) ? filterCompleted : filterActive);

    if (Ember.get('Todos.TodosController.typeForState') !== ALL_TYPES) {
      var fuckVar = Ember.get('Todos.TodosController.typeForState');
      console.log('Filtered by ' + fuckVar);
      return todos.then('todo', new Boolean(fuckVar) ? filterCompleted : filterActive);
    }
    else console.log('filter is not applied');
    return todos;
}

  // types

	Todos.TodosMustdRoute = Ember.Route.extend({
	  setupController: function (emb, prm) {
	    var todos = this.store.filter('todo', function (todo) {
	      return todo.get('type') == TODO_TYPE_must;
	    });
	    todos = doFilterForState(todos, prm);
	    this.controllerFor('todos').set('filteredTodos', todos);
	    Todos.TodosController.currentState = TODO_TYPE_must;
	  }
	});

	Todos.TodosShouldRoute = Ember.Route.extend({
	  setupController: function (emb, prm) {
	    var todos = this.store.filter('todo', function (todo) {
	      return todo.get('type') == TODO_TYPE_should;
	    })
	    todos = doFilterForState(todos, prm);
	    this.controllerFor('todos').set('filteredTodos', todos);
	    Todos.TodosController.currentState = TODO_TYPE_should;
	  }
	});

	Todos.TodosCouldRoute = Ember.Route.extend({
	  setupController: function (emb, prm) {
	    var todos = this.store.filter('todo', function (todo) {
	      return todo.get('type') == TODO_TYPE_could;
	    });
	    todos = doFilterForState(todos, prm);
      this.controllerFor('todos').set('filteredTodos', todos);
      Todos.TodosController.currentState = TODO_TYPE_could;
     // Ember.set('Todos.TodosController.currentState', TODO_TYPE_could);
	  }
	});

})();
