import React, { useState } from 'react'

const PopUp = () => {
    const [inputs, setInputs] = useState([])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInputs((values) => ({ ...values, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <>
        <table>
            <tr>
                <th>
                    table
                </th>
            </tr>
            <tr>
                <td>
                <button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <input type="text" />
            </button>

            <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">

                        <form onSubmit={handleSubmit}>
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Vehicle Number</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <input placeholder='vehicle number' id='vehiclenumber' name='vehiclenumber' onChange={handleChange} required />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
                </td>
            </tr>
        </table>
           
        </>
    )
}

export default PopUp