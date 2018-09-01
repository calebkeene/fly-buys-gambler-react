import axios from 'axios';

let MemberService = {
  // TODO: put these in shared ENV
  apiBaseUrl: 'http://localhost:5000/api/v1/',

  privateApiKey: '0101-1122-3344-5566',

  checkMemberExists: (cardNumberOrEmail) => {
    console.log("calling checkMemberExists");

    let requestUrl = `${this.apiBaseUrl}/member/exists`;
    let requestData = {
      private_api_key: this.privateApiKey,
      card_number_or_email: cardNumberOrEmail
    };

    axios({
      method: 'get',
      url: requestUrl,
      data: requestData
    })
    .then((response) => {
      console.log('received response! => ' + JSON.stringify(response));
      return {
        message: response.data['message'],
        status: response.status
      };
    })
  }
}

export default MemberService;
