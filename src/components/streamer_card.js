import React from 'react';
import { Card, Tab, Tabs, Ratio, Button, Stack } from 'react-bootstrap';
import { Twitch, Youtube } from 'react-bootstrap-icons'
import ReactPlayer from 'react-player'


class StreamerCard extends React.Component {


    render() {
        var activeKey;
        var tabs = [];
        if(this.props.streamer.streams.twitch != null){
            tabs.push(
                <Tab eventKey={"twitch-"+this.props.streamer.name} title={<Twitch/>}>
                    <Ratio aspectRatio="16x9">
                        <ReactPlayer url={this.props.streamer.streams.twitch} width='100%' height='100%' />
                    </Ratio>
                </Tab>
            )
            if (activeKey == null){activeKey = "twitch-"+this.props.streamer.name;}
        }

        if(this.props.streamer.streams.youtube != null){
            tabs.push(
                <Tab eventKey={"youtube-"+this.props.streamer.name} title={<Youtube/>}>
                    <Ratio aspectRatio="16x9">
                    <ReactPlayer url={this.props.streamer.streams.youtube} width='100%' height='100%' />
                    </Ratio>
                </Tab>
            )
            if (activeKey == null){activeKey = "youtube-"+this.props.streamer.name;}
        }

        if(this.props.streamer.links){
            var links = [];
            for(var item of Object.keys(this.props.streamer.links)){
                links.push(<Button target="_blank" href={this.props.streamer.links[item]}>{item}</Button>);
            }
        }

      return (
        <Card>
            <Card.Body>
                <Card.Title>{this.props.streamer.name}</Card.Title>
                <p>{this.props.streamer.description}</p>
                <Stack direction="horizontal" gap={3}>{links}</Stack>
                <Tabs defaultActiveKey={activeKey} activeKey={activeKey} className="mb-3">
                    {tabs}
                </Tabs>

            </Card.Body>
        </Card>
      );
    };
  }

export default StreamerCard;