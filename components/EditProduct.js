
import { useNavigate, useParams } from 'react-router-dom';
import {Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import {deleteProductOnServer, getProductById, updateOrAddProductToServer} from './Utils';
import ProductCostumersComp from './ProductCostumers';
import { MenuComp } from './Menu';

function EditProductComp() {

    const navigate = useNavigate()
    const params = useParams()
    const products = useSelector(state => state.products)
    const [product, setProduct] = useState({id:"", name:"", price:"", quantity:""})
    const [cancelChanges, setCancelChanges] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        const foundProduct = getProductById(products, params.id)
        if (foundProduct !== undefined) {
            setProduct(foundProduct)
        }
        setCancelChanges(false)
    }, [cancelChanges, products])

    async function updateProduct(e)
    {
        e.preventDefault()
        const res = await updateOrAddProductToServer(product, "UPDATE")
        if (res === "SUCCESS") {
            setSubmitted(true)
        }
    }

    async function deleteProduct() {   
        await deleteProductOnServer(product)
        setDeleted(true)
    }
    
    return (
        <div>
            <MenuComp></MenuComp>
            <div className='container_items'>
                <h3 className='edit_page_h3'>Edit Product Id:</h3><span>{params.id}</span>

                {submitted ?

                <div className='item_added_notification_container'>
                    <h3>Data Updated</h3>
                    <button onClick={() => setSubmitted(false)}>OK</button>
                </div > : 

                deleted ? 

                <div className='product_deleted_notification_container'>
                    <h3>Product Deleted</h3>
                    <button onClick={() => navigate("/products")}>OK</button>
                </div > :

                <div className='form_container_edit_costumer'>
                    <form onSubmit={updateProduct}>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input type='text' value={product?.name}
                                onChange={(e) => setProduct({...product, name: e.target.value})}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="price">Price:</label>
                            <input type='text' value={product?.price}
                                onChange={(e) => setProduct({...product, price: e.target.value})}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="quantity">Quantity:</label>
                            <input type='text' value={product?.quantity}
                                onChange={(e) => setProduct({...product, quantity: e.target.value})}>
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
                                <input type="button" value="Delete Product" onClick={() => {deleteProduct()}}></input>
                            </div>
                        </div>
                    </form>
                </div>}
                <ProductCostumersComp product = {product}></ProductCostumersComp>
            </div>
        </div>
    )
}

export default EditProductComp