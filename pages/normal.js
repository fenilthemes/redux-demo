import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

const Normal = () => {
    const router = useRouter()

    const defaultData = [
        {
            id: "1",
            firstName: "fenil",
            lastName: "gajjar",
            email: "fenil@gmail.com",
        },
        {
            id: "2",
            firstName: "dhaval",
            lastName: "gajjar",
            email: "dhaval@gmail.com",
        },
        {
            id: "3",
            firstName: "rajiv",
            lastName: "gajjar",
            email: "rajiv@gmail.com",
        },
    ];

    // Initialize state with default data
    const [data, setData] = useState(defaultData);

    useEffect(() => {
        // Check if localStorage is available before trying to access it
        if (typeof window !== 'undefined') {
            const storedData = localStorage.getItem('employees');
            if (storedData) {
                setData(JSON.parse(storedData));
            }
        }
    }, []);

    const handleAddData = () => {
        router.push('/addData');
    }

    const handleEditData = (emp) => {
        router.push({
          pathname: "/edit",
          query: { data: emp.id },
        });
      };

    const handleDelete = (emp) => {
        const updatedData = data.filter(item => item.id !== emp.id);
        setData(updatedData);
        // Update localStorage after deleting an employee
        if (typeof window !== 'undefined') {
            localStorage.setItem('employees', JSON.stringify(updatedData));
        }
    }

    return (
        <div>
            <button onClick={handleAddData}>Add Data</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((emp) => {
                            return (
                                <tr key={emp.id}>
                                    <td>{emp.firstName}</td>
                                    <td>{emp.lastName}</td>
                                    <td>{emp.email}</td>
                                    <td>
                                        <button
                                            className="btn"
                                            onClick={() => handleEditData(emp)}
                                        >
                                            edit
                                        </button>
                                        <button className="btn" onClick={() => handleDelete(emp)}>
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default Normal;
