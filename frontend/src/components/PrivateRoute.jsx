import {Outlet, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const PrivateRoute = () => {
	const {utilizadorInfo} = useSelector(state=>state.auth)
	return utilizadorInfo ? <Outlet/> : <Navigate to='/login' replace/>
}

export default PrivateRoute