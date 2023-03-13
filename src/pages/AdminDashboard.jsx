import React, { useEffect, useState } from 'react'
import { getAppInfo } from '../apis/admin'
import AppInfoBox from '../components/admin/AppInfoBox'
import MostRated from '../components/admin/MostRated'
import RecentUploads from '../components/admin/RecentUploads'

const AdminDashboard = () => {
  const [appInfo, setAppInfo] = useState({})

  const fetchAppInfo = async () => {
    const { data, error } = await getAppInfo()
    setAppInfo({ ...data.info })
  }

  useEffect(() => {
    fetchAppInfo()
  }, [])

  const { movies, users, reviews } = appInfo

  return (
    <div className='grid grid-cols-3 gap-4 mt-4'>
      <AppInfoBox title='total uploads' value={movies} />
      <AppInfoBox title='total reviews' value={reviews} />
      <AppInfoBox title='total users' value={users} />

      <RecentUploads />
      <MostRated />
    </div>
  )
}

export default AdminDashboard
