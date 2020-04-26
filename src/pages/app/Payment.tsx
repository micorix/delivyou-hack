import React from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Select} from "../../components/FormControls";
import {Separator} from "../../components/Utils";
import AppLayout from "../../components/AppLayout";
import {makeAction} from "../../store/makeAction";
import {SAVE_DELIVERY_DATA} from "../../store/actions";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";

const CardItem = styled.div`
    border: 2px solid ${props => props.theme.colors.primary};
    padding: 10px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Centered = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AddCardButton = styled.button`
    background: none;
    border: none;
    border-radius: 3px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-top: 1em;
    transition: .2s all;
    outline: none;
    .material-icons{
        margin-right: 10px;
    }
    &:hover{
        background: rgba(0,0,0,0.05);
    }
`;
const RowGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1em;
    margin-bottom: 2em;
`
const Calc = styled.div`
    background: ${props => props.theme.colors.primary};
    border-radius: 10px;
    padding: 10px 1em;
    margin-bottom: 2em;
    color: white;
`;
const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    &:last-of-type{
        margin-top: 10px;
        padding-top: 20px;
        border-top: 2px solid white;
        font-weight: bold;
    }
`
type PaymentProps = RouteComponentProps & {
    persistData: any
    persistedItems: any
    persistedData: any
}
const formatNumber = (no: number) => no.toFixed(2).replace('.', ',');

const dates = {

    pl: {
        days: [
            'Niedziela 3.05',
            'Poniedziałek 4.05',
            'Wtorek 5.05',
            'Środa 6.05',
            'Czwartek 7.05',
            'Piątek 8.05'
        ],
        hours: [
            "8:00-9:00",
            "9:00-10:00",
            "10:00-11:00",
            "11:00-12:00",
            "12:00-13:00",
            "13:00-14:00",
            "14:00-15:00",
            "15:00-16:00",
            "16:00-17:00",
            "17:00-18:00",
            "18:00-19:00",
            "19:00-20:00",
            "20:00-21:00",
            "21:00-22:00",
        ]
    },
    en: {
        days: [
            'Sunday 03/05',
            'Monday 04/05',
            'Tuesday 05/05',
            'Wednesday 06/05',
            'Thursday 07/05',
            'Friday 08/05'
        ],
        hours: [
            "8 AM - 9 AM",
            "9 AM - 10 AM",
            "10 AM - 11 AM",
            "11 AM - 12 PM",
            "12 PM - 1 PM",
            "1 PM - 2 PM",
            "2 PM - 3 PM",
            "3 PM - 4 PM",
            "4 PM - 5 PM",
            "5 PM - 6 PM",
            "6 PM - 7 PM",
            "7 PM - 8 PM",
            "8 PM - 9 PM",
            "9 PM - 10 PM",
        ]
    }
}

const Payment = (props: PaymentProps) => {
    const { register, handleSubmit} = useForm({
        defaultValues: props.persistedData
    });
    const { t, i18n: {language} } = useTranslation();
    const shoppingPrice = props.persistedItems.reduce((prev: number, curr: any) => prev+(curr.quantity * curr.price), 0);

    const complete = (values: any) => {
        props.persistData(values);
        navigate('/app/order-confirmation')
    };
    const currency = language === 'en' ? '€' : 'zł';
    return (
        <AppLayout goBack={"/app/shipment"}>
            <SEO title={"Nowe zamówienie - Płatność"}/>
            <Container>
                <form onSubmit={handleSubmit(complete)}>
                <h1>{t('DELIVERY_TIME')}</h1>
                <RowGrid>
                    <div>
                        <Select name={"date"} ref={register}>
                            {
                                ['sn', 'mo', 'tu', 'we', 'th', 'fr'].map((value, i) => (
                                    <option key={value} value={value}>{(dates as any)[language].days[i]}</option>
                                ))
                            }
                        </Select>
                    </div>
                    <div>
                        <Select name={"time"} ref={register}>
                            {
                                new Array(14).fill(0).map((_, i) => (
                                    <option key={i} value={i+8}>{(dates as any)[language].hours[i]}</option>
                                ))
                            }
                        </Select>
                    </div>
                </RowGrid>
                    <h1>{t('SUMMARY')}</h1>
                    <Calc>
                        <Row>
                            <span>{t('SHOPPING_COST')}</span>
                            <span>{language === 'en' && currency} {formatNumber(shoppingPrice)} {language === 'pl' && currency}</span>
                        </Row>
                        <Row>
                            <span>{t('DELIVERY_COST')}</span>
                            <span>{language === 'en' && currency} {formatNumber(7)} {language === 'pl' && currency}</span>
                        </Row>
                        <Row>
                            <span>{t('TOTAL')}</span>
                            <span>{language === 'en' && currency} {formatNumber(shoppingPrice+7)} {language === 'pl' && currency}</span>
                        </Row>
                    </Calc>
                <h1>{t('PAYMENT_METHOD')}</h1>
                <CardItem>
                    <span className="material-icons">credit_card</span>
                    <span className="card">{t('CARD')}</span>
                    <span className="no">**** 1234</span>
                </CardItem>
                <Separator text={"lub"} />
                <AddCardButton type={"button"}>
                    <span className="material-icons">add</span>
                    <span className="action">{t('ADD_CARD')}</span>
                </AddCardButton>
                <Centered>
                    <Button type={"submit"}>{t('PAY_BTN_TEXT')}</Button>
                </Centered>
                </form>
            </Container>
        </AppLayout>
    )
}

const mapStateToProps = (state: any) => ({
    persistedData: state.deliveryData,
    persistedItems: state.items
});
const mapDispatchToProps = {
    persistData: makeAction(SAVE_DELIVERY_DATA)
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
