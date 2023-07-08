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
    const [error, setError] = useState(null) 
    let list = []

    useEffect(() => {
        const getItems = async () => {
            try{
                const q = query(collection(db, cat), orderBy('ide', 'asc'))
                const querySnapshot = await getDocs(q);
                const items = []
                querySnapshot.forEach((doc) => {
                    items.push({...doc.data(), id: doc.id})
                })

                setPokeInfo(items)
            } catch (err) {
                setError(err)
            }
        }
        
        getItems();
    },[cat])

    const renderList = () => {
        return pokeInfo?.map(data => (
            <Item item={data} key={data.id}></Item>
        )) 
    }

    if(error){
        return <h5 className='align-self-center'>Navega por una de las categorias o productos disponibles.</h5>
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
