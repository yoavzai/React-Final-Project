import { useState } from "react"
import { useSelector } from "react-redux"
import AllDataTable from "./AllDataTable"
import { MenuComp } from "./Menu"
import { getCostumerById, getProductById, getPurchasesByDay, getPurchasesByMonth, getPurchasesByYear } from "./Utils"

function PurchasesComp() {

    const products = useSelector(state => state.products)
    const purchases = useSelector(state => state.purchases)
    const costumers = useSelector(state => state.costumers)
    const [checkedProductsIds, setCheckedProductsIds] = useState([])
    const [checkedCostumersIds, setCheckedCostumersIds] = useState([])
    const [date, setDate] = useState({day:"" , month:"", year:""})
    const [table, setTable] = useState(null)

    function productCheckedChange(e) {
        if (e.target.checked) {
            setCheckedProductsIds([...checkedProductsIds, e.target.id])
        }
        else {
            setCheckedProductsIds(checkedProductsIds.filter(productId => productId !== e.target.id))
        }
    }

    function costumerCheckedChange(e) {
        if (e.target.checked) {
            setCheckedCostumersIds([...checkedCostumersIds, e.target.id])
        }
        else {
            setCheckedCostumersIds(checkedCostumersIds.filter(costumerId => costumerId !== e.target.id))
        }
    }

    function buildTable() {
        const tableCostumers = checkedCostumersIds.length === 0 ?
                               costumers : 
                               checkedCostumersIds.map(costumerId => {return getCostumerById(costumers, costumerId)})
        const tableProducts = checkedProductsIds.length === 0 ?
                              products :
                              checkedProductsIds.map(productId => {return getProductById(products, productId)})
        let tablePurchases = date.day === "" ?
                               purchases :
                               getPurchasesByDay(purchases, date.day)
        tablePurchases = date.month === "" ?
                               tablePurchases :
                               getPurchasesByMonth(tablePurchases, date.month)
        tablePurchases = date.year === "" ?
                               tablePurchases :
                               getPurchasesByYear(tablePurchases, date.year)
        

        setTable(<AllDataTable costumers={tableCostumers}
                                 products={tableProducts}
                                 purchases={tablePurchases}
                                 pageRequesting="purchases">
                </AllDataTable>)
    }

    function clearSearch() {
        products.forEach(product => document.getElementById(product.id).checked = false)
        costumers.forEach(costumer => document.getElementById(costumer.id).checked = false)
        document.getElementById("searchDayInput").value = ""
        document.getElementById("searchMonthInput").value = ""
        document.getElementById("searchYearInput").value = ""
        setCheckedCostumersIds([])
        setCheckedProductsIds([])
        setDate({day:"" , month:"", year:""})
    }

    return (
        <div>

            <MenuComp></MenuComp>
            <div className="container_costumers">
                <div>  
                    <fieldset className="purchases_page_combobox">
                        <legend>Choose wanted products: (no checks = all)</legend>
                            <div>
                                {products.map(product => {
                                    return (
                                        <div className="single_product_container" key={product.id}>
                                            <input id={product.id}
                                                type="checkbox"
                                                onChange={productCheckedChange}>
                                            </input> <span style={{display: "inline"}}>{product.name}</span>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                    </fieldset>
                    <fieldset className="purchases_page_combobox">
                        <legend>Choose wanted costumers: (no checks = all)</legend>
                            <div>
                                {costumers.map(costumer => {
                                    return (
                                        <div className="single_product_container" key={costumer.id}>
                                            <input id={costumer.id}
                                                type="checkbox"
                                                onChange={costumerCheckedChange}>
                                            </input> <span style={{display: "inline"}}>{costumer.fname + ' ' + costumer.lname}</span>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                    </fieldset>
                    <fieldset className="purchases_page_combobox">
                        <legend>Choose wanted date: (empty field = all)</legend>
                            <div>
                                <div>
                                    <span>Day (1 - 31) </span>
                                    <input id="searchDayInput" type="text" onChange={(e) => setDate({...date, day: e.target.value})}></input>
                                </div>
                                <div>
                                    <span>Month (1 - 12) </span>
                                    <input  id="searchMonthInput" type="text" onChange={(e) => setDate({...date, month: e.target.value})}></input>
                                </div>
                                <div>
                                    <span>Year </span>
                                    <input  id="searchYearInput" type="text" onChange={(e) => setDate({...date, year: e.target.value})}></input>
                                </div>
                            </div>
                    </fieldset>
                </div>
                <div className="purchases_search_menu">
                    <div>
                        <button onClick={buildTable}>Search</button>
                    </div>
                    <div>
                        <button onClick={clearSearch}>Clear Search</button>
                    </div>
                </div>
                {table}
            </div>
        </div>
    )
}

export default PurchasesComp