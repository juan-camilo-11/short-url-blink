import { useEffect } from "react";
import { Get, Post } from "../../service/http";

function Redirect() {

    const getShortUrl = () => {
        return window.location.pathname.split('/').pop();
    };

    const fetchUrl = async () => {
        try {
            const shortUrl = getShortUrl();
            if (!shortUrl) return;
            const data = await Get(`${process.env.REACT_APP_BASE_URL_BACKEND}/url/${shortUrl}`);
            console.log("Data:", data)
            if (data && data.url) {
                const body = {shortUrl: shortUrl}
                await Post(`${process.env.REACT_APP_BASE_URL_BACKEND}/click`, body);
                window.location.replace(data.url);
            } else {
                console.error('URL no encontrada en la respuesta');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUrl();
    }, [])

    return (
        <section></section>
    );
}

export default Redirect;
