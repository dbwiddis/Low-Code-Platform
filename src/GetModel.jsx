import React from 'react';

class GetModel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: null,
            modelId: null
        };
    }

    handleChange = event => {
        this.setState({ input: event.target.value });
    }

    handleClick() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://127.0.0.1:5000/model/'+this.state.input, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ modelId: data.model_id }));
    }

    render() {
        const { modelId } = this.state;
        
        return (
            <div className="card text-center m-3" style={{marginBottom: "30%"}}>
                <input
                    type="text"
                    // value={this.state.value}
                    onChange={this.handleChange}
                />
                <input
                    type="button"
                    value="Get Model Id"
                    style={{marginLeft: "10%"}}
                    onClick={this.handleClick.bind(this)}
                />
                <p>Model Id: {modelId}</p>

            </div>
        );
    }
}

export { GetModel }; 