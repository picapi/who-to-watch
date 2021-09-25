import './App.css';
import React from 'react';
import { Nav, Navbar, Container, Stack, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import StreamerCard from './components/streamer_card';
import HistoryDisplay from './components/history_display';
import { addToHistory, getCurrent, setCurrent, sortPools, saveSeenPool} from './helpers/history';
import { shuffle } from './helpers/selection';
import ChangeListDisplay from './components/change_list';
const urlParams = new URLSearchParams(window.location.search);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      loaded_data: null
    };
  }

  componentDidMount() {
    var path = urlParams.get("list")
    if(path == null){
      path = "/lists/mcc-rising.json"
    }
    fetch(path)
      .then(res => res.json())
      .then(
        (result) => {
          // Create our pools
          let {unseen_pool, seen_pool} = sortPools(path, result.entries);
          console.log(seen_pool)
          unseen_pool = shuffle(unseen_pool)
          // Get the current stream
          var current = getCurrent(path, unseen_pool)
          if (current == null) {
            current = unseen_pool.pop()
          } else {
            unseen_pool.splice(unseen_pool.indexOf(current),1)
          }
          this.setState({
            isLoaded: true,
            data_path: path,
            meta: result.meta,
            seen_pool: seen_pool,
            unseen_pool: unseen_pool,
            selected_streamer: current,
            all_streamers: result.entries
          });

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, data_path, isLoaded, meta, seen_pool, unseen_pool, selected_streamer, all_streamers } = this.state;
    if (error) {
      return <div>Error: {error.message}<br/><a href="/">Back to safety</a></div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      saveSeenPool(data_path,seen_pool)
      if (selected_streamer != null) {
        addToHistory(data_path, selected_streamer.name);
        setCurrent(data_path, selected_streamer)
        var content = <StreamerCard streamer={selected_streamer}></StreamerCard>
      } else {
        var content = <div><h1>You've gone through every streamer in the list!</h1>
          <Button
            onClick={() => { 
              saveSeenPool(data_path,[])
              let {unseen_pool, seen_pool} = sortPools(data_path, all_streamers);
              unseen_pool = shuffle(unseen_pool)
              var current = unseen_pool.pop()
              this.setState({
                seen_pool: seen_pool,
                unseen_pool: unseen_pool,
                selected_streamer: current,
              });
             }}
          >Reset pool</Button>
        </div>
      }
      return (
        <div>
          <Stack gap={3}>
            <Container>
              <Navbar fixed="top" bg="dark" variant="dark">
                <Container>
                  <Navbar.Brand href="/">who-to-watch</Navbar.Brand>
                  <Nav className="me-auto">
                  <HistoryDisplay data_path={data_path} link_function={(name) => this.setState({selected_streamer: all_streamers.filter(x => x.name == name).pop()})} ></HistoryDisplay>
                  <ChangeListDisplay data_path={data_path}>Change List</ChangeListDisplay>
                  </Nav>
                </Container>
              </Navbar>
            </Container>
            <Container>
              <h1>{meta.name}</h1>
              <p>{meta.description}</p>
              <Stack direction="horizontal" gap={3}><Button
                onClick={() => { seen_pool.push(selected_streamer);
                  this.setState({
                  seen_pool: seen_pool,
                  selected_streamer: unseen_pool.pop(),
                  unseen_pool: shuffle(unseen_pool)
                })}}
              >Next stream</Button>{unseen_pool.length} left

              </Stack>
                {content}
            </Container>
          </Stack>
        </div>
      );
    }
  }
}

export default App;
