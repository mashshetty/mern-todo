# mern-todo

import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import FileBase64 from "react-file-base64";

function App() {
  const [data, setdata] = useState({ username: "", email: "", password: "" });
  const [alldata, setalldata] = useState([]);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [image, setimage] = useState("");
  const [updateid, setupdateid] = useState("");
  const [password, setpassword] = useState("");
  const [fill, setfill] = useState("");
  const [fdd, setfdd] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5001/user").then((response) => {
      setalldata(response.data);
    });

    console.log(alldata);
  }, [updateid]);

  const del = async (id) => {
    console.log(id);

    try {
      const deldata = await axios.delete(`http://localhost:5001/${id}`);
      const newdata = alldata.filter((item) => item._id !== id);
      setalldata(newdata);
    } catch (err) {
      console.log(err);
    }
  };

  const sub = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    await setdata({ username, email, password });
    console.log(data);

    if (updateid === "") {
      const res = await axios.post("http://localhost:5001/enter", {
        username: username,
        email: email,
        password: password,
        image: image,
      });

      setalldata((prev) => [...prev, res.data]);
      console.log("digga");
      console.log(image);

      setemail("");
      setusername("");
      setpassword("");
      // setimage(" ");
    } else {
      try {
        const up = await axios.put(`http://localhost:5001/${updateid}`, {
          username: username,
          email: email,
          password: password,
          image: image,
        });

        setemail("");
        setusername("");
        setpassword("");
        // setimage(" ");

        // await setalldata(prev =>[...prev, up.data]);

        console.log("mmm");

        console.log(up.data);

        await setupdateid("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fil = async (e) => {
    console.log(fill);
    // e.preventDefault();

    await setfill(e.target.value);
    console.log(fill);

    await axios.get(`http://localhost:5001/filter/${fill}`).then((response) => {
      setalldata(response.data);
    });
  };

  const setup = (id) => {
    const dd = alldata.filter((item) => item._id === id);

    setemail(dd[0].email);
    setpassword(dd[0].password);
    setusername(dd[0].username);
    setimage(dd[0].image);
    console.log(dd[0].email);
  };

  const up = async (id) => {
    window.scrollTo(0, 0);
    setupdateid(id);
    setup(id);

    // try{
    //   const up = await axios.put(`http://localhost:5001/${id}`, {username:username,
    //   email:email,
    //   password:password})

    // }catch(err){
    //   console.log(err);
    // }
  };

  return (
    <div className="App">
      <div className="App">
        {/* onChange={(e)=>{setfill(e.target.value)}} */}

        <form
          className="fs"
          action=""
          onSubmit={(e) => {
            fil(e);
          }}
        >
          <input
            className="in"
            type="text"
            onChange={(e) => {
              fil(e);
            }}
            placeholder="enter name to search"
          />
          <br />
          {/* <input className="sub nv" value="search" type="submit" /> */}
        </form>

        <form
          className="kop"
          method="POST"
          onSubmit={(e) => {
            sub(e);
          }}
        >
          <input
            className="in"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            placeholder="enter the username"
          />
          <br />
          <input
            className="in"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            type="text"
            placeholder="enter the email"
          />
          <br />
          <input
            className="in"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="text"
            placeholder="enter the password"
          />
          <br />
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setimage(base64)}
          />{" "}
          <br />
          <input className="sub" type="submit" value="submit" />
        </form>

        <div className="ss">
          {alldata.map((user) => {
            return (
              <div key={user._id} className="ii">
                <img src={user.image} alt="mash" />
                <p>UserName: {user.username}</p>
                <p>password: {user.password}</p>
                <p>email : {user.email}</p>

                <p>
                  <span
                    onClick={() => {
                      del(user._id);
                    }}
                  >
                    delete
                  </span>
                  <span
                    onClick={() => {
                      up(user._id);
                    }}
                  >
                    edit
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
