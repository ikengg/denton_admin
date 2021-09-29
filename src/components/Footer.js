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
                    Denton Admin@ P&W Development Co.,Ltd
                </Link>{' '}
            </Typography>
        </div>
    );
}

export default Footer;
