import React from 'react';
import { link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div>
            <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <Link href="#"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                    </li>
            
                    <li>
                        <Link href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fab fa-product-hunt"></i> Products</Link>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                            <Link href="#"><i className="fas fa-clipboard-list"></i> All</Link>
                            </li>
            
                            <li>
                            <Link href="#"><i className="fas fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link href="#"><i className="fas fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link href="#"><i className="fas fa-users"></i> Users</Link>
                    </li>
            
                </ul>
                </nav>
            </div>


        </div>
    )
}