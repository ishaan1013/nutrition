import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
    return error
}
  
function validatePw(value) {
    let error
    if (value.length < 8) {
        error = 'Password should be at least 8 characters long.'
    }
    return error
}

export default function SignUp() {
    const form = useRef()
    return(
        <Formik
            initialValues={{
                email: '',
                pw: '',
            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500))
                signInWithEmailAndPassword(auth, email, password)
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
                    });
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
    )
}