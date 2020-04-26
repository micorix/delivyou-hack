import styled from "styled-components";

const Container = styled.div<{narrow?: boolean}>`
    width: ${props => props.narrow ? 'calc(100% - 2em)' : '80%'};
    margin: auto;
`;

export default Container;
