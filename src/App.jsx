import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateRoomPage from "./Pages/CreateRoomPage"
import JoinRoomPage from "./Pages/JoinRoomPage"
import RoomPage from "./Pages/RoomPage"
import Welcome from "./Pages/Welcome"

import Jobs from "./Pages/Jobs"
import LoginPage from "./Pages/LoginPage"
import { useSelector } from "react-redux"
import { LOGINSTATUS } from "./store/userSlice"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics,logEvent } from "firebase/analytics";
import ResizableRoomPage from "./Components/ResizableRoomPage"
import { ROOMSTATUS } from "./store/dataSlice"
import Takeaway from "./Pages/Takeaway"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function App() {

    const firebaseConfig = {
        apiKey: "AIzaSyBVCM4QrVQDSWqpWORptFVv4yIVai6Kqqw",
        authDomain: "briklin-2e342.firebaseapp.com",
        projectId: "briklin-2e342",
        storageBucket: "briklin-2e342.appspot.com",
        messagingSenderId: "440810007685",
        appId: "1:440810007685:web:831405cce83855ad790dec",
        measurementId: "G-40QSQX6WL5"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    logEvent(analytics, 'homepage_visited');
      const { loginStatus } = useSelector((state) => state.user)
    
    const { roomStatus } = useSelector((state) => state.roomdata)
    return (
        <div className="App">

            <Router>
                <Routes>
                    <Route path="/" element={loginStatus === LOGINSTATUS.LOGEDIN ? <Welcome /> : <LoginPage />} />
                    <Route path="/rooms" element={ roomStatus===ROOMSTATUS.IN_ROOM?<ResizableRoomPage />:<JoinRoomPage />} />
                    <Route path="/batle" element={<RoomPage />} />
                    <Route path="/create" element={roomStatus===ROOMSTATUS.IN_ROOM?<ResizableRoomPage />:<CreateRoomPage />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/takeawayy" element={<Takeaway />} />

                    <Route path="/roompage" element={roomStatus===ROOMSTATUS.IN_ROOM?<ResizableRoomPage />:<Welcome/>} />
                    
                </Routes>
            </Router>
        </div>
    )
}

export default App
