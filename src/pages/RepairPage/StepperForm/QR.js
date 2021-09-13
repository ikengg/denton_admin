import React from 'react';
import QRCode from 'qrcode.react';
import { DOMAIN_URL } from "../../../config/index";
import MoodIcon from '@material-ui/icons/Mood';
import { Container, Grid, Box, Paper, Typography  } from '@material-ui/core';

const QR = () => {

    return (
        <Container>
            <Grid container >
                <Paper>
                    <Box
                        display="flex"
                        flexItem
                        flexDirection="column"
                        //justifyContent="center"
                        alignItems="center"
                        // width={50}
                        // height={80}
                        paddingX={1}
                        paddingY={0.5}
                    >   
                        <br />
                        <img src="./Xiaomi_logo.png" height={80} width={80} alt="xiami logo"/>
                        {/* <br /> */}
                        <Typography variant="h5">Xiaomi by NextHop</Typography>
                        <Typography>หมายเลข Serial: SN123456</Typography>
                        {/* <br /><br /> */}
                        <br />
                        <QRCode
                            size={128}
                            renderAs={"canvas"}
                            //value={DOMAIN_URL+'/status?SN=1234'}
                            value={'google.com'}
                            // imageSettings={{
                            //     //src: "./kisspng-xiaomi-mi-5-xiaomi-mi-6-xiaomi-redmi-xiaomi-mi-1-mini-5ab53c5e79db15.1083687115218269104991.png",
                            //     src: "./Xiaomi_logo.png",
                            //     x: null,
                            //     y: null,
                            //     height: 30,
                            //     width: 30,
                            //     excavate: true,
                            // }}
                        />
                        {/* <br /><br /> */}
                        <br />
                        <Typography>ท่านสามารถตรวจสอบสถานะ</Typography>
                        <Typography>การส่งซ่อมได้จาก QR Code หรือ</Typography>                        
                        <Typography>www.nexthop.xiomi.co.th/status</Typography>
                        <Typography>โดยการกรอกหมายเลข Serial</Typography>                        
                        {/* <br /><br /><br /><br /><br /><br /> */}
                        <br /><br /><br />
                        <Typography>----------------------------</Typography>
                        <br/>
                        <Typography><MoodIcon /> ขอขอบคุณที่ไว้วางใจ <MoodIcon /></Typography>
                    </Box>
                </Paper>
            </Grid>
            {/* <button class="hide-on-print" onClick={printReceipt}>Print</button> */}
        </Container>
    )
}

export default QR
