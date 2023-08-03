import React from 'react';

class UploadModel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskId: null,
            body: {
                "name": "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
                "version": "1.0.1",
                "description": "This is a sentence-transformers model: It maps sentences & paragraphs to a 384 dimensional dense vector space and can be used for tasks like clustering or semantic search.",
                "model_task_type": "TEXT_EMBEDDING",
                "model_format": "TORCH_SCRIPT",
                "model_content_size_in_bytes": 488135181,
                "model_content_hash_value": "a2ae3c4f161bd8e5a99a19ba5589443d33a120bb2bd67aa9da102c8b201f1277",
                "model_config": {
                  "model_type": "bert",
                  "embedding_dimension": 384,
                  "framework_type": "sentence_transformers",
                  "all_config": "{\"_name_or_path\":\"old_models/paraphrase-multilingual-MiniLM-L12-v2/0_Transformer\",\"architectures\":[\"BertModel\"],\"attention_probs_dropout_prob\":0.1,\"gradient_checkpointing\":false,\"hidden_act\":\"gelu\",\"hidden_dropout_prob\":0.1,\"hidden_size\":384,\"initializer_range\":0.02,\"intermediate_size\":1536,\"layer_norm_eps\":1e-12,\"max_position_embeddings\":512,\"model_type\":\"bert\",\"num_attention_heads\":12,\"num_hidden_layers\":12,\"pad_token_id\":0,\"position_embedding_type\":\"absolute\",\"transformers_version\":\"4.7.0\",\"type_vocab_size\":2,\"use_cache\":true,\"vocab_size\":250037}"
                },
                "created_time": 1676326534702,
                "url": "https://artifacts.opensearch.org/models/ml-models/huggingface/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2/1.0.1/torch_script/sentence-transformers_paraphrase-multilingual-MiniLM-L12-v2-1.0.1-torch_script.zip"
              }
        };
    }

    handleClick() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( this.state.body )
        };
        fetch('http://127.0.0.1:5000/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ taskId: data.task_id }));
    }

    render() {
        const { taskId } = this.state;
        return (
            <div style={{marginBottom: "25%"}}>
                Select a model to upload:
                <select name="selectedModel">
                    <option value="a-model">A model</option>
                    <option value="paraphrase">paraphrase-multilingual-MiniLM-L12-v2</option>
                    <option value="another-model">Another model</option>
                </select>
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