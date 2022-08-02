import { useEffect, useState } from 'react';
import { getProductById, getPurchasesByCostumerId } from "./Utils";
import AllDataTableRow from './AllDataTableRow';


export default function AllDataTable(props) {


    const costumers = props.costumers
    const products = props.products
    const purchases = props.purchases
    const [rows, setRows] = useState([])

    useEffect(() => {
        let TempRows = costumers.map(costumer => {
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
        if (props.pageRequesting === "purchases") {
            TempRows = TempRows.filter(row => row.purchasedProducts.length !== 0)
        }
        setRows(TempRows)
    }, [costumers, products, purchases])
                    

    return (
        <div className="costumers_table">
            {rows.length === 0 && props.pageRequesting === "purchases" ?
            <div>
                <h2>No Results</h2>
            </div>
            :
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Purchased Products</th>
                        <th>Purchase Date</th>
                        {props.pageRequesting == "costumers" &&
                        <th>Buy More Products</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        return <AllDataTableRow key={index}
                                                  row={row}
                                                  pageRequesting={props.pageRequesting}>
                               </AllDataTableRow>
                    })}
                </tbody>
            </table>
            }
        </div>)
}
