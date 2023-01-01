/* eslint-disable no-undef */
function getGmailData(){
    const names = [];
    const emails = [];
    const data = [...document.querySelectorAll('div.BltHke.nH.oy8Mbf[role] div.yW span[email]')].flatMap(val =>{
        let obj = {}
        if(!names.includes(val.attributes.name.value) && !emails.includes(val.attributes.email.value)){
            obj.name =  val.attributes.name.value;
            obj.email =  val.attributes.email.value;
            names.push(obj.name);
            emails.push(obj.email);
            return [obj]
        }
       return [];
    });
    if(data.length > 0){
        return data;
    } else {
        const names = [];
        const emails = [];
        const fromDataArr = [...document.querySelectorAll('span.gD')].flatMap(val =>{
            let obj = {}
            if(!names.includes(val.attributes.name.value) && !emails.includes(val.attributes.email.value)){
                obj.name =  val.attributes.name.value;
                obj.email =  val.attributes.email.value;
                names.push(obj.name);
                emails.push(obj.email);
                return [obj]
            }
            return [];
        });
        const toDataArr = [...document.querySelectorAll('span.g2')].flatMap(val =>{
            let obj = {}
            if(!names.includes(val.attributes.name.value) && !emails.includes(val.attributes.email.value)){
                obj.name =  val.attributes.name.value;
                obj.email =  val.attributes.email.value;
                names.push(obj.name);
                emails.push(obj.email);
                return [obj]
            }
           return [];
        });
        const data = fromDataArr.concat(toDataArr);
        if(data?.length > 0){
            return data;
        }
    }
}

function getOutlookData(){
    const names = [];
    const emails = [];
    const fromData = [...document.querySelectorAll('span.QGAjV')].flatMap(val =>{
        let obj = {}
        if(val?.childNodes[1]?.data){
            if(!names.includes(val.childNodes[0].data) && !emails.includes(val.childNodes[1].data)){
                obj.name =  val.childNodes[0].data;
                obj.email =  val.childNodes[1].data.replace(/[<> ]/g,'');
                names.push(obj.name);
                emails.push(obj.email);
                return [obj];
            }
        }
       return [];
    });
    const read = [...document.querySelectorAll('div.uSUBc.MtC_r.Lf0qr.jYIx5 span[title]')].flatMap(val =>{
        let obj = {}
        if(val?.attributes?.title?.value){
            if(!names.includes(val.childNodes[0].data) && !emails.includes(val.attributes.title.value)){
                obj.name =  val.childNodes[0].data;
                obj.email =  val.attributes.title.value;
                names.push(obj.name);
                emails.push(obj.email);
                return [obj];
            }
        }
       return [];
    });
    const unRead = [...document.querySelectorAll('div.Ljsqx.MtC_r.Lf0qr.jYIx5 span[title]')].flatMap(val =>{
        let obj = {}
        if(val?.attributes?.title?.value){
            if(!names.includes(val.childNodes[0].data) && !emails.includes(val.attributes.title.value)){
                obj.name =  val.childNodes[0].data;
                obj.email =  val.attributes.title.value;
                names.push(obj.name);
                emails.push(obj.email);
                return [obj];
            }
        }
       return [];
    });
    const toData = [...document.querySelectorAll('div.orabL')].flatMap(val =>{
        let obj = {}
        if(val?.childNodes[0]?.data){
            if(!names.includes(val.childNodes[0].data) && !emails.includes(val.childNodes[0].data)){
                obj.name =  val.childNodes[0].data;
                obj.email =  val.childNodes[0].data;
                names.push(obj.name);
                emails.push(obj.email);
                return [obj];
            }
        }
       return [];
    });
    const toDataFiltered = toData.filter((obj)=>String(obj.email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
    const data = read.concat(unRead,fromData,toDataFiltered)
    if(data?.length > 0){
        return data;
    }
}

function getLinkedInData(){
    const names = [];
    const urls = [];
    const data = [...document.querySelectorAll('h1.text-heading-xlarge.inline.t-24.v-align-middle.break-words')].flatMap(val =>{
        let obj = {}
        if(!names.includes(val.childNodes[0].data) && !urls.includes(val.childNodes[0].baseURI)){
            obj.name =  val.childNodes[0].data;
            obj.linkedInURL =  val.childNodes[0].baseURI;
            names.push(obj.name);
            urls.push(obj.linkedInURL);
            return [obj];
        }
       return [];
    });
    if(data?.length > 0){
        return data;
    }
}

chrome.runtime.onMessage.addListener(
    function(request,sender, sendResponse) {
        if(request?.check === 'getGmail'){
            const getEmail = getGmailData();
            if(getEmail.length > 0){
                sendResponse({Data: getEmail});
            }
        } else if(request?.check === 'getOutlook'){
            const getEmail = getOutlookData();
            if(getEmail.length > 0){
                sendResponse({Data: getEmail});
            }
        } else if(request?.check === 'getLinkedIn'){
            const getEmail = getLinkedInData();
            if(getEmail.length > 0){
                sendResponse({Data: getEmail});
            }
        }
});

window.addEventListener('load', function () {
    setTimeout(()=>{
        chrome.runtime.onMessage.addListener(
            function(request,sender, sendResponse) {
                if(request?.check === 'getGmail'){
                    const getEmail = getGmailData();
                    if(getEmail.length > 0){
                        sendResponse({Data: getEmail});
                    }
                } else if(request?.check === 'getOutlook'){
                    const getEmail = getOutlookData();
                    if(getEmail.length > 0){
                        sendResponse({Data: getEmail});
                    }
                } else if(request?.check === 'getLinkedIn'){
                    const getEmail = getLinkedInData();
                    if(getEmail.length > 0){
                        sendResponse({Data: getEmail});
                    }
                }
            });
    },2000)
    
})
