import dashboardApis from '@/apis/dashboard'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

interface Props {}

function Page(props: Props) {
    const {} = props
    const [profile, setProfile] = useState<string>('None')

    useEffect(() => {
        getProfile()
    })

    const getProfile = () => {
        dashboardApis.getProfile().then(res => {
            setProfile(res)
        })
    }
    
    return (
        <>
            <h1>Dashboard {profile}</h1>
            <Button onClick={getProfile}>Get Profile</Button>
        </>
    )
}

export default Page
