import React, {useState, useEffect} from 'react'
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import Item from '../Item/Item';
import './ItemList.css'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const ItemList = () => {
    let { id: cat } = useParams();
    const [pokeInfo, setPokeInfo] = useState()
    let list = []

    useEffect(() => {
        const getItems = async () => {
            const q = query(collection(db, cat), orderBy('ide', 'asc'))
            const querySnapshot = await getDocs(q);
            const items = []
            querySnapshot.forEach((doc) => {
                items.push({...doc.data(), id: doc.id})
            })

            setPokeInfo(items)
        }
        getItems();
        
    },[cat])

    const renderList = () => {
        return pokeInfo?.map(data => (
            <Item item={data} key={data.id}></Item>
        )) 
}
    return (
        <>
        <div className="d-flex">
            <Container className="itemListContainer">
                {renderList()}
            </Container>
        </div>
        </>
    )
}
export default ItemList;
