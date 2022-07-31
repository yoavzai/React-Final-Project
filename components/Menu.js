import {useNavigate} from "react-router"


export function MenuComp() {

    const navigate = useNavigate()

    return (
        <div className="menu">
            
            <div>
                <button onClick={() => navigate("/")}>Home</button>
            </div>
            <div>
                <button onClick={() => navigate("/products")}>Products</button>
            </div>
            <div>
                <button onClick={() => navigate("/costumers")}>Costumers</button>
            </div>
            <div>
                <button  onClick={() => navigate("/purchases")}>Purchases</button>
            </div>
        </div>
    )
}