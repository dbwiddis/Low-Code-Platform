import React from 'react';

class CreatePipeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: null,
            acknowledged: null
        };
    }

    handleChange = event => {
        this.setState({ input: event.target.value });
    }

    handleClick() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://127.0.0.1:5000/pipeline/'+this.state.input, requestOptions)
            .then(response => {response.json(); this.setState({ acknowledged: response.statusText })})
    }

    render() {
        const { acknowledged } = this.state;
        
        return (
            <div className="card text-center m-3" style={{marginBottom: "25%"}}>
                <input
                    type="text"
                    // value={this.state.value}
                    onChange={this.handleChange}
                />
                <input
                    type="button"
                    value="Create Neural Pipeline"
                    style={{marginLeft: "10%"}}
                    onClick={this.handleClick.bind(this)}
                />
                 <p>Response: {acknowledged} </p>

            </div>
        );
    }

}

export { CreatePipeline };