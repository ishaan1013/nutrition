import { getAuth, signInWithEmailAndPassword, signInAnonymously  } from "firebase/auth";
import  { useRef } from "react"
import { Formik, Field, Form  } from 'formik'
import { RiErrorWarningLine } from 'react-icons/ri'

const auth = getAuth()

function validateEmail(value) {
    let error
    if (!value) {
        error = 'Your email is required.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address.'
    }
    // use state for this and check if account does not exist with firebase error code
    return error
}
  
function validatePw(value) {
    let error
    if (value.length < 8) {
        error = 'Password should be at least 8 characters long.'
        // use state for error message and use the error code from firebase to check
    }
    return error
}

export default function Login() {

    function anon() {
        signInAnonymously(auth)
            .then(() => {
                // Signed in..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });
    }

    const form = useRef()
    return(
        <>
            <div
            onClick={anon()}
            >sign in anonymously</div>
            <Formik
                initialValues={{
                    email: '',
                    pw: '',
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500))
                    createUserWithEmailAndPassword(auth, values.email, values.pw)
                        .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        // ...
                        })
                        .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode)
                        console.log(errorMessage)
                        // ..
                        })
                }}
                validateOnChange={false}
                validateOnBlur={false}
                >
                {({ errors, touched, isValidating }) => (
                    <Form>
                        <div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <Field
                                id="email"
                                name="email"
                                placeholder="user@example.com"
                                as="input"
                                validate={validateEmail}
                                />
                                {errors.email && touched.email &&
                                <div><RiErrorWarningLine/> {errors.email}</div>
                                }
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <Field
                                id="password"
                                name="password"
                                placeholder="Your Message"
                                as="input"
                                validate={validatePw}
                                />
                                {errors.msg && touched.msg &&
                                <div><RiErrorWarningLine/> {errors.msg}</div>
                                }
                            </div>
                            <button
                            type="submit"
                            >Send</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}