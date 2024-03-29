import qs from 'qs'
import axios from 'axios'

export const Authorization = () => {
    return encodeURI(`http://linkedin.com/oauth/v2/authorization?client_id=${process.env.LINKEDIN_CLIENT_ID}&response_type=code&scope=${process.env.LINKEDIN_SCOPE}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}`)
}

export const Redirect = async (code) => {
    const payload = { 
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        grant_type: "authorization_code",
        code
    }

    const access_token = await axios({
        url: `http://linkedin.com/oauth/v2/accessToken?${qs.stringify(payload)}`,
        method: 'POST',
        headers: {
            'Content-Type': 'x-www-form-urlencoded'
        }
    })
    .then(response => response)
    .catch(error => error)

    if (access_token?.data?.access_token) {
        const data = await axios({
            url: 'https://api.linkedin.com/v2/userinfo',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token.data.access_token}`
            }
        })
        .then(response => response)
        .catch(error => error)
    
         return data.data
    }

    return access_token.data
}
