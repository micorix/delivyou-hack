import React from 'react';
import {Redirect, RouteComponentProps, Router} from "@reach/router";
import { Provider } from 'react-redux'
import NewOrder from "./NewOrder";
import Shipment from "./Shipment";
import Payment from "./Payment";
import OrderConfirmation from "./OrderConfirmation";
import configureStore from "../../store/configureStore";

const store = configureStore();

type AppProps = RouteComponentProps;

const App = (props: AppProps) => {
    return (
        <Provider store={store}>
            <Router>
                <NewOrder path={"/new-order"}/>
                <Shipment path={"/shipment"} />
                <Payment path={"/payment"} />
                <OrderConfirmation path={"/order-confirmation"} />
                <Redirect noThrow from={"/"} to={"/app/new-order"} />
            </Router>
        </Provider>
    );
};

export default App;
