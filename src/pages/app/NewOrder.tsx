import React, {KeyboardEvent, useState} from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button, InputAddonGroup} from "../../components/FormControls";
import Autocomplete from "../../components/Autocomplete";
import ListItem from "../../components/ListItem";
import products, {Product} from "../../data/products";
import AppLayout from "../../components/AppLayout";
import { v4 as uuidv4 } from 'uuid';
import {connect} from "react-redux";
import {makeAction} from "../../store/makeAction";
import {SAVE_CITY, SAVE_ITEMS} from "../../store/actions";
import cities from "../../data/cities";
import {useTranslation} from "react-i18next";

const List = styled.ul`
    display: block;
    padding-inline-start: 0;
    margin: 2em 0 0 0;
`;

const BarcodeIcon = styled.div`
    margin: 0 0 0 1em;
    display: flex;
    align-items: center;
    img{
        height: 20px;
    }
`
const ModalWrapper = styled.div<{active: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(0,0,0,0.7);
    display: ${props => props.active ? 'block' :' none'};
`;
const Modal = styled.div`
    width: 60%;
    margin: 20vh auto 0 auto;
    padding: 10px;
    background: white;
    border-radius: 5px;
    
    h3{
        text-align: center;
        line-height: 1.6em;
    }
`;
const CityList = styled.ul`
    display: block;
    padding-inline-start: 0;
    margin: 0em 0 0 0;
    
    li{
        display: block;
        padding: .5em 10px;
        text-align: center;
        cursor: pointer;
    }
`;
const CitySelect = styled.div`
    font-weight: bold;
    margin-bottom: 2em;
    cursor: pointer;
`;
const Flags = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
`;
const FlagImage = styled.img<{active: boolean}>`
    height: 40px;
    border-radius: 50%;
    border: 3px solid ${props => props.active ? 'white' : 'transparent'};
    transition: .2s all;
    &:first-of-type{
        margin-right: 20px;
    }
`;
const units = ['kg', 'szt']
const isFromDb = (id: string) => !id.includes('-');
type NewOrderProps = RouteComponentProps & {
    persistItems: any
    persistedItems: any
    persistedCity: string
    persistCity: any
}
const NewOrder = (props: NewOrderProps) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [inputItemId, setInputItemId] = useState<string | null>(null);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);
    const [city, setCity] = useState<null | string>(props.persistedCity ? props.persistedCity : null);
    const [modalOpen, setModalOpen] = useState<boolean>(!Boolean(props.persistedCity));
    const [items, setItems] = useState<any[]>([...props.persistedItems]);
    const [error, setError] = useState<string | null>(null);
    const { t, i18n } = useTranslation();
    const byId = (id: string | null): any => products.find((x: any) => x.id === id);
    const selectCity = (city: string) => {
        setCity(city);
        props.persistCity(city);
        setModalOpen(false)
    };
    const addItem = (e: any, itemID?: string) => {
        if(e) e.preventDefault();
        if (inputValue.trim().length === 0 || items.find((x: any) => x.id === inputItemId))
                return;

        if(inputItemId || itemID){

            const currItem = byId(itemID !== null && itemID !== undefined ? itemID : inputItemId);
            setItems([
                ...items,
                {
                    id: currItem.id,
                    quantity: 1,
                    ...currItem[i18n.language]
                }
            ]);
        }else if(itemID !== null){
            setItems([
                ...items,
                {
                    label: inputValue,
                    id: uuidv4(),
                    price: 0,
                    quantity: 1,
                    unit: 'select'
                }
            ]);
        }

        setInputItemId(null);
        setInputValue('')
    };
    const removeItem = (itemIdx: number) => {
        let updatedItems = items;
        updatedItems.splice(itemIdx, 1);
        setItems([...updatedItems])
    };
    const saveItems = () => {
        if (items.length === 0){
            setError('___input-add___')
            return;
        }
        for(const item of items){
            if(item.price <= 0){
                setActiveItemId(item.id);
                setError(`${item.id}___price`);
                return;
            }
            if(item.unit === 'select'){
                setActiveItemId(item.id);
                setError(`${item.id}___unit`);
                return;
            }
        }
        props.persistItems(items);
        navigate('/app/shipment');
    };
    const isActive = (id: any) => id === activeItemId;
    const toggleActiveItemId = (id: string) => setActiveItemId(isActive(id) ? null : id);

    const changeQuantity = (index: number, decrement: boolean) => {
        const updatedItems = items;
        const updatedQuantity = updatedItems[index].quantity+(decrement ? -1 : 1);
        if(updatedQuantity <= 0)
                return;

        updatedItems[index].quantity = updatedQuantity;
        setItems([...updatedItems])
    };
    const changePrice = (index: number, price: number) => {
        const updatedItems = items;
        if(price < 0)
            return;

        updatedItems[index].price = price;
        setItems([...updatedItems])
    };
    const changeUnit = (index: number, unit: string) => {
        const updatedItems = items;
        if(!units.includes(unit))
            return;

        updatedItems[index].unit = unit;
        setItems([...updatedItems])
    };
    return (
        <AppLayout goBack={false}>
            <SEO title={t('NEW_ORDER')}/>

            <Container>
                <CitySelect onClick={() => setModalOpen(true)}>{t('SELECTED_CITY')} {city}</CitySelect>
                <h1>{t('WHAT_TO_PROVIDE_YOU')}</h1>
                <form onSubmit={addItem}>
                    <InputAddonGroup>
                        <Autocomplete
                            userInput={inputValue}
                            onUserInputChange={setInputValue}
                            itemId={inputItemId}
                            onSetItemId={(data: any) => {
                                addItem(null, data);
                            }}
                            error={error === '___input-add___'}
                            setError={setError}
                        />
                        <button type={"submit"}>
                            <span className="material-icons">add</span>
                        </button>
                        <BarcodeIcon>
                            <img src={require('../../design/assets/barcode.png')} alt="Scan barcode"/>
                        </BarcodeIcon>
                    </InputAddonGroup>
                </form>
            </Container>
                <List>
                    {
                        items.map((item: Product, i: number) => (
                            <ListItem
                                key={item.id}
                                item={item}
                                active={isActive(item.id)}
                                onIncrementQuantity={() => changeQuantity(i, false)}
                                onDecrementQuantity={() => changeQuantity(i, true)}
                                onSetPrice={(e: KeyboardEvent<HTMLInputElement>) => changePrice(i, parseFloat((e.target as HTMLInputElement).value))}
                                onSetUnit={(e: KeyboardEvent<HTMLInputElement>) => (!isFromDb(item.id) && changeUnit(i, (e.target as HTMLInputElement).value))}
                                onToggleActiveItem={() => toggleActiveItemId(item.id)}
                                onRemoveItem={() => removeItem(i)}
                                error={error}
                                setError={setError}
                            />
                        ))
                    }
                </List>
                <Container>
                    <Button onClick={saveItems}>{t('ORDER_BTN_TEXT')}</Button>
                </Container>

            <ModalWrapper active={modalOpen}>
                <Modal>
                    <h3>{t('SELECT_CITY')}</h3>
                    <CityList>
                        {
                            (cities as any)[i18n.language].sort().map((city: string )=> (
                            <li
                                key={city}
                                onClick={() => selectCity(city)}>
                                    {city}
                            </li>
                            ))
                        }
                    </CityList>
                </Modal>
                <Flags>
                    <FlagImage
                        active={i18n.language === 'en'}
                        onClick={() => i18n.changeLanguage('en')}
                        src={require('../../design/assets/en.png')} alt=""/>
                    <FlagImage
                        active={i18n.language === 'pl'}
                        onClick={() => i18n.changeLanguage('pl')}
                        src={require('../../design/assets/pl.png')} alt=""/>
                </Flags>
            </ModalWrapper>
        </AppLayout>
    )
};
const mapStateToProps = (state: any) => ({
    persistedItems: state.items,
    persistedCity: state.city.city
});
const mapDispatchToProps = {
    persistItems: makeAction(SAVE_ITEMS),
    persistCity: makeAction(SAVE_CITY)
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
