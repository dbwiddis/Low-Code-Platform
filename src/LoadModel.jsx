import React from 'react';

class LoadModel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: null,
            taskId: null
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
        fetch('http://127.0.0.1:5000/load/'+this.state.input, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ taskId: data.task_id }));
    }


    render() {
        const { taskId } = this.state;
        
        return (
            <div className="card text-center m-3" style={{marginBottom: "30%"}}>
                <input
                    type="text"
                    // value={this.state.value}
                    onChange={this.handleChange}
                />
                <input
                    type="button"
                    value="Load Model"
                    style={{marginLeft: "10%"}}
                    onClick={this.handleClick.bind(this)}
                />
                <p>Task Id: {taskId}</p>

            </div>
        );
    }
}

export { LoadModel }; 