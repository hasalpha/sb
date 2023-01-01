import { Typography } from "@mui/material";
import {ReactComponent as UphabitLogo} from './svg/uphabit.svg';

export function goToUphabitUrl(){
    const newUrl = 'https://www.uphabit.com';
    chrome.tabs.create({ url: newUrl });
}

function Footer(): JSX.Element{
    // eslint-disable-next-line react/style-prop-object
    return <a href="https://www.uphabit.com" style={{textDecoration:'none',color:'black'}} onClick={goToUphabitUrl} ><Typography align='right' component='div' pr='0.5rem' mt='auto'>Powered by <UphabitLogo /></Typography></a>
}

export default Footer;