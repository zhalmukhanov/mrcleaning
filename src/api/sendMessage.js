const TOKEN = "5715537013:AAHBQndvdz3ztZO-SnZjzGN7WbmjZGMYlFc"
// const CHAT_ID = "-830475510"
const CHAT_ID = "-873787129"

export default async function sendMessage(message) {
    const url = `https://api.telegram.org/bot${ TOKEN }/sendMessage?chat_id=${ CHAT_ID }&parse_mode=html&text=${ encodeURIComponent(message) }`
    let response = await fetch(url);

    if (response.ok) {
        return "OK"
    } else {
        return "ERROR"
    }
            
} 