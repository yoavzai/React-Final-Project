import { MenuComp } from "./Menu"

function MainComp() {


    return (
        <div className="homepage">            
            <div>
                <h1>Welcome to the store</h1>
            </div>
            <div className="homepage_menu">
                <MenuComp></MenuComp>
            </div>
        </div>
    )
}

export default MainComp