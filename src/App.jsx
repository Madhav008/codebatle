import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateRoomPage from "./Pages/CreateRoomPage"
import JoinRoomPage from "./Pages/JoinRoomPage"
import RoomPage from "./Pages/RoomPage"
import Welcome from "./Pages/Welcome"

import Jobs from "./Pages/Jobs"
import LoginPage from "./Pages/LoginPage"
import { useSelector } from "react-redux"
import { LOGINSTATUS } from "./store/userSlice"
function App() {
    const { loginStatus } = useSelector((state) => state.user)

    // const { socket } = useSelector((state) => state.roomdata)
    return (
        <div className="App">

            <Router>
                <Routes>
                    <Route path="/" element={loginStatus === LOGINSTATUS.LOGEDIN ? <Welcome /> : <LoginPage />} />
                    <Route path="/rooms" element={<JoinRoomPage />} />
                    <Route path="/batle" element={<RoomPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                    <Route path="/jobs" element={<Jobs />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App