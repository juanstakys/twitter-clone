import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser()
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id)
    const editModal = useEditModal()

    const [profileImage, setProfileImage] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')

    useEffect(() => {
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    }, [
        currentUser?.id,
        currentUser?.profileImage,
        currentUser?.coverImage,
        currentUser?.name,
        currentUser?.username,
        currentUser?.bio
    ])

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            })
            mutateFetchedUser()

            toast.success('Profile updated successfully')

            editModal.onClose()
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }

    }, [name, username, bio, profileImage, coverImage, mutateFetchedUser, editModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
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
                placeholder="bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>

    )

    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={editModal.isOpen}
                title="Edit Profile"
                onClose={editModal.onClose}
                actionLabel="Save"
                onSubmit={onSubmit}
                body={bodyContent}
            />
        </div>
    );
}

export default EditModal;