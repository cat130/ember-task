/*global Ember, DS, Todos:true */
window.Todos = Ember.Application.create();

//Todos.ApplicationAdapter = DS.FixtureAdapter.extend();

Todos.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'queues-emberjs'
});
