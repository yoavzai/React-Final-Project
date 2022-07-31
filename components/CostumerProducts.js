import { useEffect, useState } from "react"
import {useSelector} from "react-redux"
import { Link } from "react-router-dom"
import { getProductsByCostumerId } from "./Utils"

function CostumerProductsComp(props) {

    const costumer = props.costumer
    const purchases = useSelector(state => state.purchases)
    const products = useSelector(state => state.products)
    const [costumerProducts, setCostumerProducts] = useState([])
    const [costumerProductsCount, setCostumerProductsCount] = useState({})

    useEffect(() => {
        const tempCostumerProducts = getProductsByCostumerId(products, purchases, costumer.id)
        
        let tempCostumerProductsCount = {}
        for (const product of tempCostumerProducts) {
            if (product.id in tempCostumerProductsCount) {
                tempCostumerProductsCount[product.id] += 1
            }
            else {
                tempCostumerProductsCount[product.id] = 1
            }
        }
        setCostumerProducts([...new Set(tempCostumerProducts)])
        setCostumerProductsCount(tempCostumerProductsCount)
        
    }, [purchases, products, costumer])

    return (
        <div>
            <h3>Products bought by this costumer:</h3>
            {costumerProducts.map((product, index) => {
                return (
                    <div key={index}>
                        <Link to={"/editproduct/" + product?.id}>
                            {product?.name}</Link> x{costumerProductsCount[product?.id]}
                        
                    </div>
                )
            })}

        </div>
    )
}

export default CostumerProductsComp