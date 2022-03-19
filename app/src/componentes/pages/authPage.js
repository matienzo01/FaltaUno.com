import React from 'react'
import { useSelector } from 'react-redux'

export default function AuthPage() {

    const authStatus = useSelector(state => state.auth)
    console.log(authStatus);

    return (
        <div>authPage{ }</div>

    )
}
