import {InstagramServer} from './serve.js';
import process from 'process'

function getPort(){
    if(!isNaN(process.env.MOCK_SERVICE_PORT) ){
        return process.env.MOCK_SERVICE_PORT;
    }
    const portAttrIndex = process.argv.findIndex(x=>x=='--port');
    if(portAttrIndex == -1){
        return 3500;
    }
    const port = process.argv[portAttrIndex + 1];
    if(isNaN(port)){
        return 3500;
    }
    return port;
}

const port = getPort();
new InstagramServer(port);