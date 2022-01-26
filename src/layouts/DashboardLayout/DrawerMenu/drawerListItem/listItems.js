import React from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
// import YouTubeIcon from '@material-ui/icons/YouTube';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';

export const dashboardListItems = [
  {
    icon: <DashboardIcon style={{ color: 'white' }} />,
    text: 'Dashboard',
    route: '/admin/dashboard/',
    isDisable: false
  },
];

export const mySpecialCareListItem = [
  {
    icon: <LocalOfferIcon style={{ color: 'white' }} />,
    text: 'Category',
    route: '/admin/category',
    isDisable: false
  },
  {
    icon: <AmpStoriesIcon style={{ color: 'white' }} />,
    text: 'News',
    route: '/admin/news',
    isDisable: false
  },
  {
    icon: <FormatAlignRightIcon style={{ color: 'white' }} />,
    text: 'Article',
    route: '/admin/article',
    isDisable: false
  },
  {
    icon: <ContactSupportIcon style={{ color: 'white' }} />,
    text: 'FAQ',
    route: '/admin/faq',
    isDisable: false
  },
  // {
  //   icon: <YouTubeIcon style={{ color: 'white' }} />,
  //   text: 'Video',
  //   route: '/admin/video',
  //   isDisable: false
  // },
]

export const myDentistListItems = [
  {
    icon: <LocationCityIcon style={{ color: 'white' }} />,
    text: 'Clinic',
    route: '/admin/clinic',
    isDisable: false
  },
];