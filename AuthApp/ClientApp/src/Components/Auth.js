
const Auth = {
    isAuthentication: false,
    name: '',
    authenticate() {
        Auth.isAuthentication = true;
    },
    signout() {
        Auth.isAuthentication = false;
    }
}
export default Auth;