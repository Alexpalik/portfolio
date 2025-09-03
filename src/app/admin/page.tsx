export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { signIn, signOut, getUser } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

interface Contact {
    id: string
    name: string
    email: string
    subject: string
    message: string
    created_at: string
}

export default function AdminPage() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [loginLoading, setLoginLoading] = useState(false)
    
    // Login form state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    // Create Supabase client inside useEffect
    useEffect(() => {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseKey) {
            console.error('Missing Supabase configuration')
            setLoading(false)
            return
        }

        const supabase = createClient(supabaseUrl, supabaseKey)
        
        // Move your auth logic here
        checkUser()
    }, [])

    const checkUser = async () => {
        const currentUser = await getUser()
        setUser(currentUser)
        setLoading(false)
        
        if (currentUser) {
            fetchContacts()
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginLoading(true)
        setLoginError('')
        
        const { data, error } = await signIn(email, password)
        
        if (error) {
            setLoginError(error.message)
        } else {
            setUser(data.user)
            fetchContacts()
        }
        setLoginLoading(false)
    }

    const handleLogout = async () => {
        await signOut()
        setUser(null)
        setContacts([])
    }

    const fetchContacts = async () => {
        const response = await fetch('/api/contacts')
        const data = await response.json()
        setContacts(data)
    }

    // Loading state
    if (loading) {
        return <div className="p-8">Loading...</div>
    }

    // If not logged in, show login form
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Admin Login
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        {loginError && (
                            <div className="text-red-600 text-sm">{loginError}</div>
                        )}
                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {loginLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    // If logged in, show admin dashboard
    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Contact Messages Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {contacts.map((contact, index) => (
                            <tr key={contact.id || index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.subject}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{contact.message}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(contact.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {contacts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No contact messages yet.
                    </div>
                )}
            </div>
        </div>
    )
}