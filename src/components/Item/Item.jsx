import React from 'react'
import './Item.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card }  from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Item = (data) => {

    return(
        <Card className="pokemonCardWrapper rounded-4 bg-transparent border border-0">
        <Link to={`/item/${data.item.category}/${data.item.ide}`}><Card.Link style={{color:'black'}} href={`/item/${data.item.category}/${data.item.id}`}>
        <Card.Header className="pokemonCardId rounded-top-4">#{data.item.ide}</Card.Header>
        <Card.Body className="pokemonCardContent rounded-bottom-4">
          <div className="pokemonCardImage">
            <Card.Img
              variant="top"
              src={`${data.item.img}`}
              alt={data.item.name}
            />
          </div>
          <Card.Title className="pokemonCardTitle">{data.item.name}</Card.Title>
        </Card.Body>
        </Card.Link></Link>
      </Card>
    )
}

export default Item