from opensearchpy import OpenSearch
import asyncio
import argparse
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def create_client():
    host = ''
    port = ''
    auth = ('', '')  # For testing only. Don't store credentials in code.
    ca_certs_path = '/full/path/to/root-ca.pem'  # Provide a CA bundle if you use intermediate CAs with your root CA.

    # Create the client with SSL/TLS enabled, but hostname verification disabled.
    return OpenSearch(
        hosts=[{'host': host, 'port': port}],
        http_compress=True,  # enables gzip compression for request bodies
        http_auth=auth,
        use_ssl=False
    )


client = create_client()


@app.route('/', methods=['POST'])
async def upload_model():
    settings = {
        "persistent": {
            "plugins.ml_commons.only_run_on_ml_node": "false"
        }
    }
    client.cluster.put_settings(settings)

    body = request.get_json()

    # body = {
    #     "name": "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
    #     "version": "1.0.1",
    #     "description": "his is a sentence-transformers model: It maps sentences & paragraphs to a 384 dimensional dense vector space and can be used for tasks like clustering or semantic search",
    #     "model_task_type": "TEXT_EMBEDDING",
    #     "model_format": "TORCH_SCRIPT",
    #     "model_content_size_in_bytes": 488135181,
    #     "model_content_hash_value": "a2ae3c4f161bd8e5a99a19ba5589443d33a120bb2bd67aa9da102c8b201f1277",
    #     "model_config": {
    #         "model_type": "bert",
    #         "embedding_dimension": 384,
    #         "framework_type": "sentence_transformers",
    #         "all_config": "{\"_name_or_path\":\"old_models/paraphrase-multilingual-MiniLM-L12-v2/0_Transformer\",\"architectures\":[\"BertModel\"],\"attention_probs_dropout_prob\":0.1,\"gradient_checkpointing\":false,\"hidden_act\":\"gelu\",\"hidden_dropout_prob\":0.1,\"hidden_size\":384,\"initializer_range\":0.02,\"intermediate_size\":1536,\"layer_norm_eps\":1e-12,\"max_position_embeddings\":512,\"model_type\":\"bert\",\"num_attention_heads\":12,\"num_hidden_layers\":12,\"pad_token_id\":0,\"position_embedding_type\":\"absolute\",\"transformers_version\":\"4.7.0\",\"type_vocab_size\":2,\"use_cache\":true,\"vocab_size\":250037}"
    #     },
    #     "created_time": 1676326534702,
    #     "url": "https://artifacts.opensearch.org/models/ml-models/huggingface/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2/1.0.1/torch_script/sentence-transformers_paraphrase-multilingual-MiniLM-L12-v2-1.0.1-torch_script.zip"
    # }

    print(body)

    return client.transport.perform_request("POST", "/_plugins/_ml/models/_upload", body=body)


@app.route('/model/<taskId>', methods=['GET'])
async def get_model_id(taskId):
    return client.transport.perform_request("GET", "/_plugins/_ml/tasks/" + taskId)


@app.route('/load/<modelId>', methods=['POST'])
async def load_model(modelId):
    return client.transport.perform_request("POST", "/_plugins/_ml/models/" + modelId + "/_load")


@app.route('/pipeline/<modelId>', methods=['PUT'])
async def create_pipeline(modelId):
    body = {
        "description": "Semantic Search for retail product catalog ",
        "processors": [
            {
                "text_embedding": {
                    "model_id": modelId,
                    "field_map": {
                        "description": "desc_v",
                        "name": "name_v"
                    }
                }
            }
        ]
    }

    print(body)

    return client.transport.perform_request("PUT", "/_ingest/pipeline/neural-pipeline", body=body)


@app.route('/index/<index>', methods=['PUT'])
async def create_index(index):
    index_body = {
        "settings": {
            "index.knn": True,
            "default_pipeline": "neural-pipeline",
            "number_of_shards": 1,
            "number_of_replicas": 1
        },
        "mappings": {
            "properties": {
                "desc_v": {
                    "type": "knn_vector",
                    "dimension": 384,
                    "method": {
                        "name": "hnsw",
                        "engine": "nmslib",
                        "space_type": "cosinesimil"
                    }
                },
                "name_v": {
                    "type": "knn_vector",
                    "dimension": 384,
                    "method": {
                        "name": "hnsw",
                        "engine": "nmslib",
                        "space_type": "cosinesimil"
                    }
                },
                "description": {
                    "type": "text"
                },
                "name": {
                    "type": "text"
                }
            }
        }
    }

    print(index_body)

    return client.indices.create(index, body=index_body)


@app.route('/reindex/<index>', methods=['POST'])
async def reindex(index):
    body = {
        "source": {
            "index": "solarsystem"
        },
        "dest": {
            "index": index
        }
    }

    print(body)
    return client.transport.perform_request("POST", "/_reindex", body=body)

@app.route('/search/<index>', methods=['GET'])
async def check_vector(index):
    body = {
        "query": {
            "match_all": {}
        }
    }

    return client.transport.perform_request("GET", "/"+index+"/_search", body=body)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    loop = asyncio.get_event_loop()

    parser = argparse.ArgumentParser()
    # parser.add_argument("c", help="Update clus")
    # parser.add_argument("-u", help="Upload model")
    parser.add_argument("-t", "--taskId", help="Provide task id to get the model id")
    parser.add_argument("-l", "--modelId", help="Provide model id to get the task id")
    parser.add_argument("-s", "--status", help="Provide task id to check the status of the model")
    parser.add_argument("-p", "--pipeline", help="Provide model id to create pipeline")

    args = parser.parse_args()
    if args.taskId:
        model_id = loop.run_until_complete(get_model_id(client, args.taskId))
        print(model_id)
        exit()
    elif args.modelId:
        task_id = loop.run_until_complete(load_model(client, args.modelId))
        print(task_id)
        exit()
    elif args.status:
        status = loop.run_until_complete(get_model_id(client, args.status))
        print(status)
        exit()
    elif args.pipeline:
        pipeline = loop.run_until_complete(create_pipeline(client, args.pipeline))
        print(pipeline)
        exit()

    # loop.run_until_complete(main(client))
    loop.close()

    app.run()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
