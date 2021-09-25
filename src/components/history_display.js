import React from 'react';
import { Button, Modal, Nav } from 'react-bootstrap';
import { getHistory, clearHistory } from '../helpers/history';

class HistoryDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
        };
      }


    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});

    render() {
        var history = getHistory(this.props.data_path);
        var history_links = []
        for(const item of history){
            history_links.push(<><a href="#" onClick={(e) => {e.preventDefault(); this.props.link_function(item); this.handleClose()}}>{item}</a><br/></>)
        }
        return <>
        <Nav.Link href="#" onClick={this.handleShow}>Watch History</Nav.Link>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Watch History</Modal.Title>
                </Modal.Header>
                <Modal.Body><p>Click on a stream below to watch them again!</p>
                    {history_links}
                    <Button
                    onClick={() => { 
                        clearHistory(this.props.data_path);
                        this.handleClose();
                    }}
                >Clear History</Button>
                </Modal.Body>
            </Modal>
            </>
    }
}

export default HistoryDisplay;