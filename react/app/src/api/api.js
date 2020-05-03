
import axios from 'axios'

const ENDPOINT = '/api/tagTweets/'
const SERVER = ''
const API_LINK = `${SERVER}${ENDPOINT}`
const AMOUNT = 50;

const getResult = async (hashtag) => {
    return await axios.get(`${API_LINK}${hashtag}/${AMOUNT}`);
}

export {
    getResult,
}