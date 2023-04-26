import React from "react";

export default function Greeting(props) {
  if (props.name) {
    return <p>Welcome, {props.name}!</p>;
  } else {
    return <span>Hi, guest</span>;
  }
}