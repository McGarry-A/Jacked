import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store"
import { getUserTemplateData } from "../store/templateSlice"


const useTemplatesAndFolders = () => {

    const dispatch = useAppDispatch()
    const { userId } = useAppSelector(state => state.userSlice.user)

    useEffect(() => {
        dispatch(getUserTemplateData(userId))
    }, [])
}

export default useTemplatesAndFolders