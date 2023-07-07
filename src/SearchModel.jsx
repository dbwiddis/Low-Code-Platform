import React from 'react';

class SearchModel extends React.Component {
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
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://127.0.0.1:5000/search/'+this.state.input, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ index: data.hits.hits }));
    }

    render() {
        const { index } = this.state;
        
        return (
            <div className="card text-center m-3" style={{marginBottom: "30%"}}>
                <input
                    type="text"
                    // value={this.state.value}
                    onChange={this.handleChange}
                />
                <input
                    type="button"
                    value="Get Vectors"
                    style={{marginLeft: "10%"}}
                    onClick={this.handleClick.bind(this)}
                />
                <p>name vectors:
                {index && index.map((value, key) => (
                    
                    <li>{value._source.name_v}</li>
                ))}
                </p>

            </div>
        );
    }
}

export { SearchModel }; 