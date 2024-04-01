import {BASE_URL} from './baseurl'
import {commonAPI} from './Commonapi'

//upload questions to the server

export const uploadQuestions = async (questions) => {
    const url = `${BASE_URL}/questions`
    const reqBody = questions
    return await commonAPI('POST',url,reqBody)
}

export const GetQuestions = async () => {
    const url = `${BASE_URL}/questions`;
    return await commonAPI('GET', url);
};

export const fetchQuestion = async (id) => {
    const url = `${BASE_URL}/questions/${id}`;
    return await commonAPI('GET', url);
};


export const updateQuestion = async (updatedQuestion) => {
    const url = `${BASE_URL}/questionsid/${updatedQuestion._id}`;
    return await commonAPI('PUT', url, updatedQuestion);
  };