import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react"
import Input from "../Input"
import { validateHeaderValue } from "http"
import Modal from "../Modal"

const LoginModal = () => {
    const loginModal = useLoginModal()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            // TO-DO ADD LOGIN

            loginModal.onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }, [loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-6">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={loginModal.isOpen}
                title="Login"
                actionLabel="Sign in"
                onClose={loginModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
            />
        </div>
    )
}



export default LoginModal
