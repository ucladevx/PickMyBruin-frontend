# Understanding reducers
Checking out https://redux.js.org/ is the best way to understand how redux works as a whole. I'll try to explain some of the specific things we are doing here so you can get started quickly developing

## What is immutable.js?
* Normal javascript objects are **mutable**. That essentially means you can change them wherever you want, and this can lead to inconsistencies across your app. Imagine that you have an object `user` that represents a user that is logged into your app. This `user` object is referenced in multiple places by different components in your app. If you change the `user.name` property in one component, but forget to update it in all other places in your app, you suddenly have data inconsistencies.\

* Immutable.js is a library that gives you all native JS data structures, but in immutable form. This means that once you create a immutable data structure, you can never mutate its properties. Immutable.js provides an API such that when you need to modify the properties of an object, you instead create a whole new object. This is the basis upon which _reducers_ work. Again, check out the redux documentation for a more in depth explanation

## Reducers
* Each file in this directory (besides index.js) represents a part of the redux _store_. For example, profile.js manages `state.Profile`, requests.js manages `state.Requests`
* Each file contains a _reducer function_ which is the very last function in the file. It accepts the current state and actions, switches on the action type, and outputs a new state with some modification. This new state is passed down to all container components that are listening to state changes
* Each file also contains some action emitters, which are _dispatched_ by the container components when they want to make change to the state. These action emitters call `dispatch(actionObject)`, and the new action is passed to the reducer to make changes to the state
* `index.js` merges all the reducers together so that they are accessible in the `state` variable in the container components. If you ever add a reducer, you have to also remember to add it to index.js

* **Key Points**: container components call _action emitter functions_, which _dispatch_ actions, which are received by the _reducer_, which takes the old state and action, and outputs a _brand new state_, which is then passed to the container components. Whew!