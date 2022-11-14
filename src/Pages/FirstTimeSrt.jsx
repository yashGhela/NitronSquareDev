import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function FirstTimeSrt() {
    let location = useLocation();
    console.log(location.state.user);

    const [newSubject, setNewSubject] = useState();
    const[subjectError, setSubjectError] = useState(null);
  return (
    <div>
        <h1>Lets Add Some Subjects!</h1>
        <input type="text" placeholder='Accounting' />
        <button >Add!</button>
    </div>
  )
}

export default FirstTimeSrt