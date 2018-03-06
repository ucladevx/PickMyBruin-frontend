# Understanding container components

## What are they?
* Container components don't actually render any DOM elements (you won't see any jsx in these components unless I was being lazy, sorry). Container components are connected to the redux store via the `mapStateToProps` and `mapDispatchToProps` functions. 
* mapStateToProps is a function that receives the state from redux as the lone argument, and returns a JS object whos keys are props that can be accessed by the component it is connected to.
* simialarly, mapDispatchToProps is a function that receives the dispatch function as its lone argument, and returns a JS object whos keys are props that are accessed by the component is is connected to. When a component needs to make changes to the state, it calls `this.props.updateProfile` for example, where updateProfile is a function we've defined in the reducers folder, and is being accessed by the container component to dispatch an action.
* notice that at the bottom of each container file, we wrap the component with the the `connect` function, which is basically a magic function that lets the container component listen for any changes to the redux store.

## Rendering to the DOM
* each react container component renders a dummy UI component that holds all the DOM elements (we want to make sure that the dummy components don't need to know anything about redux to work. Separation of concerns, modular code, etc). 