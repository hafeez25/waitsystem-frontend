import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// material
import { Card, Stack, Avatar, Button, Container, Typography, Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Iconify from '../components/Iconify';

export default function ViewProfile() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Profile">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            Your Profile
          </Typography>
        </Stack>

        <Card sx={{ p: 1.5 }}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                  <Tab label="General" value="1" />
                </TabList>
              </Box>
              <TabPanel value="1">Item One</TabPanel>
            </TabContext>
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
