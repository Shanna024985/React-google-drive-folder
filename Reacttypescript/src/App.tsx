import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { Input } from "./components/ui/input";
import { LoginForm } from "./components/login-form";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import MainPage from "./components/ui/mainPage";
import { Testing } from "./components/ui/testing";
import { useState, useEffect } from "react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<MainPage />}></Route>
        <Route path="/testing" element={<Testing />}></Route>
      </Routes>
    </>
  );
}

export default App;

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5174/api/testing")
      .then((res) => {
        
        return res.json()
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
  }, []);
  return (
    <>
      <div className="ml-5 block">
        <Toaster></Toaster>
        <Button
          onClick={() =>
            toast("Hello!", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Click me!
        </Button>
        <Input
          type="password"
          className="bg-gray-500 text-gray-50 placeholder:text-gray-50"
          placeholder="Password"
        />
      </div>
      <Link to="/login">Login</Link>
      {data.map((value: string) => {
        return <h2>{value}</h2>;
      })}
    </>
  );
}
