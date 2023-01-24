import React, {useRef} from 'react';
import {firestore} from './firebase';
import {addDoc, collection } from "@firebase/firestore"

export function App(){
	const messageRef=useRef();
	const ref=collection(firestore,"messages")


	const handleSave= async (e) => {
		e.preventDefault();
		console.log(messageRef.current.value);		
	

		let data={
			messages:messageRef.current.value,
		}

		try {
			addDoc(ref,data);
		} catch (error) {
			console.log(error)
		}

	} 

	return(
		<div>
			<h1>Testing date: { new Date().toString()  }</h1>
			<form onSubmit={handleSave}>
				<label>Enter messsage</label>
				<input type="text" ref={messageRef}/>
				<button type="submit">Save</button>

			</form>
		</div>
	);
}
