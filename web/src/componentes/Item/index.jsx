import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Utils from '../Utils';

function Item({ index, item, onClickEdit, onClickRemove }) {
    return (
        <div className="col-md-3">
            <Card>
                <CardImg top width="130px" height="130px" src={item.image} alt={item.title} />
                <CardBody>
                    <CardTitle tag="h5">
                        {item.title}
                    </CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        {Utils.converteMoeda(item.cost)}
                    </CardSubtitle>
                    <CardText>
                        {item.description}
                    </CardText>
                    <button onClick={() => onClickEdit(index)} className="btn btn-primary btn-xs mx-2">
                        <FontAwesomeIcon icon={["fas", "cog"]} />
                    </button>
                    <button onClick={() => onClickRemove(index)} className="btn btn-danger btn-xs mx-2">
                        <FontAwesomeIcon icon={["fas", "trash"]} />
                    </button>
                </CardBody>
            </Card>
        </div>
    );
}

export default Item;