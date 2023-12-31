import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal"
import { useCallback, useState } from "react"
import Input from "../Input"
import Modal from "../Modal"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"

const RegisterModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await axios.post('/api/register', {
                name,
                username,
                email,
                password
            })

            toast.success('Account created!')

            signIn('credentials', {
                email,
                password
            })

            registerModal.onClose()
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }, [registerModal, name, username, email, password])

    const onToggle = useCallback(() => {
        if (isLoading) return
        registerModal.onClose()
        loginModal.onOpen()
    }, [isLoading, registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-6">
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account?
                <span
                    onClick={onToggle}
                    className="
                text-white
                cursor-pointer
                hover:underline
                "
                > Sign in</span>
            </p>
        </div>
    )

    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={registerModal.isOpen}
                title="Create an account"
                actionLabel="Register"
                onClose={registerModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerContent}
            />
        </div>
    )
}



export default RegisterModal
