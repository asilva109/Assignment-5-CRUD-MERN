

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  });
  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get("http://localhost:8000/api/v1/users");
      setUsers(res.data);
    };
    getAllData();
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/v1/users", input);
    setRender(true);
    setInput({
      name: "",
      email: "",
      age: "",
    });
  };

  const handelDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/v1/users/${id}`);
    const newUsers = users.filter((item) => {
      return item._id !== id;
    });
    setUsers(newUsers);
  };
  return (
    <>
    
      <div className="container bg-grey"  >
        <div className="row">
          <div className="col-md-12 ">
            <div style={{ backgroundColor: "darkgreen" }}>
              <h1 className="text-white text-center mt-2">COLLEGE TOUR LIST</h1>
            </div>
            <p style={{ color: "green", fontSize: "1rem", textAlign: "center", borderBottom: "2px solid green", marginBottom: "1.8rem", marginTop: "1.3rem" }}>The following is a list of students who have expressed their interest in joining the tour. If interested, please provide your name and contact details below and we will get in touch with you shortly. If you need to make any changes to your details, or if you decide to withdraw your name, please feel free to edit or delete your submission accordingly.</p>

          </div>
          <div className="col-md-5">
          <div style={{ textAlign: 'center', backgroundColor: "lightgreen" }}>
    <h2 style={{ color: 'black', fontSize: '1.5rem', marginBottom: "1.8rem" }}>FILL IN YOUR DETAILS BELOW </h2>
  </div>
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Full Name
                </label>
                <input
                  name="name"
                  value={input.name}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Email ID
                </label>
                <input
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  type="email"
                  class="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Phone Number 
                </label>
                <input
                  value={input.age}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  name="age"
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>

              <div class="d-flex justify-content-center mb-5">
  <button type="submit" class="btn btn-warning">ADD TO THE LIST</button>
</div>
            </form>

            
          </div>
          <div className="col-md-7">
          <div style={{ textAlign: 'center' }}>
    <h2 style={{ color: 'black', fontSize: '1.5rem', marginBottom: "1.8rem", backgroundColor: "lightgreen" }}>LIST OF STUDENTS </h2>
  </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email ID </th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">EDIT</th>
                  <th scope="col">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => {
                    return (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>
                          <Link to={`/edit/${user._id}`}>
                            <button className="btn btn-warning">EDIT</button>
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => handelDelete(user._id)}
                            className="btn btn-dark"
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
