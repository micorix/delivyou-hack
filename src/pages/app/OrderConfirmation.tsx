import React from "react";
import {navigate, RouteComponentProps} from "@reach/router";
import SEO from "../../components/SEO";
import styled from "styled-components";
import Container from "../../components/Container";
import {Button} from "../../components/FormControls";
import AppLayout from "../../components/AppLayout";
import {makeAction} from "../../store/makeAction";
import {RESET} from "../../store/actions";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

const Header = styled.h1`
    text-align: center;
`;

type OrderConfirmationProps = RouteComponentProps & {
    reset: any
}
const OrderConfirmation = (props: OrderConfirmationProps) => {
    const { t } = useTranslation();
    const complete = () => {
        props.reset()
        navigate('/app')
    }
    return (
        <AppLayout goBack={false}>
            <SEO title={t('ORDER_ACCEPTED')}/>
            <Container>
                <Header>{t('ORDER_ACCEPTED')}</Header>
                <Button onClick={complete}>Ok</Button>
            </Container>
        </AppLayout>
    )
}

const mapDispatchToProps = {
    reset: makeAction(RESET)
};

export default connect(null, mapDispatchToProps)(OrderConfirmation);
