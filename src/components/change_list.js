import React from 'react';
import { Button, Modal, Nav, Form,  } from 'react-bootstrap';

class ChangeListDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          value: props.data_path
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault()
        var searchParams = new URLSearchParams();
        searchParams.set("list", this.state.value)
        console.log(searchParams.toString())
        window.location.search = searchParams.toString();
      }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});

    render() {
        return <>
        <Nav.Link href="#" onClick={this.handleShow}>Change List</Nav.Link>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Change List</Modal.Title>
                </Modal.Header>
                <Modal.Body><p>Input a URL below to use that list on this page. Warning: Invalid URLs may cause issues.</p>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formpath">
                        <Form.Label>URL</Form.Label>
                        <Form.Control placeholder="/lists/mcc-rising.json" value={this.state.value} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
                    <p>You can also use some of the lists we've pre-created!</p>
                    <Button href="?list=/lists/mcc-rising.json">MCC Rising</Button>
                </Modal.Body>
            </Modal>
            </>
    }
}

export default ChangeListDisplay;