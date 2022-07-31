import { useState } from "react"
import { Link } from "react-router-dom"
import BuyProductComp from "./BuyProducts"


export default function ProductPurchaseComp(props) {

    const purchase = props.purchase
    const [isBuyProduct, setIsBuyProduct] = useState(false)

    function closeBuyProductComp() {
        setIsBuyProduct(false)
    }

    return (
        <div className="single_purchase">
            <div className="purchase_info">
                <div>
                    <span className="info_bold">Costumer Name:</span>
                    <Link to={"/editcostumer/" + purchase.costumerId}>
                    {purchase.costumer?.fname + ' ' + purchase.costumer?.lname}</Link>
                </div>

                <div>
                    <span className="info_bold">Date Purchased:</span>
                    <span>{purchase.date}</span>      
                </div>
            </div>
            
            <button onClick={() => setIsBuyProduct(!isBuyProduct)}>Buy more products</button>
            {isBuyProduct && <BuyProductComp
                                costumerId = {purchase.costumer.id}
                                closeBuyProductComp={closeBuyProductComp}>
                            </BuyProductComp>}
        </div>
    )
}