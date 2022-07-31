import { useState } from "react"
import { Link } from "react-router-dom"
import BuyProductComp from "./BuyProducts"

export default function AllDataTableRow (props) {

    const row = props.row
    const [isBuyProduct, setIsBuyProduct] = useState(false)
    
    function closeBuyProductComp() {
        setIsBuyProduct(false)
    }

    return (
        <tr key={row.costumerId}>
            <td>
                <Link to={"/editcostumer/" + row.costumerId}>{row.costumerName}</Link>
            </td>
            <td>
                {row.purchasedProducts.map ((product, index) => {
                    return (
                        <div key={index}>
                            <Link to={"/editproduct/" + product?.id}>{product?.name}</Link>
                        </div>
                    )
                })}     
            </td>
            <td>
                {row.purchasesDates.map ((date, index) => {
                    return (
                        <div key={index}>
                            {date}
                        </div>
                    )
                })}    
            </td>
            {props.isBuyProductsColumn && 
            <td>
                <button onClick={() => setIsBuyProduct(!isBuyProduct)}>Buy products</button>
                {isBuyProduct && <BuyProductComp
                                    key={row.costumerId}
                                    costumerId = {row.costumerId}
                                    closeBuyProductComp={closeBuyProductComp}>
                                </BuyProductComp>}
            </td>
            }

        </tr>
    )
}