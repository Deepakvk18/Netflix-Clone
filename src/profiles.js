import { netflix0, netflix1, netflix2, netflix3, netflix4 } from "./components/assets/images"


const profiles = [
    {
        id: 1,
        name: 'Terry Crews',
        language: 'en-US',
        children: false
    },
    {
        id: 2,
        name: 'Terry',
        language: 'en-US',
        children: false
    },
    {
        id: 3,
        name: 'Terry SJd',
        language: 'en-US',
        children: false
    },
    // {
    //     id: 4,
    //     name: 'Terry Crews',
    //     language: 'en-US',
    //     children: false
    // },
    {
        id: 5,
        name: 'Children',
        language: 'en-US',
        children: true
    }
]

const profileAssets = {
    '0': netflix0,
    '1': netflix1,
    '2': netflix2,
    '3': netflix3,
    '4': netflix4
}

export const getProfileImgUrl = (profile) => {
    if (profile.children) return profileAssets[0]
    return profileAssets[profile.id%5]
}

export default profiles