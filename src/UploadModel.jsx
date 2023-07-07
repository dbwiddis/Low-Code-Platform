import React from 'react';

class UploadModel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskId: null
        };
    }

    handleChange = event => {
        this.setState({ input: event.target.value });
    }

    handleClick() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( this.state.input )
        };
        fetch('http://127.0.0.1:5000/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ taskId: data.task_id }));
    }

    render() {
        const { taskId } = this.state;
        return (
            <div style={{marginBottom: "25%"}}>
                <textarea
                    rows={20}
                    cols={100}
                    onChange={this.handleChange}
                />
                <input
                    type="button"
                    value="Upload Model"
                    style={{marginTop: "10%"}}
                    onClick={this.handleClick.bind(this)}
                />
                <p>Task Id: {taskId}</p>

            </div>
        );
    }
}

export { UploadModel }; 