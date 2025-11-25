'use client'

import React, { useState } from "react";
import { createClient } from '@supabase/supabase-js'

// Move Supabase client creation inside a function
function getSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables')
    }

    return createClient(supabaseUrl, supabaseKey)
}

interface ContactFormProps {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [formData, setFormData] = useState<ContactFormProps>({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const supabase = getSupabaseClient()

            const { data, error } = await supabase
                .from('contacts')
                .insert({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                })

            if (error) {
                console.error('Error submitting form:', error)
            } else {
                setIsSubmitted(true)
                setTimeout(() => setIsSubmitted(false), 3000)

                try {
                    await fetch('/api/send-notifications', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    })
                } catch (error) {
                    console.error('Error sending notifications:', error)
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setIsLoading(false)
            setFormData({ name: "", email: "", subject: "", message: "" })
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto py-20">
            <h3 className="text-3xl md:text-5xl font-medium mb-12 text-center">Let's work together</h3>

            <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
                <div className="group relative">
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="What's your name?"
                        className="w-full bg-transparent border-b border-gray-400 py-4 text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="group relative">
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="What's your email?"
                        className="w-full bg-transparent border-b border-gray-400 py-4 text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="group relative">
                    <input
                        type="text"
                        name="subject"
                        required
                        placeholder="What's the subject?"
                        className="w-full bg-transparent border-b border-gray-400 py-4 text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-gray-400"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                </div>

                <div className="group relative">
                    <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell me about your project..."
                        className="w-full bg-transparent border-b border-gray-400 py-4 text-xl md:text-2xl focus:outline-none focus:border-black transition-colors placeholder:text-gray-400 resize-none"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-end mt-8">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative px-8 py-4 bg-zinc-900 text-white rounded-full overflow-hidden transition-all hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="relative z-10 text-lg font-medium">
                            {isLoading ? 'Sending...' : 'Send Message'}
                        </span>
                    </button>
                </div>

                {isSubmitted && (
                    <div className="fixed bottom-10 right-10 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
                        Message sent successfully!
                    </div>
                )}
            </form>
        </div>
    )
}