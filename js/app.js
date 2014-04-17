/*global Ember, DS, Todos:true */
var TODO_TYPE_must = 1, TODO_TYPE_should = 2, TODO_TYPE_could = 3;

window.Todos = Ember.Application.create();

Todos.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'queues-emberjs'
});
