/* eslint-disable sonarjs/no-duplicate-string */
import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import MyContext from '../../context/Context';
import formatDate from '../../helpers/formatDate';
import {
  // apiRequestOrdersByID,
  apiUpdateSalesProduct,
} from '../../services/salesProducts/apiRequestSalesProduct';
import * as styles from './styles';
// import socket from '../../services/socket/clientSocket';

const socket = io('http://localhost:3001');

function HeaderDetailsOrders() {
  const { salleProduct } = useContext(MyContext);
  const [statusOrder, setStatusOrder] = useState();

  console.log(statusOrder);

  const datatestId = {
    orderId: 'seller_order_details__element-order-details-label-order-id',
    orderDate: 'seller_order_details__element-order-details-label-order-date',
    status: 'seller_order_details__element-order-details-label-delivery-status',
    preparingCheck: 'seller_order_details__button-preparing-check',
    dispatchCheck: 'seller_order_details__button-dispatch-check',
  };

  useEffect(() => {
    socket.on('Status', async (message) => {
      const { id, status } = message;
      setStatusOrder(message);
      await apiUpdateSalesProduct(id, status);
      // const requestApi = await apiRequestOrdersByID(id);
    });
  }, [statusOrder]);

  function handleOnclickSetStatus({ target }) {
    const { id, name } = target;
    const newStatus = { id, status: name };
    socket.emit('Status', newStatus);
  }

  return (
    <styles.ContainerHeaderDetails>
      {
        salleProduct.map((value) => (
          <>
            <styles.TextNumberOrder
              data-testid={ datatestId.orderId }
            >
              {`PEDIDO 00${value.id}`}
            </styles.TextNumberOrder>

            <styles.TextDateOrder
              data-testid={ datatestId.orderDate }
            >
              {formatDate(value.saleDate)}
            </styles.TextDateOrder>

            <styles.TextStatusOrder
              data-testid={ datatestId.status }
            >
              {statusOrder}
            </styles.TextStatusOrder>

            <styles.ButtonPreparing
              name="Preparando"
              type="button"
              id={ value.id }
              // disabled={ value.status !== 'Pendente' }
              data-testid={ datatestId.preparingCheck }
              onClick={ handleOnclickSetStatus }
            >
              PREPARAR PEDIDO
            </styles.ButtonPreparing>

            <styles.ButtonDispatch
              name="Em Trânsito"
              id={ value.id }
              type="button"
              // disabled={ value.status !== 'Preparando' }
              data-testid={ datatestId.dispatchCheck }
              onClick={ handleOnclickSetStatus }
            >
              SAIU PARA ENTREGA
            </styles.ButtonDispatch>
          </>
        ))
      }
    </styles.ContainerHeaderDetails>
  );
}

export default HeaderDetailsOrders;
