import React from 'react'

export function fn1() {
    return "fn1"
}

export function fn2() {
    return "fn2"
}

export function fn3() {
    return Math.random()
}

export function fn4(from) {
    return <p>{`this is the fn4 from ${from}`}</p>
}