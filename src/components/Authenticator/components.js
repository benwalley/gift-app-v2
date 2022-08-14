import Header from "../Header";
import Footer from "../Footer";
import {useAuthenticator} from "@aws-amplify/ui-react";
import Button from "@mui/material/Button";

const components = {
    SignIn: {
        Footer() {
            const {toResetPassword} = useAuthenticator();

            return (
                <div>
                    <Button
                        fontWeight="normal"
                        onClick={toResetPassword}
                        size="small"
                        variation="link"
                    >
                        Reset Password
                    </Button>
                </div>
            );
        },
    },

    SignUp: {
        Footer() {
            const {toSignIn} = useAuthenticator();

            return (
                <div>
                    <Button
                        fontWeight="normal"
                        onClick={toSignIn}
                        size="small"
                        variation="link"
                    >
                        Back to Sign In
                    </Button>
                </div>
            );
        },
    }
};

export default components;
