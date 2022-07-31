
import { useState } from 'react';
import ProductComp from './product';
import {useSelector} from "react-redux"
import { updateOrAddProductToServer } from './Utils';
import { MenuComp } from './Menu';

function ProductsComp() {

    const products = useSelector(state => state.products)
    const purchases = useSelector(state => state.purchases)   
    const [isNewProduct, setIsNewProduct] = useState(false)
    const [newProductData, setNewProductData] = useState({name:"", price:"", quantity:""})
    const [isSubmitted, setIsSubmitted] = useState(false)

    async function addNewProductToServer() {
        const res = await updateOrAddProductToServer(newProductData, "ADD")
        if (res === "SUCCESS") {
            setNewProductData({name:"", price:"", quantity:""})
            setIsNewProduct(false)
            setIsSubmitted(true)

        }
    }

    return (
        <div>
            <MenuComp></MenuComp>
            <div className="container_items">
                <div className="container_total_purchased">
                    <h2>Total Purchased Products</h2>
                    <p>{purchases.length}</p>
                </div>
                <button onClick={() => setIsNewProduct(!isNewProduct)}>Add new product</button>
                {isNewProduct && 
                    <div className="form_container_new_item">
                        <form>
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input type='text' value={newProductData.name}
                                    onChange={(e) => setNewProductData({...newProductData, name: e.target.value})}>
                                </input>
                            </div>
                            <div>
                                <label htmlFor="price">Price:</label>
                                <input type='text' value={newProductData.price}
                                    onChange={(e) => setNewProductData({...newProductData, price: e.target.value})}>
                                </input>
                            </div>
                            <div>
                                <label htmlFor="quantity">Quantity:</label>
                                <input type='text' value={newProductData.quantity}
                                onChange={(e) => setNewProductData({...newProductData, quantity: e.target.value})}>
                                </input>
                            </div>
                            <input type="button" value="ADD"  onClick={addNewProductToServer}></input>
                        </form>
                    </div>
                }
                {isSubmitted && 
                    <div className="item_added_notification_container">
                        <h3>Product Added</h3>
                        <button onClick={() => setIsSubmitted(false)}>OK</button>
                    </div >
                }
                <div className="products_box">
                    <h2>Products:</h2>
                    {products.map(product => {return <ProductComp key={product.id} product={product}> </ProductComp>})}
                </div>

            </div>
        </div>
    )
}

export default ProductsComp