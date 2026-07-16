// Client component: react-share buttons need browser interaction.
"use client"

import Style from '@/app/(frontend)/(pages)/newsroom/newsroom.module.scss';
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from "react-share";



// Renders the social share buttons for one newsroom article.
function ShareButtons({ title, url, body }){
    // Converts Payload Lexical rich text to plain text, or uses body directly if it is already text.
    const plainText = typeof body === 'string' ? body : body ? convertLexicalToPlaintext({ data: body }) : ''
    const summary = plainText.slice(0, 300)

    return(
        <ul className={Style.shareList}>
            <li className={Style.shareListItem}>
                <EmailShareButton
                    {...{ title, url }}
                    // This subject has broken emoji encoding before the text.
                    subject="Hey! ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¹ Check out this article on GRIT Hub I found."
                    body={`Read this article on GRIT Hub's website: ${title}`}
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </li>
            <li className={Style.shareListItem}>
                <FacebookShareButton
                    {...{ title, url }}
                    hashtag="#grithub"
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </li>
            <li className={Style.shareListItem}>
                <WhatsappShareButton
                    {...{ title, url }}
                    separator=":: "
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </li>
            <li className={Style.shareListItem}>
                <LinkedinShareButton
                    {...{ title, url, summary }}
                    source="Garden Route Innovation & Technology Hub"
                >
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </li>
        </ul>
    )
}

export default ShareButtons
