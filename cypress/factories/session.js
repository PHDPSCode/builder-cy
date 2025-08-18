export default class Session {
  set token (token) {
    this.accessToken = token;
  };

  get token () {
    return this.accessToken;
  };
}
