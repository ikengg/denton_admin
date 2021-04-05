import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Footer = () => {
    return (
        <div>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                {new Date().getFullYear()}{', '}
                <Link color="inherit" href="https://nexthop.co.th">
                    Next-Hop Co., Ltd.
                </Link>{' '}
            </Typography>
        </div>
    );
}

export default Footer;
