import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { exeFetch } from "../../modules"
import "./style.scss"

export default function contacts() {

    const name = useRef(null)
    const email = useRef(null)
    const mobile = useRef(null)

    const [contacts,setContacts]=useState([])


    const appendContact=({name,email,phone_no})=>{
        let _contacts=contacts.slice()
        _contacts.push({
            name,
            email,
            phone_no
        })
        setContacts(_contacts)
    }


    const AddContacts = (e) => {
        e.preventDefault();
        exeFetch("/api/contacts", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.current.value,
                name: name.current.value,
                phone_no: mobile.current.value,
            }),
        }, () => navigate("/"))
            .then(({ body }) => {
                appendContact(body.data)
            })
            .catch(e => alert("Error\n" + JSON.stringify(e)))
    }

    const GetAllContacts = () => {
        exeFetch("/api/contacts", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        }, () => navigate("/"))
            .then(({ body }) => {
                setContacts(body.data)
            })
            .catch(e => alert("Error\n" + JSON.stringify(e)))
    }

    useEffect(() => {
        GetAllContacts()
    }, [])
    

    return (
        <div className='contacts container'>
            <div className='add_contact'>
                <form onSubmit={AddContacts}>
                    <fieldset>
                        <legend>Add contacts</legend>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td><input type="text" ref={name} /></td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td><input type="email" ref={email} /></td>
                                </tr>
                                <tr>
                                    <th>Mobile Number</th>
                                    <td><input type="number" ref={mobile} /></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <input type={"submit"} value="Add" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </fieldset>
                </form>
            </div>
            <div className='added_contacts'>
                <fieldset>
                    <legend>Added contacts</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                            </tr>                            
                        </thead>
                        <tbody>
                            {
                                contacts.map(({name,email,phone_no})=>{
                                    return <tr>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{phone_no}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </fieldset>
            </div>
        </div>
    )
}
