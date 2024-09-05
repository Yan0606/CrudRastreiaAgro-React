import { Container } from 'react-bootstrap';
import BarraNavegacao from './BarraNavegacao';

const Dashboard = () => {

    return (
        <>
            <BarraNavegacao />
            <Container className="mt-5">
                <h3>Seja bem vindo!</h3>
            </Container>
        </>
    );
};

export default Dashboard;


