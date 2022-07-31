
import { useState } from "react"
import {Link} from "react-router-dom"
import ProductPurchasesComp from "./ProductPurchases"


function ProductComp(props) {

    const product = props.product
    const [isPurchases, setIsPurchases] = useState(false)

function closeProductPurchases() {
    setIsPurchases(false)
}

function openProductPurchases() {
    if (isPurchases) {
        setIsPurchases(false)
        return
    }
    const closeProductPurchasesBtn = document.getElementById("closeProductPurchasesBtn")
    if (closeProductPurchasesBtn) {
        closeProductPurchasesBtn.click()
    }
    setIsPurchases(true)
}

    return (

        <div className="single_product">
            <div className="product_info">
                <span>
                    <span className="info_bold">Name:</span>
                 <Link to={"/editproduct/" + product.id}>{product.name}</Link>
                </span>
                
                <span>
                    <span className="info_bold">Price:</span>
                 {product.price}
                </span>
                
                <span>
                    <span className="info_bold">Quantity: </span>
                {product.quantity}
                </span>
            </div>
            
            
            <button onClick={openProductPurchases}>Purchases</button>
            {isPurchases && <ProductPurchasesComp
                                    product={product}
                                    closeProductPurchases={closeProductPurchases}>
                            </ProductPurchasesComp>}
        </div>
        
    )
}

export default ProductComp