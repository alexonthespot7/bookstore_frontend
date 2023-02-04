import { Typography } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Order from "./Order";

export default function OrderAdmin() {
    const [foundOrder, setFoundOrder] = useState(false);
    const [order, setOrder] = useState(null);
    let { orderid } = useParams();

    const { setBgrColor } = useContext(AuthContext);

    const fetchOrder = () => {
        const token = sessionStorage.getItem('jwt');
        fetch(process.env.REACT_APP_API_URL + 'orders/' + orderid, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data !== null) {
                    setFoundOrder(true);
                    setOrder(data);
                } else {
                    setFoundOrder(false);
                }
            })
            .catch(err => console.error(err));
    }
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('role') === 'ADMIN') {
            fetchOrder();
        } else {
            navigate('/');
        }
        setBgrColor('#FFFAFA');
    }, []);

    return (
        <div>
            {foundOrder && <Order order={order} alignProp={'center'} marginProp={0} />}
            {!foundOrder && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100, marginBottom: 100 }}><Typography variant='h6'>The order was not found</Typography></div>}
        </div>
    );
}