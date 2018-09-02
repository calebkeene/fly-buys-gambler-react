import ENV from './env';

let FlyBuysCardService = {

  updateBalance: (updatedBalance, memberEmail) => {
    let requestUrl = `${ENV.apiBaseUrl}/card/update_balance.json?&private_api_key=${ENV.privateApiKey}&card_number_or_email=${memberEmail}&updated_balance=${updatedBalance}`;
    console.log('requestUrl => ' + requestUrl);
    let responseClone;

    return (
      fetch(requestUrl, {
        method: "PUT"
      })
        .then(response => {
          responseClone = response.clone();
          return response.json();
        })
        .then(responseJson => {
          console.log('responseJson => ' + JSON.stringify(responseJson));

          let status = responseClone.status;
          let responseObject = { message: responseJson['message'], status };

          if (status === 200) {
            responseObject.updatedBalance = responseJson['balance'];
          }
          return responseObject;
        })
        .catch(error => {
          console.log('there was an error! =>' + error);
          console.log(JSON.stringify(error));
        })
    );
  }
}

export default FlyBuysCardService;
