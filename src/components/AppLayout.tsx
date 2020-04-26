import React from 'react';
import styled from "styled-components";
import {navigate} from "@reach/router";
import {useTranslation} from "react-i18next";

const Layout = styled.div`
    min-height: calc(100vh - 2em);
    padding-bottom: 2em;
    h1{
        font-size: 1.2em;
    }
`;
const Toolbar = styled.div`
    padding: 1em 10px;
    margin-bottom: 1em;
    background: #4E37B2;
    border-bottom-left-radius: 4em;
    border-bottom-right-radius: 4em;
    color: white;
    position: relative;
    h4{
        text-align: center;
        margin: 0;
        font-size: 1.2em;
    }
    h5{
        margin: 10px 0 0 0;
        text-align: center;
        font-weight: normal;
    }
`
const GoBack = styled.button`
    position: absolute;
    top: 50%;
    left: 2em;
    transform: translate(0, -50%);
    background: none;
    border: none;
    outline: none;
    color: white;
    border-radius: 50%;
`;
type AppLayoutProps = {
    goBack: boolean | string
    children: any
}
const AppLayout = (props: AppLayoutProps) => {
    const { t } = useTranslation();
    return (
        <Layout>
            <Toolbar>
                {
                    props.goBack && (
                        <GoBack onClick={() => navigate((props.goBack as any))}>
                            <span className="material-icons">keyboard_backspace</span>
                        </GoBack>
                    )
                }
                <h4>DelivYou</h4>
                <h5>{t('TOOLBAR_SUBTITLE')}</h5>
            </Toolbar>
            {props.children}
        </Layout>
    );
};

export default AppLayout;
