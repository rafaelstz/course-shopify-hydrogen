import * as React from "react"
import CookieConsent, { Cookies } from "react-cookie-consent"
import { useLocation } from "@reach/router"
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'

const Gdpr = () => {
    const location = useLocation();
    return (
        <CookieConsent
            location="bottom"
            buttonText="J'accepte"
            declineButtonText="Je refuse"
            cookieName="gatsby-gdpr-google-tagmanager"
            expires={150}
            onAccept={() => {
            Cookies.set("gatsby-gdpr-google-tagmanager", true)
            Cookies.set("gatsby-gdpr-facebook-pixel", true)
            initializeAndTrack(location)
            }}
            enableDeclineButton
            onDecline={() => {
            Cookies.set("gatsby-gdpr-google-tagmanager", false)
            Cookies.set("gatsby-gdpr-facebook-pixel", false)
            }}
        >
            En continuant à utiliser le site, vous acceptez l’utilisation de
            cookies.
        </CookieConsent>
    );
}
export default Gdpr