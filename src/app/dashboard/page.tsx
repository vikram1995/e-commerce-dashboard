"use client"
import withAuth from '@/hocs/withAuth'
import React from 'react'

function Dashboard() {
    return (
        <div>
            <h1>This is a protected page</h1>
            {/* Your protected content goes here */}
        </div>
    )
}

export default withAuth(Dashboard)