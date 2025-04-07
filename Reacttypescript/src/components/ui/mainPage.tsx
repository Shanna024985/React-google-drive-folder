import { Progress } from "@/components/ui/progress";
import { Button } from "./button";
import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "./input";
import logo from "../../assets/Line.svg";
import googleDrive from "../../assets/googleDrive.svg";
import { Label } from "./label";
import { createContext } from "react";
import { CompletionScreen } from "./completionScreen";
import { LoadingSpinner } from "./loaderSpinner";
export const updateProgressContext = createContext<Function | undefined>(
  undefined
);
const MainPage = () => {
  let [progress, setProgress] = useState<number>(0);
  let [classForCompletionScreen, setClassForCompletionScreen] = 
    useState<string>("hidden");
  let [urlForRedirect, setUrlForRedirect] = useState<string>("")
  useEffect(() => {
    setProgress(50);

    let token = localStorage.getItem("token");
    let refresh_token = localStorage.getItem("refresh-token")
    if (
      token && refresh_token
    ) {
      document.getElementById("loggedIn")?.classList.remove("hidden");
      document.getElementById("notloggedin")?.classList.add("hidden")
    } else {
      let url = new URL(document.URL);
      let searchParams = url.searchParams;
      let userId = searchParams.get("code");
      console.log(userId);
      document.getElementById("loggedIn")?.classList.add("hidden");
      document.getElementById("notloggedin")?.classList.remove("hidden")
      fetch("http://localhost:5174/api/auth/" + userId)
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        if (value.access_token && value.refresh_token) {
          localStorage.setItem("token", value.access_token);
          localStorage.setItem("refresh-token", value.refresh_token);
          document.getElementById("loggedIn")?.classList.remove("hidden");
          document.getElementById("notloggedin")?.classList.add("hidden")
        }
      })
    }
  }, []);

  return (
    <div className="w-screen px-5 self-start mt-4">
      <div id="loggedIn" className="hidden">
        <Progress value={progress} />
        <updateProgressContext.Provider value={setProgress}>
          <StepOneOfAddingFolders
            setClassNameOfCompletionScren={setClassForCompletionScreen}
            setUrlForRedirect={setUrlForRedirect}
          />
        </updateProgressContext.Provider>
        <CompletionScreen className={classForCompletionScreen} urlForRedirect={urlForRedirect}/>
      </div>
      <div id="notloggedin" className="flex flex-col justify-center">
        <h1 className="text-center">403</h1>
        <h5 className="text-center">Forbidden: You don't have permission to access this page</h5>
      </div>
    </div>
  );
};

export default MainPage;


function StepOneOfAddingFolders(props: {
  setClassNameOfCompletionScren: Function,
  setUrlForRedirect: Function
}) {
  const setProgressFunction = useContext(updateProgressContext);
  let [classNameOfDiv, setClassNameOfDiv] = useState("");
  let input: null | any = useRef(null)
  let [classNameOfLoadingSpinner, setClassNameOfLoadingSpinner] = useState("hidden");
  let [classNameOfButtonTitle, setClassNameOfButtonTitle] = useState("")
  return (
    <div className={classNameOfDiv}>
      <h3 className="text-3xl mt-4 lg:mx-10">Step 1</h3>
      <h1 className="font-bold mt-2 lg:mx-10">
        Choose your folder location you would like to transfer the files into
      </h1>
      <div className="flex bg-gray-600 p-5 rounded-xl mt-10 mx-10 lg:mx-20">
        <div className="flex-1 flex justify-items-center place-content-center">
          <Button className="self-center w-70 h-15 whitespace-normal text-left">
            <img src={googleDrive} alt="googleDrive" />
            <p className="w-50 flex break-words h-12 ml-2 font-semibold">
              Choose a folder from google drive
            </p>
          </Button>
        </div>
        <div className="flex mx-10 flex-col w-1.5">
          <img src={logo} alt="line" />
          <div className="text-gray-50 text-4xl p-5 -ml-9">Or</div>
          <img src={logo} alt="line" />
        </div>
        <div className="flex-1 flex justify-center flex-col p-5">
          <Label htmlFor="urlInput">
            <h2 className="text-3xl text-gray-50 font-semibold mb-4">
              Copy folder url from google drive and paste it here:
            </h2>
          </Label>
          <Input
            id="urlInput"
            type="text"
            placeholder="Enter url"
            className="placeholder:text-gray-100 text-gray-50 bg-gray-500 border-0"
            ref={input}
          />
          <button
            className="text-center text-gray-50 mt-3 flex-col"
            onClick={() => {
              if (typeof setProgressFunction === "function") {
                setClassNameOfLoadingSpinner("");
                setClassNameOfButtonTitle("hidden")
                let  bodyData = JSON.stringify({refresh_token: localStorage.getItem("refresh-token"),url:input.current.value})
                console.log(bodyData)
                let fetchData = {
                  method: 'POST',
                  body: bodyData,  
                  headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8'
                  })
                }
                fetch("http://localhost:5174/api/drive",fetchData)
                .then((value)=>{
                  if (value.status === 400){
                    console.error("Error 400")
                  } else {
                    return value.json();
                  }
                })
                .then(()=>{
                  setClassNameOfDiv("hidden");
                  props.setClassNameOfCompletionScren("");
                  setProgressFunction(100);
                  console.log(input.current.value)
                  props.setUrlForRedirect(input.current.value)
                })
              }
            }}
          >

            <div className="flex justify-center">
              <div className={classNameOfButtonTitle}>
              Load file
              </div>
            <LoadingSpinner className={classNameOfLoadingSpinner}/>

            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
