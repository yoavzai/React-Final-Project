
const appReducer = (state= {costumers:[], products:[], purchases:[]}, action) => 
{
  switch(action.type)
  {
    case "updateCostumers" :
      return {...state, costumers: action.payload}

    case "updateProducts" :
      return {...state, products: action.payload}

    case "updatePurchases" :
      return {...state, purchases: action.payload}

    default:
      return state
  }
}

export default appReducer