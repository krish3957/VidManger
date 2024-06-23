import './App.css'
import { Navbar } from './components/navbar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import ManagerList from './pages/managerList'
import OwnerList from './pages/ownerList'
import DraftList from './pages/draftsList'
import { useAppSelector } from './hooks/useStore'
import { ChannelDrafts } from './pages/ownerDrafts'
import Draft from './pages/draft'
import { Home } from './pages/Home/index'
import OwnerProfile from './pages/profile'
import ManagerProfile from './pages/manangerProfile'

function App() {
  const user = useAppSelector(state => state.user);

  return (
    <div>
      <Router>
        <Navbar />
        {
          (user.type === "Owner" && user.expiration && new Date(user.expiration) < new Date()) && (
            <div className='bg-red-500 p-2'>
              <h1 className='font-bold text-white text-2xl'>
                Your session has expired. Please Login again.
              </h1>
            </div>
          )
        }
        <Routes>
          <Route path='/managers' element={user.type === "Owner" ? <ManagerList /> :
            <div className='w-full h-[90vh] flex justify-center flex-col items-center'>
              <h1 className='font-extrabold text-6xl'>
                Not Authorized to view this page
              </h1>
              <h2 className="font-thin text-3xl">
                Please login as a owner to hire managers for your channel
              </h2>
            </div>}
          />

          <Route path='/channels' element={user.type === "MAnager" ? <OwnerList /> :
            <div className='w-full h-[90vh] flex justify-center flex-col items-center'>
              <h1 className='font-extrabold text-6xl'>
                Not Authorized to view this page
              </h1>
              <h2 className="font-thin text-3xl">
                Please login as a manager to view channels you can manage
              </h2>
            </div>} />

          <Route path='/channel/drafts/:channelId' element={<DraftList />} />
          <Route path='/owner/drafts' element={<ChannelDrafts />} />
          <Route path='/draft/:draftId' element={<Draft />} />
          <Route path='/' element={<Home />} />
          <Route path='/youtuber/profile' element={<OwnerProfile />} />
          <Route path='/moderator/profile' element={<ManagerProfile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
