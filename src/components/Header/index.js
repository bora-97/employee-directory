import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';


const Header = () => {
    return (
        <Jumbotron fluid>
            <Container>
                <h1>Employee Directory</h1>
                <p>
                Search for an employee by typing their name or using the buttons to filter
                </p>
            </Container>
        </Jumbotron>
    )
}

export default Header