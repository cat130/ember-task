/*global Todos, Ember */
var TODO_TYPE_must = 1, TODO_TYPE_should = 2, TODO_TYPE_could = 3, ALL_TYPES = 'ALL_TYPES';

(function () {
  'use strict';

	Todos.TodosController = Ember.ArrayController.extend({
		actions: {
			createTodo: function () {
				var title, todo;

				// Get the todo title set by the "New Todo" text field
				title = this.get('newTitle').trim();
				if (!title) {
					return;
				}

				// Create the new Todo model
				todo = this.store.createRecord('todo', {
					title: title,
					isCompleted: false,
					type: Todos.TodosController.currentState
				});
				todo.save();

				// Clear the "New Todo" text field
		//		this.set('newTitle', 'my URGENT Task &#8364 xxx.length + 1'); // ?? Todos.TodosController.remainingCurrentQueue.length
		//		this.set('newTitle', 'my URGENT Task &#8364 ' + Todos.TodosController.remainingMust.length);
		//		this.set('newTitle', 'my URGENT Task &#8364 ' + Ember.computed.filterBy('content', 'type', Todos.TodosController.currentState).length);
		//		this.set('newTitle', 'my URGENT Task &#8364 ' + filteredTodos.length);
				this.set('newTitle', 'my URGENT Task # ');
			},

			clearCompleted: function () {
				var completed = this.get('completed');
				completed.invoke('deleteRecord');
				completed.invoke('save');
			},
		},

		/* properties */

		remainingMust: Ember.computed.filterBy('content', 'type', TODO_TYPE_must),
		remainingShould: Ember.computed.filterBy('content', 'type', TODO_TYPE_should),
		remainingCould: Ember.computed.filterBy('content', 'type', TODO_TYPE_could),

		//remainingCurrentQueue: Ember.computed.filterBy('content', 'type', Todos.TodosController.currentState),

		remaining: Ember.computed.filterBy('content', 'isCompleted', false),
		completed: Ember.computed.filterBy('content', 'isCompleted', true),

		allAreDone: function (key, value) {
			if (value !== undefined) {
				this.setEach('isCompleted', value);
				return value;
			} else {
				var length = this.get('length');
				var completedLength = this.get('completed.length');

				return length > 0 && length === completedLength;
			}
		}.property('length', 'completed.length'),
	  typeForState : ALL_TYPES // string empty by dfault == all ()
});

Todos.TodosController.currentState = TODO_TYPE_must;

})();
