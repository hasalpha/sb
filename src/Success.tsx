import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import NativeSelect from '@mui/material/NativeSelect';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import authApiClient from "./Api";
import SimpleDialog from "./SimpleDialog";
import { PersonAvatar } from "./utils/personAvatar";
import { ReactComponent as UphabitLogo } from './svg/Web_UphabitLogo.svg';
import { goToUphabitUrl } from "./svg/Footer";
import "./Success.css";

interface SuccessProps {
  justLoggedIn?: boolean;
}

interface contactMsg {
  ok: boolean;
  message: string;
}

function Success({ justLoggedIn = false }: SuccessProps): JSX.Element {
  const [data, setData] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [addContactMsg, setAddContactMsg] = React.useState<contactMsg>({ ok: false, message: '' });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showHelperText, setShowHelperText] = React.useState<boolean>(false);
  const [showReloadText, setShowReloadText] = React.useState<boolean>(false);

  React.useEffect(() => {
    getEmailData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEmailData = async () => {
    setLoading(true);
    const getContact = await getContacts();
    if (chrome && chrome.tabs && chrome.tabs.query)
      chrome.tabs.query(
        { active: true, currentWindow: true },
        function (tabs: any) {
          if (tabs[0].url.includes("mail.google.com")) {
            chrome.tabs.sendMessage(
              tabs[0].id,
              { check: "getGmail" },
              function handler(response) {
                if (response?.Data) {
                  const sorted = response.Data.sort(function (a: any, b: any) {
                    let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                    if (nameA < nameB) { return -1; }
                    if (nameA > nameB) { return 1; }
                    return 0;
                  });
                  const validated = contactCheck(getContact, sorted)
                  const gmailData = validated.map((val: any) => {
                    const [firstName, ...rest] = val.name.split(' ');
                    const lastName = rest.join(' ');
                    val.firstName = firstName;
                    val.lastName = lastName;
                    return val;
                  })
                  setData(gmailData)
                  setLoading(false);
                } else {
                  setLoading(false);
                  setShowReloadText(true);
                }
              }
            );
          } else if (
            tabs[0].url.includes("outlook.live.com") ||
            tabs[0].url.includes("outlook.office.com")
          ) {
            chrome.tabs.sendMessage(
              tabs[0].id,
              { check: "getOutlook" },
              function handler(response) {
                if (response?.Data) {
                  const sorted = response.Data.sort(function (a: any, b: any) {
                    let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                    if (nameA < nameB) { return -1; }
                    if (nameA > nameB) { return 1; }
                    return 0;
                  });
                  const validated = contactCheck(getContact, sorted)
                  const outlookData = validated.map((val: any) => {
                    const [firstName, ...rest] = val.name.split(' ');
                    const lastName = rest.join(' ');
                    val.firstName = firstName;
                    val.lastName = lastName;
                    return val;
                  })
                  setData(outlookData)
                  setLoading(false);
                } else {
                  setLoading(false);
                  setShowReloadText(true);
                }
              }
            );
          } else if (tabs[0].url.includes('www.linkedin.com')) {
            chrome.tabs.sendMessage(
              tabs[0].id,
              { check: "getLinkedIn" },
              function handler(response) {
                if (response?.Data) {
                  const sorted = response.Data.sort(function (a: any, b: any) {
                    let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                    if (nameA < nameB) { return -1; }
                    if (nameA > nameB) { return 1; }
                    return 0;
                  });
                  const validated = contactCheck(getContact, sorted)
                  const linkedInData = validated.map((val: any) => {
                    const [firstName, ...rest] = val.name.split(' ');
                    const lastName = rest.join(' ');
                    val.firstName = firstName;
                    val.lastName = lastName;
                    return val;
                  })
                  setData(linkedInData)
                  setLoading(false);
                } else {
                  setLoading(false);
                  setShowReloadText(true);
                }
              }
            );
          } else {
            setShowHelperText(true);
            setLoading(false);
          }
        }
      );
    else {
      // Use this for testing data
      setData([]);
    }
  }

  const getContacts = async () => {
    const res = await authApiClient.getAllContacts();
    if (res?.data?.data) {
      const response = res.data.data;
      if (response.contacts?.length > 0) {
        return response.contacts;
      }
    }
  };

  const contactCheck = (contactData: any, mailData: any) => {
    if (contactData.length > 0 && mailData.length > 0) {
      const validated = mailData.map((value: any) => {
        const validatedArray = contactData.filter((contact: any) =>
          contact.attributes?.some(
            (attr: any) =>
            ((attr?.name === "email" &&
              attr?.is_primary &&
              attr?.value?.value === value?.email) ||
              (attr?.name === "url" &&
                attr?.is_primary &&
                attr?.value?.type === "LinkedIn" &&
                attr?.value?.url === value?.linkedInURL))
          )
        );
        value.validation = validatedArray;
        return value;
      })
      return validated;
    }
  }

  const handleClickOpen = (value: any) => {
    setAddContactMsg({ ...addContactMsg, ok: false });
    setSelectedValue(value);
    setOpen(true);
  };

  const handleCloseToast = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAddContactMsg({ ...addContactMsg, ok: false });
  };

  // const sortArray = (type: string) => {
  //   if (data.length > 0) {
  //     const sortingArr = [...data];
  //     if (type === 'Ascending') {
  //       const sorted = sortingArr.sort(function (a: any, b: any) {
  //         let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
  //         if (nameA < nameB) { return -1; }
  //         if (nameA > nameB) { return 1; }
  //         return 0;
  //       });
  //       setData(sorted)
  //     } else if (type === 'Descending') {
  //       const sorted = sortingArr.sort(function (a: any, b: any) {
  //         let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
  //         if (nameA > nameB) { return -1; }
  //         if (nameA < nameB) { return 1; }
  //         return 0;
  //       });
  //       setData(sorted)
  //     }
  //   }
  // }

  function redirectPage(validationObject: any) {
    if (validationObject?.validation[0]?.id) {
      const baseUrl = 'http://localhost:3000';
      const url = `${baseUrl}/app/relationships?view=${validationObject.validation[0].id}`;
      window.open(url);
    }
  }

  function editRedirectPage(validationObject: any) {
    if (validationObject?.validation[0]?.id) {
      const baseUrl = 'http://localhost:3000';
      const url = `${baseUrl}/app/relationships?edit=${validationObject.validation[0].id}`;
      window.open(url);
    }
  }

  const handleClose = () => {
    getContacts();
    setOpen(false);
  };
  // if(loading)setLoading(false);

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" px={'0.5rem'}>
      {justLoggedIn && (
        <Typography align="center" gutterBottom>
          Login Success
        </Typography>
      )}
      <Stack direction={'row'} justifyContent='space-between' alignItems='center' width='100%'>
        <Typography className="userName" variant="h5" component="h1" >
          {`${JSON.parse(localStorage.getItem("state")!)?.user?.first_name} ${JSON.parse(localStorage.getItem("state")!)?.user?.last_name}`}
        </Typography>
        <a href="https://www.uphabit.com" style={{ textDecoration: 'none', color: 'black' }} onClick={goToUphabitUrl} ><UphabitLogo /></a>
      </Stack>
      {loading ? (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: 10 }}
        >
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </Stack>
      ) : (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
          }}
        >
          {data?.map((value: any, index: any) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ width: "100%", maxWidth: 300, maxHeight: 100, p: '2px' }}
            >
              <PersonAvatar person={value} size="35px" />
              <ListItemText
                primaryTypographyProps={{
                  fontFamily: "Poppins, sans-serif",
                  maxWidth: value?.validation?.length > 0 ? "130px" : "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {value?.name}
              </ListItemText>
              {value?.validation?.length > 0 ?
                <>
                  <IconButton size="small" color="primary" aria-label="upload picture" component="span">
                    <EditIcon onClick={() => editRedirectPage(value)}></EditIcon>
                  </IconButton>
                  <IconButton color="primary" size="small" aria-label="upload picture" component="span">
                    <VisibilityIcon onClick={() => redirectPage(value)}></VisibilityIcon>
                  </IconButton>
                </>
                :
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <AddIcon onClick={() => handleClickOpen(value)}></AddIcon>
                </IconButton>
              }
            </ListItem>
          ))}
        </List>
      )}
      {showHelperText && (
        <Typography gutterBottom variant="body2" component="p" align="center">
          Please visit Gmail or Outlook to add contacts
        </Typography>
      )}
      {showReloadText && (
        <Typography gutterBottom variant="body2" component="p" align="center">
          Please reload the page to import data.
        </Typography>
      )}
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        setAddContactMsg={setAddContactMsg}
        getEmailData={getEmailData}
      />
      <Snackbar
        open={addContactMsg.ok}
        autoHideDuration={2000}
        onClose={handleCloseToast}
        message={addContactMsg.message}
      />
    </Stack>
  );
}

export default Success;
