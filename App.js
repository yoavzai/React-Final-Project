
import "./App.css"
import {Route, Routes} from "react-router-dom"
import CostumerComp from "./components/Costumers";
import EditCostumerComp from "./components/EditCostumer";
import EditProductComp from "./components/EditProduct";
import MainComp from "./components/HomePage";
import ProductsComp from "./components/Products";
import PurchasesComp from "./components/Purchases";
import {useDispatch} from "react-redux"
import { useEffect } from "react";
import db from "./components/firestore";

function App() {
  
  const dispatch = useDispatch()

  useEffect (() => {

    db.collection("costumers").onSnapshot(snapshot =>
      {
        const costumers = snapshot.docs.map(docSnap => 
          {
            const data = docSnap.data()
            return ({id: docSnap.id,
                city: data.city,
                fname: data.fname,
                lname: data.lname})
          })
        dispatch({type: "updateCostumers", payload: costumers})
      })

    db.collection("products").onSnapshot(snapshot =>
      {
        const products = snapshot.docs.map(docSnap => 
          {
            const data = docSnap.data()
            return ({id: docSnap.id,
              name: data.name,
              price: data.price,
              quantity: data.quantity})
          })
        dispatch({type: "updateProducts", payload: products})
      })

    db.collection("purchases").onSnapshot(snapshot =>
      {
        const purchases = snapshot.docs.map(docSnap => 
          {
            const data = docSnap.data()
            return ({id: docSnap.id,
              costumerId: data.costumerId,
              date: data.date,
              productId: data.productId})
          })
        dispatch({type: "updatePurchases", payload: purchases})
      })

  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainComp></MainComp>}></Route>
        <Route path="/products" element={<ProductsComp></ProductsComp>}></Route>
        <Route path="/costumers" element={<CostumerComp></CostumerComp>}></Route>
        <Route path="/purchases" element={<PurchasesComp></PurchasesComp>}></Route>
        <Route path="/editproduct/:id" element={<EditProductComp></EditProductComp>}></Route>
        <Route path="/editcostumer/:id" element={<EditCostumerComp></EditCostumerComp>}></Route>
      </Routes>
    </div>
  );
}

export default App;
