import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useDebounce from '../util/hooks/useDebounce';
import "./Home.scss";
interface Iposts {
    body: string;
    id: number;
    title: string;
    userId: number
}

const Home = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [mainState, setMainState] = useState<Iposts[]>([])
    const [subState, setSubState] = useState<Iposts[]>([])
    const [data, setData] = useState<Iposts[]>([])
    const [sort, setSort] = useState(true)
    const [pagination, setPagination] = useState<
    {
        page: number,
        limit: number,
        search: null | string,
        totalCount: number,
        totalPage: number
    }
    >({
        page: 1,
        limit: 10,
        search: null,
        totalCount: 0,
        totalPage: 0
    })

    const getUserAction = () => {
        setLoading(true)
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((json) => {
                setMainState(json)
                setSubState(json)
                setPagination({ ...pagination, totalCount: json.length, totalPage: Math.ceil(json.length / pagination.limit) })
                setData(json.slice(0, pagination.limit))
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }

    useEffect(() => {
        getUserAction() // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (mainState.length !== 0) {
            let newArray = [...subState]
            setData(newArray.splice((pagination.page * 10) - 10, pagination.limit))
        } // eslint-disable-next-line
    }, [pagination.limit, pagination.page, subState])

    // data per page
    const handleLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPagination({ ...pagination, limit: Number(e.target.value), page: 1 })
    }

    // page 
    const handlePage = (no: number) => {
        setPagination({ ...pagination, page: no })
    }

    // array sorting
    const handleSorting = (columName: string) => {
        let tempArray = [...mainState]
        if(columName !== "id"){
            sort ? tempArray.sort((a, b) => b.title.localeCompare(a.title)) : tempArray.sort((a, b) => a.title.localeCompare(b.title))
        }else{
        tempArray.sort((a, b) => {
            if (sort) {
                //@ts-ignore
                return b[columName] - a[columName]
            }
            //@ts-ignore
            return a[columName] - b[columName]
        })
    }
    setSubState(tempArray)
    setSort(!sort)
    }


    // array searching
    const handleSearch = () => {
        if(pagination.search === null) {return};

        let newArray: any[] = []
        mainState.forEach(item => {
            if (item.title.includes(pagination.search as string)) {
                newArray.push(item)
            }
        })
        setSubState(newArray);
    }

    useDebounce(handleSearch, 1000, pagination.search as string)

    const handleRedireact  = (id:string) => {
        navigate(`user/${id}`)
    }

    return (
        <div className='container w-100'>
            <h1 className='mt-5'>My First Demo</h1>
            <input className='form-control mt-5 mb-4' placeholder='Search...' onChange={(e) => setPagination({...pagination, search: e.target.value})} />
            {
                loading ? <span>Loading...</span> :
                    <>
                        <div className="col-12 table-responsive" style={{ maxHeight: "550px" }}>
                            <table className='table table-striped  overflow-auto' style={{ maxHeight: 500 }} >
                                <thead className='position-sticky text-white bg-dark'>
                                    <tr>
                                        <th scope="col" style={{width: 80}} onClick={() => handleSorting("id")}>Id <i className="fa fa-fw fa-sort"></i></th>
                                        <th scope="col" onClick={() => handleSorting("title")}>Title <i className="fa fa-fw fa-sort"></i></th>
                                        <th scope="col" onClick={() => handleSorting("body")}>Message <i className="fa fa-fw fa-sort"></i></th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='overflow-auto' style={{ maxHeight: 500 }}>    
                                    {data.length > 0 ?
                                        data.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item?.id}</td>
                                                <td>{item?.title}</td>
                                                <td>{item?.body}</td>
                                                <td><i className="fa fa-fw fa-eye text-primary" style={{cursor: "pointer"}} onClick={() => handleRedireact(String(item?.id))}></i></td>
                                            </tr>
                                        )) : <tr><td>Data not found </td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </>
            }
            <div className='d-flex justify-content-between flex-wrap flex-lg-nowrap gap-5 mt-4'>
                <div>
                    <select className="form-select"  aria-label="Default select example" value={pagination.limit} onChange={(e) => handleLimit(e)}>
                        <option value={5} >5</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div className='d-flex flex-wrap flex-lg-nowrap gap-2'>
                    <button className='btn btn-secondary' onClick={() => handlePage(1)} disabled={pagination.page === 1}>First Page</button>
                    <button className='btn btn-secondary my' onClick={() => handlePage(pagination.page - 1)} disabled={pagination.page === 1}>Previous Page</button>
                    {
                        new Array(pagination.totalCount / pagination.limit).fill(0).map((item, i) => {
                            return <button onClick={() => handlePage(i+1)} className={`active-btn mx-1 btn ${i + 1  ===pagination.page ? "btn-primary":"btn-secondary" }`}>{i+1}</button>
                        })
                    }
                    <button className='btn btn-secondary my' onClick={() => handlePage(pagination.page + 1)} disabled={pagination.totalPage === pagination.page}>Next Page</button>
                    <button className='btn btn-secondary' onClick={() => handlePage(10)} disabled={pagination.totalPage === pagination.page}>Last Page</button>
                </div>
            </div>
        </div>
    )
}

export default Home