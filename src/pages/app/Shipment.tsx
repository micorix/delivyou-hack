import React, {useEffect} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, Input, InputGroup, Select} from "../../components/FormControls";
import {useForm} from "react-hook-form";
import {Separator} from "../../components/Utils";
import AppLayout from "../../components/AppLayout";
import {makeAction} from "../../store/makeAction";
import {SAVE_SHIPPING_DATA} from "../../store/actions";
import {connect} from "react-redux";
import savedPlaces, {SavedPlace} from "../../data/savedPlaces";
import {useTranslation} from "react-i18next";

const RowGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1em;
`
const Centered = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SavedPlaceSelect = styled(Select)`
    width: 50%;
    display: block;
    margin: auto;
    border-radius: 2em;
    padding: 5px;
    option{
        text-align: center;
    }
`;

type ShipmentProps = RouteComponentProps & {
    persistData: any
    persistedData: any
}
const Shipment = (props: ShipmentProps) => {
    const { register, handleSubmit, watch, setValue, errors } = useForm({
        defaultValues: props.persistedData
    });
    const { t } = useTranslation();
    const savedPlace = watch('savedPlace');
    useEffect(() => {
    if(savedPlace !== 'select'){
            const place = savedPlaces.find((x: SavedPlace) => x.id === savedPlace);
            Object.entries(place ? place.data: {}).forEach(([key, value]) => {
                setValue(key, value)
            })
        }
    }, [savedPlace, setValue])
    const saveShipment = (values: any) => {
        const {savedPlace, ...data} = values;
        props.persistData(data);
        navigate('/app/payment');
    }
    return (
        <AppLayout goBack={"/app/new-order"}>
            <SEO title={"Nowe zamówienie - Adres"}/>
            <Container>
                <h1>{t('ADDRESS')}</h1>
                <form onSubmit={handleSubmit(saveShipment)}>
                    <Separator text={t('FROM_SAVED_PLACES')}/>
                    <SavedPlaceSelect ref={register} name={"savedPlace"} defaultValue={"select"}>
                        <option value="select" disabled>{t('CHOOSE')}</option>
                        <option value="home">{t('HOME')}</option>
                    </SavedPlaceSelect>
                    <Separator text={t('FILL_IN')}/>
                    <InputGroup>
                        <label>{t('RECIPIENT')}</label>
                        <Input
                            ref={register({
                                required: true
                            })}
                            error={Boolean(errors.recipient)}
                            name={"recipient"} />
                    </InputGroup>
                    <InputGroup>
                        <label>{t('STREET')}</label>
                        <Input
                            ref={register({
                            required: true
                            })}
                            error={Boolean(errors.street)}
                            name={"street"} />
                    </InputGroup>
                    <InputGroup>
                    <RowGrid>
                        <div>
                                <label>{t('HOUSE_NO')}</label>
                                <Input
                                    ref={register({
                                        required: true
                                    })}
                                    error={Boolean(errors.houseNo)}
                                    name={"houseNo"} />
                        </div>
                        <div>
                                <label>{t('APARTMENT_NO')}</label>
                                <Input ref={register} name={"apartmentNo"}/>
                        </div>
                    </RowGrid>
                    </InputGroup>
                    <InputGroup>
                        <label>{t('COMMENTS')}</label>
                        <Input as={"textarea"} ref={register} name={"notes"} />
                    </InputGroup>
                <Centered>
                    <Button>{t('NEXT_BTN_TEXT')}</Button>
                </Centered>
                </form>
            </Container>
        </AppLayout>
    )
}

const mapStateToProps = (state: any) => ({
    persistedData: state.shippingData
});
const mapDispatchToProps = {
    persistData: makeAction(SAVE_SHIPPING_DATA)
};
export default connect(mapStateToProps, mapDispatchToProps)(Shipment);
