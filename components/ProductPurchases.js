import { useEffect, useState } from "react"
import {useSelector} from "react-redux"
import ProductPurchaseComp from "./ProductPurchase"
import { getCostumerById, getPurchasesByProductId } from "./Utils"

function ProductPurchasesComp(props) {

    const product = props.product
    const purchases = useSelector(state => state.purchases)
    const costumers = useSelector(state => state.costumers)
    const [productPurchases, setProductPurchases] = useState([])

    useEffect(() => {
        const productPurchasesSortedByDate = 
            getPurchasesByProductId(purchases, product.id)
            .sort((a,b) => {return (new Date(b.date) - new Date(a.date))})
            .map( purchase => {
                const costumer = getCostumerById(costumers, purchase.costumerId)
                return {...purchase, costumer: costumer}
            }
        )
        setProductPurchases(productPurchasesSortedByDate)
        
    }, [purchases, costumers])

    return (
        <div className="product_purchases_container">
            <div className="prduct_purchases_head_container">
                <h2>Purchases of {product.name}:</h2>
                <button id="closeProductPurchasesBtn"
                    onClick={props.closeProductPurchases}>x</button>
            </div>
            {productPurchases.map(purchase => {
                return (
                    <ProductPurchaseComp key={purchase.id} purchase={purchase}></ProductPurchaseComp>
                )
            })}

        </div>
    )
}

export default ProductPurchasesComp