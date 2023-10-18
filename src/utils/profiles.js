import { netflix0, netflix1, netflix2, netflix3, netflix4 } from "../components/assets/images"

const profileAssets = {
    '0': netflix4,
    '1': netflix1,
    '2': netflix2,
    '3': netflix3,
}

export const getProfileImgUrl = (profile) => {
    if (profile?.children) return netflix0
    return profileAssets[profile?.id%4]
}