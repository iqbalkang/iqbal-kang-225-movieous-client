import React from 'react'
import AppInfoBox from '../components/admin/AppInfoBox'
import RecentUploads from '../components/admin/RecentUploads'

const AdminDashboard = () => {
  return (
    <div className='grid grid-cols-3 gap-4 mt-4'>
      <AppInfoBox title='total uploads' value='21' />
      <AppInfoBox title='total reviews' value='1' />
      <AppInfoBox title='total users' value='10' />

      <RecentUploads />
    </div>
  )
}

export default AdminDashboard
