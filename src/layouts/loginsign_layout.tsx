import { Outlet } from 'react-router'

import ToastContainer_ from '../components/toast/toast_container';

function LoginSignupLayout() {
    return(
    <div className={`w-full flex justify-center`}>
        <div className={`max-w-[1920px] max-h-[1040px] h-full w-full bg-background flex flex-col`}>
            <div className={`w-full min-h-14 h-14 bg-accent border-b-1 border-accent-2 px-6 lg:px-20 flex items-center justify-between`}>
                <h1 className={`text-xl text-primary font-semibold`}>HCIA Practice</h1>
            </div>
            <div className={`w-full h-full px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 lg:space-x-20`}>
                <Outlet />
                <div className={`hidden lg:block pt-12`}>
                    <img src="/images/data-extraction-pana.png" alt="" className={`w-md`}/>
                </div>
            </div>
        </div>
        <ToastContainer_ />
    </div>
    )
}

export default LoginSignupLayout