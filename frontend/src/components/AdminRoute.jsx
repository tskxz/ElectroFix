import {Outlet, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const AdminRoute = () => {
	const {utilizadorInfo} = useSelector(state=>state.auth)
	return utilizadorInfo && utilizadorInfo.isAdmin ? <Outlet/> : <Navigate to='/login' replace/>
}

export default AdminRoute