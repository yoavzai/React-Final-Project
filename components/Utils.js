import db from "./firestore"


export async function deleteProductOnServer(product) {
    await db.collection("products").doc(product.id).delete()    
    const productPurchasesSnapshot = await db.collection("purchases").where("productId", "==", product.id).get()
    productPurchasesSnapshot.forEach(async doc => {
        await db.collection("purchases").doc(doc.id).delete()
    })
}

function isValidProductInput(product)
{
    if (product.name.trim() === "")
    {
        return {res: false, message: "Enter Name"}
    }

    if (isNaN(product.price) || 
        isNaN(parseInt(product.price)) ||
        Number(product.price) < 0 ||
        product.price[product.price.length-1] === '.')
    {
        return {res: false, message:"Enter Valid Price"}
    }
    if (isNaN(product.quantity) || 
        isNaN(parseInt(product.quantity)) || 
        !Number.isInteger(Number(product.quantity)) ||
        Number(product.quantity) < 0 ||
        product.quantity[product.quantity.length-1] === '.')
    {
        return {res: false, message: "Enter Valid Quantity"}
    }

    return {res: true, message: ""}
}

export async function updateOrAddProductToServer(product, action) {

    const isValidInputRes = isValidProductInput(product)
    if (isValidInputRes.res === false)
    {
        alert(isValidInputRes.message)
        return "FAIL"
    }
    else
    {
        const dataForServer = {name: product.name.trim(),
                             price: parseFloat(product.price),
                             quantity: parseInt(product.quantity)}

        if (action === "UPDATE") {
            
            await db.collection('products').doc(product.id).update(dataForServer)
        }
        else if (action === "ADD")
        {
                await db.collection("products").add(dataForServer)
        }
        
        return "SUCCESS"
    }
}

export async function updateProductQuantityOnServer(productId) {
    const productReference = db.collection("products").doc(productId)
    const productData = (await productReference.get()).data()
    productData.quantity = productData.quantity - 1;
    productReference.set(productData)
}

export async function deleteCostumerOnServer(costumer) {
    await db.collection("costumers").doc(costumer.id).delete()    
    const costumerPurchasesSnapshot = await db.collection("purchases").where("costumerId", "==", costumer.id).get()
    costumerPurchasesSnapshot.forEach(async doc => {
        await db.collection("purchases").doc(doc.id).delete()
    })
}

function isValidCostumerInput(costumer)
{
    if (costumer.fname.trim() === "")
    {
        return {res: false, message: "Enter First Name"}
    }

    if (costumer.lname.trim() === "")
    {
        return {res: false, message: "Enter Last Name"}
    }

    if (costumer.city.trim() === "")
    {
        return {res: false, message: "Enter City"}
    }

    return {res: true, message: ""}
}

export async function updateOrAddCostumerToServer(costumer, action) {

    const isValidInputRes = isValidCostumerInput(costumer)
    if (isValidInputRes.res === false)
    {
        alert(isValidInputRes.message)
        return "FAIL"
    }
    else
    {
        const dataForServer = {fname: costumer.fname.trim(),
                             lname: costumer.lname.trim(),
                             city: costumer.city.trim()}

        if (action === "UPDATE") {
            
            await db.collection('costumers').doc(costumer.id).update(dataForServer)
        }
        else if (action === "ADD")
        {
            await db.collection("costumers").add(dataForServer)
        }

        return "SUCCESS"
    }
}

export async function addPurchaseToServer(purchaseData) {
    await db.collection("purchases").add(purchaseData)
}

export function getProductById(products, id) {
    return products.find(product => product.id === id)
}

export function getCostumerById(costumers, id) {
    return costumers.find(costumer => costumer.id === id)
}

export function getPurchasesByProductId(purchases, productId) {
    return purchases.filter(purchase => purchase.productId === productId)
}

export function getPurchasesByCostumerId(purchases, costumerId) {
    return purchases.filter(purchase => purchase.costumerId === costumerId)
}

export function getProductsByCostumerId(products, purchases, costumerId) {
    const costumerProducts = getPurchasesByCostumerId(purchases, costumerId).map( purchase =>
    {
        return getProductById(products, purchase.productId)
    })
    return costumerProducts
}

export function getCostumersByProductId(costumers, purchases, productId) {
    const productCostumers = getPurchasesByProductId(purchases, productId).map( purchase =>
    {
        return getCostumerById(costumers, purchase.costumerId)
    })
    return productCostumers
}

export function getPurchasesByDay(purchases, day) {
    return (purchases.filter(purchase => new Date(purchase.date).getDate() === Number(day)))
}

export function getPurchasesByYear(purchases, year) {
    return (purchases.filter(purchase => new Date(purchase.date).getFullYear() === Number(year)))
}

export function getPurchasesByMonth(purchases, month) {
    return (purchases.filter(purchase => new Date(purchase.date).getMonth() + 1 === Number(month)))
}

