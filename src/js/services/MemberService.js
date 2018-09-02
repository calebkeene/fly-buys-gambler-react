import ENV from './env';

let MemberService = {

  checkMemberExists: (cardNumberOrEmail) => {
    console.log("calling checkMemberExists");

    let requestUrl = `${ENV.apiBaseUrl}/member/exists.json?&private_api_key=${ENV.privateApiKey}&card_number_or_email=${cardNumberOrEmail}`;

    // will be used to get around only being able to return json from first promise
    // each response attribute can only be read once - hence the need for a clone
    let responseClone;

    return(
      fetch(requestUrl, {
        method: "GET"
      })
      .then(response => {
        responseClone = response.clone();
        return response.json();
      })
      .then(responseJson => {
        console.log('responseJson => ' + JSON.stringify(responseJson));
        return { message: responseJson['message'], status: responseClone.status };
      })
      .catch(error => {
        console.log('there was an error! =>' + error);
        console.log(JSON.stringify(error));
      })
    );
  }
}

export default MemberService;
