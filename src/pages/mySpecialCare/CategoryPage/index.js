import { 
  useState, 
  // useEffect 
} from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  // Typography,
  Grid,
  Container,
  Paper
} from '@material-ui/core';
import Footer from '../../../components/Footer';
import { makeStyles } from '@material-ui/core/styles';

import CategoryForm from './component/CategoryForm/';
import CategoryTable from './component/CategoryTable';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed    
    backgroundColor: '#FFB81C',
    color: 'black'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#233044',
    color: 'white',
  },
  listInDrawer: {
    '&:hover': {
      background: "#1c2636",
    },
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),

  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    flexGrow: 1,
  },
  fixedHeight: {
    height: '130vh',
  },
}));

export default function Category() {

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  const [isFormShow, setIsFormShow] = useState(false);
  const [editFormData, setEditFormData] = useState(undefined);

  const showFormEdit = () => {
    setIsFormShow(true);
  };

  const setEditingFormData = (data) => {
    setEditFormData(data)
  };

  return (
    <>
      {/* Home Content */}
      <main className={classes.content} justify="center">
        <div className={classes.appBarSpacer} />
        <Container
          // maxWidth="lg"
          maxWidth="xl"
          className={classes.container}
        >
          <Grid
            container
            spacing={3}
          >
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12} >
              <Paper
                className={fixedHeightPaper}
              >
                <Box
                  display="flex"
                  mb={6}
                >
                  <Box flexGrow={1} item="true" >
                    <h3>
                      <LocalOfferIcon style={{ color: 'dark' }} fontSize="large" /> Category 
                    </h3>
                    
                  </Box>
                  <Box item="true" >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        setIsFormShow(!isFormShow);
                      }}
                    >
                      {!isFormShow? "เพิ่มหมวดหมู่" : "กลับ"}
                    </Button>
                  </Box>
                </Box>
                {isFormShow
                  ? <CategoryForm setIsFormShow={setIsFormShow} editFormData={editFormData} setEditingFormData={setEditingFormData} />
                  : <CategoryTable showFormEdit={showFormEdit} setEditingFormData={setEditingFormData}/>
                }
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </>
  );

}