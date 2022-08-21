import Amplify, {Auth} from 'aws-amplify';

const isLoggedIn = () => {
    try {
        if(Auth.user?.username) {
            return true;
        }
        return false
    } catch (e) {
        return false;
    }
}

export default isLoggedIn
