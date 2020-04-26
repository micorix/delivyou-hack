import React from "react";
import styled from "styled-components";
import Container from "../components/Container";
import {Input, InputAddonGroup, Select} from "../components/FormControls";
import {useTranslation} from "react-i18next";

const ListItemWrapper = styled.li`
    background: #F6F6FB;
    margin: 10px 0;
    padding: 10px 0;
    button{
        border: none;
        background: none;
    }
    .item{
        margin-left: 1em;
    }
    .wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    }
    span{
    display: flex;
    align-items: center;
    }
    .material-icons{
        color: rgba(0,0,0,0.7) !important;
    }
`;
const Details = styled.div<any>`
        display: ${props => props.active ? 'grid' : 'none'};
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 1em;
        padding: 1em 0;

`;

const ExpandButton = styled.button<any>`
    transform: rotate(${props => props.active ? '180' : '0'}deg);
    outline: none;
    transition: .5s all;
`;
type ListItemProps = {
    item: any
    active: boolean
    onIncrementQuantity: any
    onDecrementQuantity: any
    onSetPrice: any
    onSetUnit: any
    onToggleActiveItem: any
    onRemoveItem: any
    error: string | null
    setError: any

}
const ListItem = (props: ListItemProps) => {
    const { t, i18n: {language}} = useTranslation();
    const currency = language === 'en' ? '€' : 'zł';
    return (
        <ListItemWrapper>
            <Container narrow>
                <div className="wrapper">
                    <span>
                        <span className="icons">
                            <span className="material-icons" onClick={props.onIncrementQuantity}>
                                add_circle_outline
                            </span>
                            <span className="material-icons" onClick={props.onDecrementQuantity}>
                                remove_circle_outline
                            </span>
                        </span>
                        <span className="item">
                            {props.item.label}
                        </span>
                    </span>
                    <span>
                        <span>{props.item.quantity} {props.item.unit === 'select' ? '' : (props.item.unit === 'szt' && language === 'en' ? 'pcs' : props.item.unit)}</span>
                        <ExpandButton
                            active={props.active}
                            onClick={props.onToggleActiveItem}>
                                <span className="material-icons">expand_more</span>
                        </ExpandButton>
                        <button onClick={props.onRemoveItem}>
                            <span className="material-icons">delete</span>
                        </button>
                    </span>
                </div>
                <Details active={props.active}>
                    <div>
                        <InputAddonGroup>
                            <Input
                                type={"number"}
                                error={Boolean(props.error && props.error.startsWith(props.item.id) && props.error.endsWith('___price'))}
                                onChange={(e: any) => {
                                    props.onSetPrice(e);
                                    if(props.error && props.error.startsWith(props.item.id) && props.error.endsWith('___price')){
                                        props.setError(null);
                                    }
                                }}
                                placeholder={t('PRICE')} value={props.item.price !== 0 ? props.item.price : ''}/>
                                <span>{currency}</span>
                        </InputAddonGroup>
                    </div>
                    <div>
                        <Select
                            onChange={(e: any) => {
                                props.onSetUnit(e);
                                if(props.error && props.error.startsWith(props.item.id) && props.error.endsWith('___unit')){
                                    props.setError(null);
                                }
                            }}
                            value={props.item.unit ? props.item.unit : "select"}
                            error={Boolean(props.error && props.error.startsWith(props.item.id) && props.error.endsWith('___unit'))}
                            disabled={!props.item.id.includes('-')}>
                            <option value="select" disabled={true}>{t('UNIT')}</option>
                            <option value={'szt'}>{t('PCS')}</option>
                            <option value="kg">kg</option>
                        </Select>
                    </div>
                </Details>
            </Container>
        </ListItemWrapper>
    );
};
export default ListItem
