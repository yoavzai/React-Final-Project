
import { useState } from "react"
import { useSelector } from "react-redux"
import AllDataTable from "./AllDataTable"
import { MenuComp } from "./Menu"
import { updateOrAddCostumerToServer } from "./Utils"

export default function CostumersComp() {

    const costumers = useSelector(state => state.costumers)
    const products = useSelector(state => state.products)
    const purchases = useSelector(state => state.purchases)
    const [isNewCostumer, setIsNewCostumer] = useState(false)
    const [newCostumerData, setNewCostumerData] = useState({fname:"", lname:"", city:""})
    const [isSubmitted, setIsSubmitted] = useState(false)

    async function addNewCostumerToServer() {
        const res = await updateOrAddCostumerToServer(newCostumerData, "ADD")
        if (res === "SUCCESS") {
            setIsNewCostumer(false)
            setIsSubmitted(true)

        }
    }

    return (
        <div>
            <MenuComp></MenuComp>
            <div className="container_costumers">
                <div>
                    <button onClick={() => setIsNewCostumer(!isNewCostumer)}>Add new costumer</button>
                </div>

                {isNewCostumer && 
                    <div className="form_container_new_item">
                        <form>
                            <div>
                                <label htmlFor="first_name">First Name:</label>
                                <input type='text' value={newCostumerData.fname}
                                    onChange={(e) => setNewCostumerData({...newCostumerData, fname: e.target.value})}>
                                </input>
                            </div>
                            <div>
                                <label htmlFor="last_name">Last Name:</label>
                                <input type='text' value={newCostumerData.lname}
                                    onChange={(e) => setNewCostumerData({...newCostumerData, lname: e.target.value})}>
                                </input>
                            </div>
                           <div>
                                <label htmlFor="city">City:</label>
                                <input type='text' value={newCostumerData.city}
                                        onChange={(e) => setNewCostumerData({...newCostumerData, city: e.target.value})}>
                                </input>
                           </div>
                            <input type="button" value="Add" onClick={addNewCostumerToServer}></input>
                        </form>
                    </div>
                }
                {isSubmitted && 
                    <div className="item_added_notification_container">
                        <h3>Costumer Added</h3>
                        <button onClick={() => setIsSubmitted(false)}>OK</button>
                    </div>
                }
                <AllDataTable costumers={costumers}
                                products={products}
                                purchases={purchases}
                                pageRequesting="costumers">
                </AllDataTable>
            </div>
        </div>
    )
}