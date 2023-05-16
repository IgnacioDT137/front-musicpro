import axios from "axios";

export const apiRequestNoToken = (method, url, data) => {
    return axios({
        method,
        url,
        data
    })
}
