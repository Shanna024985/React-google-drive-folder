import { Progress } from "@/components/ui/progress";
import { Button } from "./button";
import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import logo from "../../assets/Line.svg";
import googleDrive from "../../assets/googleDrive.svg";

import { Label } from "./label";
import { createContext } from "react";
import { CompletionScreen } from "./completionScreen";
export const updateProgressContext = createContext<Function | undefined>(
  undefined
);
const MainPage = () => {
  let [progress, setProgress] = useState<number>(0);
  let [classForCompletionScreen, setClassForCompletionScreen] = useState<string>("hidden")
  useEffect(() => {
    setProgress(50);
    let url = new URL(document.URL);
    let searchParams = url.searchParams;
    let userId = searchParams.get("code");
    console.log(userId)
    fetch("http://localhost:5174/api/auth/"+userId)
    .then((value)=>{
      return value.json()
    })
    .then((value)=>[
      localStorage.setItem("token",value)
    ])
  }, []);


  return (
    <div className="w-screen px-5 self-start mt-4">
      <Progress value={progress} />
      <updateProgressContext.Provider value={setProgress}>
        <StepOneOfAddingFolders setClassNameOfCompletionScren={setClassForCompletionScreen}/>
      </updateProgressContext.Provider>
      <CompletionScreen className={classForCompletionScreen}/>
    </div>
  );
};

export default MainPage;

function StepOneOfAddingFolders(props: {setClassNameOfCompletionScren: Function}) {
  const setProgressFunction = useContext(updateProgressContext);
  let [classNameOfDiv, setClassNameOfDiv] = useState("")
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
          />
          <button
            className="text-center text-gray-50 mt-3"
            onClick={() => {
              if (typeof setProgressFunction === "function") {
                setClassNameOfDiv("hidden")
                props.setClassNameOfCompletionScren("")
                setProgressFunction(100);
              }
            }}
          >
            Load file
          </button>
        </div>
      </div>
    </div>
  );
}
