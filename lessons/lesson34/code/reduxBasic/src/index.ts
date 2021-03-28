// import { configureStore, Reducer } from './configureStore';

(document.getElementById("app") as HTMLElement).innerHTML = `Redux`;

// type State = {
//   counter: number
// };

// type Action = {
//   type: 'inc'
// } | {
//   type: 'dec'
// } | {
//   type: 'plus',
//   payload: number
// }

// const reducer: Reducer<State, Action> = (state = { counter: 5}, action)=> {
//   switch(action.type) {
//     case('inc'): {
//       return {
//         ...state,
//         counter: state.counter + 1
//       }
//     }
//     case('dec'): {
//       return {
//         ...state,
//         counter: state.counter - 1
//       }
//     }
//     case('plus'): {
//       return {
//         ...state,
//         counter: state.counter + action.payload
//       }
//     }
//   }
//   return state;
// }

// const store = configureStore(reducer);

// (document.getElementById("app") as HTMLElement).innerHTML = `
//   <h1>Counter: ${store.getState()?.counter}</h1>
//   <button class="inc">inc</button>
//   <button class="dec">dec</button>
//   <br />
//   <input type="number" value="3" /><button class="plus">plus</button>
// `;

// const incButton = document.querySelector('.inc') as HTMLButtonElement;
// const decButton = document.querySelector('.dec') as HTMLButtonElement;
// const plusButton = document.querySelector('.plus') as HTMLButtonElement;
// const numberInput = document.querySelector('input[type="number"]') as HTMLInputElement;
// const header = document.querySelector('h1') as HTMLHeadElement;

// incButton.addEventListener('click', () => store.dispatch({
//   type: 'inc'
// }));

// decButton.addEventListener('click', () => store.dispatch({
//   type: 'dec'
// }));

// plusButton.addEventListener('click', () => store.dispatch({
//   type:'plus',
//   payload: Number(numberInput.value)
// }));

// store.subscribe(() => header.innerHTML = `Counter: ${store.getState()?.counter}`);
