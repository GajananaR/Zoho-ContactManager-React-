import React, { useRef } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { exeFetch } from "../../modules"
import "./style.scss"

export default function signup() {
    let navigate = useNavigate()

    let email = useRef(null)
    let password = useRef(null)
    let name = useRef(null)
    let description = useRef(null)

    const createNewUser = (e) => {
        e.preventDefault();
        const newUserData = {
            email: email.current.value,
            password: password.current.value,
            name: name.current.value,
            description: description.current.value,
        }

        exeFetch("/api/sign_up", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserData),
        })
            .then(({ body }) => {
                navigate("/user_profile", {
                    state: body.data,
                })
            })
            .catch(e => alert("Error\n" + JSON.stringify(e)))
    }

    useEffect(() => {
        console.log("-----------sign up----------")

    }, [])


    return (
        <div className="sign_up">
            <center>
                <h1>Signup</h1>
            </center>
            <br />

            <form onSubmit={createNewUser}>
                <fieldset>
                    <legend>Sign Up</legend>
                    <table>
                        <tbody>

                            <tr>
                                <td>Email</td>
                                <td>
                                    <input type="email" ref={email} />
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input type="password" ref={password} />
                                </td>
                            </tr>
                            <tr>
                                <td>Secrete</td>
                                <td>
                                    <input type="text" ref={name} />
                                </td>
                            </tr>
  {/*                          <tr>
                                <td>Detail</td>
                                <td>
                                    <textarea
                                        className="ver_resizable"
                                        ref={description}
                                    ></textarea>
                                </td>
                            </tr> */}
                            <tr>
                                <td colSpan={2}>
                                    <input
                                        type="submit"
                                        value="submit"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </form>

            <label>
                Already have account? <Link to="/">Login</Link>
            </label>
        </div>
    )
}
