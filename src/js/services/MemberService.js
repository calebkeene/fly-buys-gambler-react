import ENV from './env';

let MemberService = {
  // TODO: get rid of all the duplication in this file
  checkMemberExists: (cardNumberOrEmail) => {
    console.log("calling checkMemberExists");

    let requestUrl = `${ENV.apiBaseUrl}/member/find.json?&private_api_key=${ENV.privateApiKey}&card_number_or_email=${cardNumberOrEmail}`;
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
        let status = responseClone.status;
        return { message: responseJson['message'], status };
      })
      .catch(error => {
        console.log('there was an error! =>' + error);
        console.log(JSON.stringify(error));
      })
    );
  },

  // TODO: roll sign-in and sign-out into one function
  signInMember: (memberPassword, cardNumberOrEmail) => {
    let requestUrl = `${ENV.apiBaseUrl}/member/login.json?&private_api_key=${ENV.privateApiKey}&card_number_or_email=${cardNumberOrEmail}&password=${memberPassword}`;
    let responseClone;

    return(
      fetch(requestUrl, {
        method: 'POST',
        credentials: 'same-origin'
      })
      .then(response => { // TODO: reduce duplication in this file with some shared functions
        responseClone = response.clone();
        return response.json();
      })
      .then(responseJson => {
        console.log('responseJson => ' + JSON.stringify(responseJson));

        let status = responseClone.status;
        let responseObject = { message: responseJson['message'], status };

        if (status === 200) {
          responseObject.email = responseJson['email'];
          responseObject.name = responseJson['name'];
          responseObject.currentBalance = responseJson['fly_buys_balance'];
        }
        return responseObject;
      })
      .catch(error => {
        console.log('there was an error! =>' + error);
        console.log(JSON.stringify(error));
      })
    )
  },

  signOutMember: (email) => {
    console.log("calling loginMember");
    let requestUrl = `${ENV.apiBaseUrl}/member/logout.json?&private_api_key=${ENV.privateApiKey}&card_number_or_email=${email}`;
    let responseClone;

    return (
      fetch(requestUrl, {
        method: 'POST'
      })
      .then(response => {
        responseClone = response.clone();
        return response.json();
      })
      .then(responseJson => {
        console.log('responseJson => ' + JSON.stringify(responseJson));
        let status = responseClone.status;
        return { message: responseJson['message'], status };
      })
      .catch(error => {
        console.log('there was an error! =>' + error);
        console.log(JSON.stringify(error));
      })
    )
  }
}

export default MemberService;
