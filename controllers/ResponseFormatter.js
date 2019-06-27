'use strict';

const
    formatterResponse = {};

function transactionResponse(response) {
    console.log("Sending Success Transaction Response: ", response)
    return {
        success: true,
        payload: {
            message: response
        }
    };
}

function queryResponse(payload,token) {
    console.log("Sending Success Query Response: ", payload)
    return {
        success: true,
        payload: payload,
        token: token
    };

}

function errorResponse(errorCode) {
    console.log("Sending Error Response")
    return {
        success: false,
        errorCode: errorCode
    };
}

formatterResponse.transactionResponse = transactionResponse
formatterResponse.queryResponse = queryResponse
formatterResponse.errorResponse = errorResponse
formatterResponse.SUCCESS_RESPONSE = 200
formatterResponse.UNHANDLED_ERROR = 500
module.exports = formatterResponse;