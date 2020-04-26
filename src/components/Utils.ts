import styled from "styled-components";

type SeparatorProps = {
    text: string;
}
export const Separator = styled.div<SeparatorProps>`
    margin: 1em 0;
    height: 1em;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before{
        content: '${props => props.text}';
        display: inline-block;
        background: white;
        padding: 5px 10px;
        color: rgba(0, 0, 0, 0.7);
        font-size: .8em;
        border-radius: 5px;
    }
    &::after{
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background: #E6E6EB;
        z-index: -1;
    }
`;
