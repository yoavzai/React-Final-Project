
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { addPurchaseToServer, getProductById, updateProductQuantityOnServer } from "./Utils"

function BuyProductComp(props) {
    
    const products = useSelector(state => state.products)
    const [checkedProductsIds, setCheckedProductsIds] = useState([])
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        removeOutOfStockProductsFromCheckedProductsIdsList()
    }, [products])

    function removeOutOfStockProductsFromCheckedProductsIdsList() {
        setCheckedProductsIds(checkedProductsIds.filter(productId => {
            return getProductById(products, productId).quantity !== 0
        }))
    }

    async function submitSelectedProductsToServer() {
        if (checkedProductsIds.length === 0)
            return

        for (const productId of checkedProductsIds) {
            await addPurchaseToServer(
                {costumerId: props.costumerId,
                productId: productId,
                date: new Date().toString().slice(0,21)})
            
            await updateProductQuantityOnServer(productId)
        }
        setSubmitted(true)
        setCheckedProductsIds([])
    }

    function productCheckedChange(e) {
        if (e.target.checked) {
            setCheckedProductsIds([...checkedProductsIds, e.target.id])
        }
        else {
            setCheckedProductsIds(checkedProductsIds.filter(productId => productId !== e.target.id))
        }
    }

    return (
        <div className="buy_products">
            {submitted ?
                <div className="item_added_notification_container">
                    <h3>Purchase Completed</h3>
                    <button onClick={props.closeBuyProductComp}>OK</button>
                </div> :

            <fieldset>
                <legend>Choose wanted products:</legend>
                    <div>
                        {products.map(product => {
                        if (product.quantity == 0) {
                            return (
                                <div className="single_product_container" key={product.id}>
                                    <input disabled id={product.id} type="checkbox"></input>
                                    <span style={{display: "inline"}}>{product.name} (Out of stock)</span>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="single_product_container" key={product.id}>
                                    <input id={product.id}
                                        type="checkbox"
                                        onChange={productCheckedChange}>
                                    </input> <span style={{display: "inline"}}>{product.name} ({product.quantity} left)</span>
                                </div>
                            )
                        }
                        })}
                        <button onClick={submitSelectedProductsToServer}>Buy</button>
                    </div>
            </fieldset>
            }

        </div>
    )
}

export default BuyProductComp