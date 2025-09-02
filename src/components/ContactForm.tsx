import { useState } from "react";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


interface ContactFormProps {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)  // Start loading
        
        try {
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
                // Handle error state here
            } else {
                console.log('Form submitted successfully:', data)
                setIsSubmitted(true)  // Show success message
                
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    setIsSubmitted(false)
                }, 3000)
                try {
                    const response = await fetch('/api/send-notifications',{
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body :JSON.stringify(formData)
                    })
                    if (!response.ok) {
                        throw new Error('Failed to send notifications')
                    }
                    console.log('Notifications sent successfully')
                } catch (error) {
                    console.error('Error sending notifications:', error)
                }
            
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setIsLoading(false)  // Stop loading regardless of success/error
            setFormData({name: "", email: "", subject: "", message: ""})
        }
    }
    const [formData, setFormData] = useState<ContactFormProps>({
        name: "",
        email: "",
        subject: "",
        message: ""
       })
       const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        console.log('Current form data:', formData) // Add this line
       }
    return (
       
        <>
        <div className="max-w-4xl mx-auto">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <p className="text-2xl font-bold">Your Name</p>
                <input type="text"
                 placeholder="Name"
                 name="name"
                 required
                 className="border-2 border-gray-300 rounded-md p-2"
                 value={formData.name}
                 onChange={handleChange}
                 />
                <p className="text-2xl font-bold">Your Email</p>
                <input type="email" 
                placeholder="Email" 
                name="email"
                className="border-2 border-gray-300 rounded-md p-2" 
                required
                value={formData.email}
                onChange={handleChange}
                />
                <p className="text-2xl font-bold">Subject</p>
                <input type="text"
                name="subject"
                placeholder="Subject"
                className="border-2 border-gray-300 rounded-md p-2"
                required
                value={formData.subject}
                onChange={handleChange}
                />
                <p className="text-2xl font-bold">Your Message</p>
                <input type="text" 
                name="message"
                placeholder="Message" 
                className="border-2 border-gray-300 rounded-md p-2" 
                required 
                value={formData.message}
                onChange={handleChange}
                />
                <button 
                    type="submit" 
                    disabled={isLoading} 
                    className="bg-blue-500 text-white rounded-md p-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Sending...' : 'Submit'}
                </button>
                {isSubmitted && (
                    <p className="text-green-600 font-semibold">
                        ✅ Form submitted successfully!
                    </p>
                )}
                
            </form>
        </div>
        </>
    )
}