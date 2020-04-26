import React, {createRef, useState} from 'react';
import {Input} from "./FormControls";
import styled from "styled-components";
import products from "../data/products";
import {useTranslation} from "react-i18next";


const AutocompleteWrapper = styled.div`
    position: relative;
    width: 100%;
`;
type SuggestionsListProps = {
    showSuggestions: boolean
}
const SuggestionsList = styled.ul<SuggestionsListProps>`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    display: ${props => props.showSuggestions ? 'block' : 'none'};
    padding-inline-start: 0;
    z-index: 1;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    margin: 0;
    li{
        display: block;
        padding: 10px;
        transition: .2s all;
        background: white;
        outline: none;
        &:hover, &:focus{
            background: #e5e5eb;
        }
    }
`;


type Suggestion = any

type AutocompleteProps = any
const Autocomplete = (props: AutocompleteProps) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSugestions] = useState<boolean>(false);
    const [lastSuggestionLabel, setLastSuggestionLabel] = useState<string | null>(null);
    const inputRef = createRef<HTMLInputElement>();
    const { i18n: {language}} = useTranslation();
    const handleChange = (e: any) => {
        e.persist();
        if(props.error && props.setError){
            props.setError(null);
        }
        const value = e.target.value;
        const filteredSuggestions = value.trim().length > 0 ?
            products.filter((suggestion: Suggestion) => suggestion[language].label.toLowerCase().includes(value.trim().toLowerCase()))
            : [];

        setFilteredSuggestions(filteredSuggestions);
        setShowSugestions(true);
        if(lastSuggestionLabel !== value.trim().toLowerCase()){
            setLastSuggestionLabel(null)
            if(props.onSetItemId) {
                props.onSetItemId(null);
            }
        }

        if(props.onUserInputChange){
            props.onUserInputChange(value);
        }
    };
    const getSuggestion = (i: number, e: any) => {
        e.persist();

        if(e.keyCode === 13 || !e.keyCode){

            setShowSugestions(false);
            if(inputRef.current)
                inputRef.current.focus();
            const item = filteredSuggestions[i];
            setLastSuggestionLabel(item[language].label);
            if(props.onUserInputChange) {
                props.onUserInputChange(item[language].label);
            }
            if(props.onSetItemId) {
                props.onSetItemId(item.id);
            }
            setFilteredSuggestions([]);
        }
    };


     return (
         <AutocompleteWrapper>
             <Input onChange={handleChange} value={props.userInput} ref={inputRef} error={props.error}/>
             <SuggestionsList showSuggestions={showSuggestions}>
                 {
                     filteredSuggestions.map((suggestion: Suggestion, i: number) => (
                         <li
                             tabIndex={0}
                             key={suggestion.id}
                             onClick={(e: any) => getSuggestion(i, e)}
                             onKeyUp={(e: any) => getSuggestion(i, e)}>{suggestion[language].label}</li>
                     ))
                 }
             </SuggestionsList>
         </AutocompleteWrapper>
     );
};

export default Autocomplete;
