import { Button, Stack } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { v4 as uuid } from "uuid";
import authApiClient from "./Api";
import React from "react";
// import config from "./config";

export interface SimpleDialogProps {
    open: boolean;
    addContactMsg?: {
      ok:boolean;
      message:string;
    };
    setAddContactMsg: React.Dispatch<React.SetStateAction<{
      ok:boolean;
      message:string;
    }>>
    selectedValue: any;
    onClose: () => void;
    getEmailData: () => Promise<void>;
  }

  interface contactData {
    firstName:string;
    lastName:string;
    email:string;
    linkedInURL:string;
  }
  
  function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open ,setAddContactMsg , getEmailData} = props;
    const [contactData,setContactData] = React.useState<contactData>({ firstName:'',lastName:'',email:'',linkedInURL:''})
    const [loading,setLoading] = React.useState<boolean>(false)
    const handleClose = () => {
      onClose();
    };

    React.useEffect(() => {
      if (selectedValue) {
        setContactData(selectedValue);
      }
    }, [selectedValue]);
  
  
    const handleAddContact = async (value: any) => {
      setLoading(true)
      let attr = [];
      if (value) {
        if (value.email) {
          attr.push({
            id: uuid(),
            name: "email",
            is_primary: false,
            value: {
              type: "other",
              value: contactData.email,
            },
          });
        }
        if (value.firstName) {
          attr.push({
            id: uuid(),
            name: "full_name",
            value: {
              first_name: contactData.firstName,
              last_name: contactData?.lastName,
            },
          });
        }
        if(value?.linkedInURL){
          attr.push({
            id: uuid(),
            name: "url",
            value: {
              url: contactData.linkedInURL,
              type:"LinkedIn"
            },
          });
        }
      }
      const addData = {
        id: uuid(),
        in_people: true,
        attributes: attr,
      };
      const res = await authApiClient.addContact(addData);
      if (res?.ok) {
        setAddContactMsg({ok:true,message:'contact added'})
        onClose()
        getEmailData()
        setLoading(false)
      } else {
        setAddContactMsg({ok:true,message:'contact add error'})
        onClose()
        setLoading(false)
      }
    };

    const handleEditContact = async(value: any) =>{
      setLoading(true)
      const attributes:any = [...value?.validation[0]?.attributes || []]
      const emailIdx:any = attributes.findIndex((attr:any)  => attr?.name === 'email')
      if(emailIdx && attributes[emailIdx]?.value?.value){
        attributes[emailIdx].value.value= contactData?.email;
      } 
      const nameIdx:any = attributes.findIndex((attr:any)  => attr?.name === 'full_name')
      if(nameIdx && attributes[nameIdx]?.value?.first_name){
        attributes[nameIdx].value.first_name = contactData?.firstName;
      }
      const linkedInURLIdx:any = attributes.findIndex((attr:any)  => (attr?.name === 'url' && attr?.value?.type === 'LinkedIn'))
      if(linkedInURLIdx && attributes[linkedInURLIdx]?.value?.url){
        attributes[linkedInURLIdx].value.url = contactData?.linkedInURL;
      }
      const res = await authApiClient.putContact(value.validation[0]);
      if (res?.ok) {
        setAddContactMsg({ok:true,message:'contact updated'})
        onClose()
        getEmailData()
        setLoading(false)
      } else {
        setAddContactMsg({ok:true,message:'contact update error'})
        onClose()
        setLoading(false)
      }
    }

    return (
      <Dialog onClose={handleClose} open={open} fullWidth>
        <Stack justifyContent='center' alignItems='center' direction='column' spacing={2}>
        <DialogTitle onClick={handleClose}>{ !(selectedValue?.validation?.length > 0) ? 'Add to Uphabit' : 'Edit to Uphabit'}</DialogTitle>
            <TextField
              id="outlined-name"
              label="First Name"
              value={contactData.firstName}
              className="textField"
              inputProps={{style:{cursor:"default"}}}
              onChange={(e:any)=>setContactData({...contactData,firstName:e.target.value})}
            />
            <TextField
              id="outlined-name"
              label="Last Name"
              value={contactData.lastName}
              className="textField"
              inputProps={{style:{cursor:"default"}}}
              onChange={(e:any)=>setContactData({...contactData,lastName:e.target.value})}
            />
          {selectedValue?.email ? (
          <TextField
            id="outlined-email"
            label="Email"
            value={contactData.email}
            className="textField"
            inputProps={{style:{cursor:"default"}}}
            onChange={(e:any)=>setContactData({...contactData,email:e.target.value})}
          />) : null}
          {selectedValue?.linkedInURL ? (
            <TextField
              id="outlined-name"
              label="LinkedIn URL"
              value={contactData.linkedInURL}
              className="textField"
              inputProps={{style:{cursor:"default"}}}
              onChange={(e:any)=>setContactData({...contactData,linkedInURL:e.target.value})}
            />
          ) : null}
          { !(selectedValue?.validation?.length > 0) ? 
          <Button onClick={() => handleAddContact(selectedValue)} variant="contained" className="button"
            disabled={((contactData.email === '') && (contactData.firstName === '')) || loading}>
            Add Contact
          </Button>
          :
          <Button onClick={() => handleEditContact(selectedValue)} variant="contained" className="button"
            disabled={((contactData.email === '') && (contactData.firstName === '')) || loading}>
            Edit Contact
          </Button>}
          <br />
        </Stack>
      </Dialog>
    );
  }

export default SimpleDialog;