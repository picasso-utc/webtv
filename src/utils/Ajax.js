/**
 * Sends an HTTP request to the API.
 */

import {API_URL, API_URL_2} from './Config'
import axios from 'axios';


const defaultConfig = {withCredentials: true}


function ajaxGet(path) {
    return axios.get(API_URL + path, defaultConfig);
}
function ajaxGet2(path) {
    return axios.get(API_URL_2 + path);
}

function ajaxPost(path, data) {
    return axios.post(API_URL + path, data, defaultConfig);
}

function ajaxPut(path, data) {
    return axios.put(API_URL + path, data, defaultConfig);
}

function ajaxPatch(path, data) {
    return axios.patch(API_URL + path, data, defaultConfig);
}

function ajaxDelete(path) {
    return axios.delete(API_URL + path, defaultConfig);
}


export { ajaxGet, ajaxPost, ajaxPut, ajaxDelete, ajaxPatch, ajaxGet2 };
