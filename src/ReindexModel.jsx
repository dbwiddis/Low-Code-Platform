import React from 'react';

class ReindexModel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: null,
            index: null
        };
    }

    handleChange = event => {
        this.setState({ input: event.target.value });
    }

    handleClick() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://127.0.0.1:5000/reindex/'+this.state.input, requestOptions)
        .then(response => {response.json(); this.setState({ index: response.statusText })})
    }


    render() {
        const { index } = this.state;
        
        return (
            <div className="card text-center m-3" style={{marginBottom: "30%"}}>
                Convert "solarsystem" index to vector DB
                <br />
                <br />
                <input
                    type="text"
                    // value={this.state.value}
                    onChange={this.handleChange}
                />
                <input
                    type="button"
                    value="Reindex"
                    style={{marginLeft: "10%"}}
                    onClick={this.handleClick.bind(this)}
                />
                <p>Response: {index} </p>

            </div>
        );
    }
}

export { ReindexModel }; 