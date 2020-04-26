import styled from "styled-components";

export const Input = styled.input<{error?: (boolean | null)}>`
    padding: 10px;
    border-radius: 3px;
    box-sizing: border-box;
    width: 100%;
    background: #F6F6FB;
    border: 2px solid ${props => props.error ? 'red' : '#E6E6EB'};
    &:focus{
        outline: none;
        border-color: ${props => props.error ? 'red' : props.theme.colors.primary};
    }
`;
export const Select = styled.select<{error?: (boolean | null)}>`
    padding: 10px;
    border: 2px solid ${props => props.error ? 'red' : '#E6E6EB'};
    border-radius: 3px;
    box-sizing: border-box;
    background: white;
    width: 100%;
    &:focus{
        outline: none;
        border-color: ${props => props.error ? 'red' : props.theme.colors.primary};
    }
`;
export const InputGroup = styled.div`
    margin-top: 1em;
    &:first-of-type{
        margin-top: 0;
    }
`
export const InputAddonGroup = styled.div`
    display: flex;
    button{
        border: none;
        color: white;
        height: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        color: #FE774F;
        border: 2px solid #E6E6EB;
        border-left-color: transparent;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        &:focus{
            outline: none;
            border-color: ${props => props.theme.colors.secondary};
        }
    }
    span{
        margin-left: 5px;
    }
`;
export const Button = styled.button`
    margin-top: 2em;
    padding: .7em 2em;
    background: ${props => props.theme.colors.secondary};
    color: white;
    border: none;
    border-radius: 10px;
    width: 100%;
    transition: .2s all;
    &:focus{
        box-shadow: 10px 10px 10px #E6E6EB;
    }
`;
