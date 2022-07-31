
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import {deleteCostumerOnServer, getCostumerById, updateOrAddCostumerToServer} from './Utils';
import CostumerProductsComp from './CostumerProducts';
import { MenuComp } from './Menu';

function EditCostumerComp() {

    const navigate = useNavigate()
    const params = useParams()
    const costumers = useSelector(state => state.costumers)
    const [costumer, setCostumer] = useState({id:"", fname:"", lname:"", city:""})
    const [cancelChanges, setCancelChanges] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        const foundCostumer = getCostumerById(costumers, params.id)
        if (foundCostumer !== undefined) {
            setCostumer(foundCostumer)
        }
        setCancelChanges(false)
    }, [cancelChanges, costumers])

    async function updateCostumer(e)
    {
        e.preventDefault()
        const res = await updateOrAddCostumerToServer(costumer, "UPDATE")
        if (res === "SUCCESS") {
            setSubmitted(true)
        }
    }

    async function deleteCostumer() {   
        await deleteCostumerOnServer(costumer)
        setDeleted(true)
    }
    
    return (
        <div>
            <MenuComp></MenuComp>
            <div className='container_items'>
                <h3 className='edit_page_h3'>Edit Costumer Id:</h3><span>{params.id}</span>

                {submitted ?

                <div className='item_added_notification_container'>
                    <h3>Data Updated</h3>
                    <button onClick={() => setSubmitted(false)}>OK</button>
                </div > : 

                deleted ? 

                <div className='product_deleted_notification_container'>
                    <h3>Costumer Deleted</h3>
                    <button onClick={() => navigate("/costumers")}>OK</button>
                </div > :

                <div className='form_container_edit_costumer'>
                    <form onSubmit={updateCostumer}>
                        <div>
                            <label htmlFor="first_name">First Name:</label>
                            <input type='text' value={costumer?.fname}
                                onChange={(e) => setCostumer({...costumer, fname: e.target.value})}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name:</label>
                            <input type='text' value={costumer?.lname}
                                onChange={(e) => setCostumer({...costumer, lname: e.target.value})}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="city">City:</label>
                            <input type='text' value={costumer?.city}
                                onChange={(e) => setCostumer({...costumer, city: e.target.value})}>
                            </input>
                        </div>
                        <div className='edit_buttons_container'>
                            <div>
                                <input type='submit' value="Submit"></input>
                            </div>
                            <div>
                                <input type="button" value="Cancel Changes" onClick={() => {setCancelChanges(true)}}></input>
                            </div>
                            <div>
                                <input type="button" value="Delete Costumer" onClick={() => {deleteCostumer()}}></input>
                            </div>
                        </div>
                    </form>
                </div>}
                <CostumerProductsComp costumer={costumer}></CostumerProductsComp>
            </div>
        </div>
    )
}

export default EditCostumerComp