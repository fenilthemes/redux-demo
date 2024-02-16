import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "@/store/dataSlice";

const Home = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch()
  // Use useSelector to get data from Redux store
  const data = useSelector((state) => state.data);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = (emp) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      dispatch(deleteData({ id: emp.id }));

      }
  };

  const handleAddData = () => {
    router.push("/add");
  };

  const handleEditData = (emp) => {
    router.push({
      pathname: "/edit",
      query: { data: emp.id },
    });
  };

  return (
    <div>
      <button onClick={handleAddData}>Add Data</button>
      {isMounted && (
        <table className="table">
          <thead>
            <tr>
              {/* <th scope="col">id</th> */}
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((emp) => (
                <tr key={emp.id}>
                  {/* <th scope="row">{emp.id}</th> */}
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
                    <button
                      className="btn"
                      onClick={() => handleDelete(emp)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
