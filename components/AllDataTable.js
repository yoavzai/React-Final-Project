import { useEffect, useState } from 'react';
import { getProductById, getPurchasesByCostumerId } from "./Utils";
import AllDataTableRow from './AllDataTableRow';


export default function AllDataTable(props) {


    const costumers = props.costumers
    const products = props.products
    const purchases = props.purchases
    const [rows, setRows] = useState([])

    useEffect(() => {
        const TempRows = costumers.map(costumer => {
            const costumerId = costumer.id
            const costumerName = costumer.fname + ' ' + costumer.lname
            const costumerPurchasesSortedByDate = 
                getPurchasesByCostumerId(purchases, costumer.id).sort((a,b) => {
                    return (new Date(b.date) - new Date(a.date))})

            const purchasedProducts = []
            const purchasesDates = 
                costumerPurchasesSortedByDate.map( purchase => {
                    const product = getProductById(products, purchase.productId)
                    if (products.includes(product)) {
                        purchasedProducts.push(product)
                        return purchase.date
                    }
                    else {
                        return
                    }
                })

            return {costumerId: costumerId,
                    costumerName: costumerName,
                    purchasedProducts: purchasedProducts,
                    purchasesDates: purchasesDates}
            })
        setRows(TempRows)
    }, [costumers, purchases])
                    

    return (
        <div className="costumers_table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Purchased Products</th>
                        <th>Purchase Date</th>
                        {props.isBuyProductsColumn &&
                        <th>Buy More Products</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        return <AllDataTableRow key={index}
                                                  row={row}
                                                  isBuyProductsColumn={props.isBuyProductsColumn}>
                               </AllDataTableRow>
                    })}
                </tbody>
            </table>
        </div>)
}
