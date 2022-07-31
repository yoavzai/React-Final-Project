import { useEffect, useState } from "react"
import {useSelector} from "react-redux"
import { Link } from "react-router-dom"
import { getCostumersByProductId } from "./Utils"

function ProductCostumersComp(props) {

    const product = props.product
    const purchases = useSelector(state => state.purchases)
    const costumers = useSelector(state => state.costumers)
    const [productCostumers, setProductCostumers] = useState([])
    const [productCostumersCount, setProductCostumersCount] = useState({})

    useEffect(() => {
        const tempProductCostumers = getCostumersByProductId(costumers, purchases, product?.id)

        let tempProductCostumersCount = {}
        for (const costumer of tempProductCostumers) {
            if (costumer?.id in tempProductCostumersCount) {
                tempProductCostumersCount[costumer?.id] += 1
            }
            else {
                tempProductCostumersCount[costumer?.id] = 1
            }
        }
        setProductCostumers([...new Set(tempProductCostumers)])
        setProductCostumersCount(tempProductCostumersCount)
        
    }, [purchases, costumers, product])

    return (
        <div>
            <h3>Costumers who bought this product:</h3>
            {productCostumers.map((costumer, index) => {
                return (
                    <div key={index}>
                        <Link to={"/editcostumer/" + costumer?.id}>
                            {costumer?.fname + ' ' + costumer?.lname}</Link> x{productCostumersCount[costumer?.id]}
                        
                    </div>
                )
            })}

        </div>
    )
}

export default ProductCostumersComp