import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./Details.scss";
interface Iposts {
    body: string;
    id: number;
    title: string;
    userId: number
}

const Details = () => {
    const navigate = useNavigate()
    const params = useParams()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Iposts>()

    const getUserAction = () => {
        setLoading(true)
        fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setData(json)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                navigate("/")
                setLoading(false)
            })
    }

    useEffect(() => {
        if (params?.id) {
            getUserAction()
        }
        // eslint-disable-next-line
    }, [params?.id])



    return (
        <div className='container w-100'>
            <button className='btn btn-primary mr-100 mt-5' onClick={() => navigate("/")}>Back</button>
            <h1 className='mt-2 text-uppercase'>{data?.title}</h1>
            {
                loading ? <span>Loading...</span> :
                    <table className='table mt-5'>
                        <tbody>
                            <tr>
                                <th className='table-head'>ID</th>
                                <td>{data?.id}</td>
                            </tr>
                            <tr>
                                <th className='table-head'>Title</th>
                                <td>{data?.title}</td>
                            </tr>
                            <tr>
                                <th className='table-head'>Message</th>
                                <td>{data?.body}</td>
                            </tr>
                            <tr>
                                <th className='table-head'>User Id</th>
                                <td>{data?.userId}</td>
                            </tr>
                        </tbody>
                    </table>
            }

        </div>
    )
}

export default Details