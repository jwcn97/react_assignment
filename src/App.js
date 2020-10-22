// Core
import React from "react";
import './App.css'

import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import Checkbox from '@material-ui/core/Checkbox';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

const api = 'https://api.selfi.ai/assessment-templates/';

const snackbar_duration = 1500;

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .04)',
  },
})(MuiAccordionSummary);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: [],
      current_test: {},
      current_traits: [],
      loading: false,
      warning: false,
      submit: false,
    };
  }

  componentDidMount() {
    fetch(api)
    .then((res) => res.json())
    .then((tests) => {
        this.setState({
            tests: tests,
            current_test: {},
        });
    });
  }

  toggleTest = (test) => {
    if (test.id === this.state.current_test.id) return;
    this.setState({ current_test: test })
  }

  displayDescription = (outcome) => {
    document.getElementById("outcome-name").innerHTML = outcome ? outcome.name : "";
    document.getElementById("outcome-description").innerHTML = outcome ? outcome.description : "";
    this.setState({ current_traits: (outcome && outcome.traits) ? outcome.traits : [] })
  }

  submit = () => {
    if (!this.state.current_test.id) {
      this.setState({ warning: true })
      return;
    }
    this.setState({ loading: true }, () => {
      setTimeout(() => {
        this.setState({
          loading: false,
          submit: true
        })
      }, 1000)
    });
  }

  render() {
    return (
      <div className="app">
        <div style={{display: this.state.loading ? 'block' : 'none' }}>
          <div id="loading"></div>
          <div id="progress">
            <CircularProgress />
          </div>
        </div>
        <Snackbar
          open={this.state.warning}
          autoHideDuration={snackbar_duration}
          onClose={() => this.setState({ warning: false })}
        >
          <Alert severity="warning">
            Please select an assessment!
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.state.submit}
          autoHideDuration={snackbar_duration}
          onClose={() => this.setState({ submit: false })}
        >
          <Alert severity="success">
            You have selected this assessment
          </Alert>
        </Snackbar>
        <div className="top-row">
          <h1 className="label">SELFI.AI ASSESSMENTS</h1>
          <div className="next-button">
            <Button variant="contained" onClick={this.submit.bind(this)}>NEXT</Button>
          </div>
        </div>
        <div className="container">
          <div className="tests">
            {this.state.tests.map((test) => {
              return (
                <div key={test.title}>
                <Accordion
                  square
                  expanded={this.state.current_test.id === test.id}
                  onClick={() => this.setState({ current_test: test })}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={test.title}
                  >
                    <Checkbox checked={this.state.current_test.id === test.id}></Checkbox>
                    <h2>{test.title}</h2>
                    <div className="chips">
                      {test.target ? test.target.map((target) => {
                        return <Chip key={target} size="small" label={target} />
                      }) : null}
                    </div>
                    <div className="chips">
                      {test.is_free ? <Chip size="small" label="FREE!" color="primary"/> : null}
                    </div>
                    <div className="chips">
                      {test.references_recommended ? <Chip size="small" label="References Recommended" color="secondary"/> : null}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="test-details">
                      <Typography>
                        Questions: {test.questions_count || 0}<br/><br/>
                        {test.description}<br/><br/>
                      </Typography>
                      <div className="outcomes">
                        {test.outcomes.map((outcome) => {
                          return (
                            <div
                              className="chips"
                              key={outcome.name}
                              onMouseEnter={() => this.displayDescription(outcome)}
                            >
                              {outcome.name ? <Chip label={outcome.name} /> : null}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
                </div>
              )
            })}
          </div>
          <div className="test_description">
            <div>
              <h3 id="outcome-name"> </h3>
              <p id="outcome-description"> </p>
            </div>
            {this.state.current_traits.map((trait) => {
              return (<div className="traits" key={trait.name}>
                <p style={{fontWeight: "bold"}}>{trait.name}</p>
                <p>{trait.description}</p>
              </div>)
            })}
          </div>
        </div>
      </div>
    );
  }
}


export default App;