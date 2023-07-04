import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Table = () => {
    const [pendingStatus, setPendingStatus] = useState([]);
    const [loader, setLoader] = useState(true)

    const headers = {
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjQ2MDI2MDIsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.cJR4aISn0MMed1zPQqPxkMsZTn0_9N0W9n1D5mCzLMw",
        "Content-Type": "application/json",
    };

    const url1Data = {
        filters: {
            consigner: [
                "SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
                "SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
                "SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
                "SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD",
                "SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
                "SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.",
                "SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
                "SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
                "SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
                "SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
                "SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD",
                "SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
                "SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD",
                "SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD",
                "SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.",
                "SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD",
                "SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD",
                "SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.",
                "SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD",
            ],
            orderDate: {
                from: 1677500670000,
            },
        },
        limit: 5000,
    };

    const url2Data = {
        filters: {
            shipmentStatus: ["Planned", "Created"],
            customer: ["SIEMENS HEALTHCARE PRIVATE LIMITED"],
            shipmentDate: {
                from: 1677500670000,
            },
        },
    };

    const url1 =
        "https://apis.fretron.com/automate/autoapi/run/255ab0db-70ed-4933-a0cc-b30b67b70955";
    const url2 =
        "https://apis.fretron.com/automate/autoapi/run/67953f4a-fb2d-4548-a86f-7b4ce2d710d2";

    function fetching() {
        const promise1 = axios.post(url1, url1Data, headers);
        const promise2 = axios.post(url2, url2Data, headers);

        Promise.all([promise1, promise2]).then((message) => {
            let pendingResponse = [];
            for (let i = 0; i < message[0].data.data.length; i++) {
                if (message[0].data.data[i].secondaryStatus === "CREATED") {
                    pendingResponse.push(message[0].data.data[i]);
                }
            }
            setPendingStatus(pendingResponse);
            setLoader(false)
        });
    }
    console.log(pendingStatus)


    useEffect(() => {
        fetching();
    }, []);

    return (
        <table className="main-table">
            <thead>
                <tr >
                    <th className="table-th">unqiue ID </th>
                    <th className="table-th">Consignor</th>
                    <th className="table-th">Consignee</th>
                    <th className="table-th">material</th>
                    <th className="table-th">Vehicle Type </th>
                    <th className="table-th">expected Pickup Date </th>
                    <th className="table-th">Order By </th>
                    <th className="table-th">Order Days </th>
                    <th className="table-th">SHPL instructions </th>
                    <th className="table-th">Apml Remarks </th>
                    <th className="table-th">expected DELIVERY Date </th>
                    <th className="table-th">Order Number</th>
                </tr>
            </thead>

            <tbody>
                {
                    pendingStatus.map((res) => {
                        return (

                            <tr>
                                <td>{res.orderNumber}</td>
                                <td style={{ whiteSpace: "nowrap" }}>{res.lineItems[0].consigner.name.split("-")[1]}</td>
                                <td style={{ whiteSpace: "nowrap" }}>{res.lineItems[0].consignee.name}</td>
                                <td style={{ whiteSpace: "nowrap" }}>
                                    {
                                        res.customFields.filter((res) => res.fieldKey === 'MATERIAL').map((res) => {
                                            return (
                                                <>
                                                    {res.value}
                                                </>
                                            )
                                        })
                                    }
                                </td>
                                <td style={{ whiteSpace: "nowrap" }}>  {
                                    res.customFields.filter((res) => res.fieldKey === 'Vehicle-type').map((res) => {
                                        return (
                                            <>
                                                {res.value}
                                            </>
                                        )
                                    })
                                }</td>
                                <td style={{ whiteSpace: "nowrap" }}>
                                    {
                                        res.customFields.filter((res) => res.fieldKey === 'expected pickup date and time').map((res) => {
                                            return (
                                                <>
                                                    {res.value}
                                                </>
                                            )
                                        })
                                    }
                                </td>
                                <td style={{ whiteSpace: "nowrap" }}> {
                                    res.customFields.filter((res) => res.fieldKey === 'Order By').map((res) => {
                                        return (
                                            <>
                                                {res.value}
                                            </>
                                        )
                                    })
                                }</td>
                                <td style={{ whiteSpace: "nowrap" }}>dfd</td>
                                <td style={{ whiteSpace: "nowrap" }}> {
                                    res.customFields.filter((res) => res.fieldKey === 'SHPL instructions').map((res) => {
                                        return (
                                            <>
                                                {res.value}
                                            </>
                                        )
                                    })
                                }</td>
                                <td style={{ whiteSpace: "nowrap" }}> {
                                    res.customFields.filter((res) => res.fieldKey === 'APML Remarks').map((res) => {
                                        return (
                                            <>
                                                {res.value ? res.value : "no remark"}
                                            </>
                                        )
                                    })
                                }</td>
                                <td style={{ whiteSpace: "nowrap" }}> {
                                    res.customFields.filter((res) => res.fieldKey === 'EXPECTED TARGET DATE:').map((res) => {
                                        return (
                                            <>
                                                {res.value ? res.value : "no remark"}
                                            </>
                                        )
                                    })
                                }</td>
                                <td style={{ whiteSpace: "nowrap" }}>dfd</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table