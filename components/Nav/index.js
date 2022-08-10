import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { db } from './../../utils/firebase'
import { ref, onValue } from "firebase/database";

export default function Nav() {

    const [menu, setMenu] = useState({});

    useEffect(() => {
        const menuRef = ref(db, 'menus');
        onValue(menuRef, (snapshot) => {
            setMenu({ ...snapshot.val() })
        });
        return () => {
            setMenu({})
        }
    }, []);

    return (
        <ul className="nav justify-content-left menu">
            {
                Object.values(menu).map((id, index) => {
                    return (
                        <li className="nav-item" key={index}>
                            <Link to={id.link}>{id.title}</Link>
                        </li>
                    )
                })
            }
        </ul>

    )
}
